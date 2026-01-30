"use client";

import Link from "next/link";
import { useState } from "react";
import { CodeIcon } from "@/components/icons";
import { Button, Logo, TextField, Modal } from "@/components/ui";
import { cn, isValidPassword } from "@/lib/utils";
import { useRouter } from "next/navigation";

type FieldVariant = "informative" | "error" | "success";
type FieldState = { value: string; variant: FieldVariant; error: string };

const EMAIL_REQUIRED_MESSAGE = "이메일을 입력해 주세요.";
const EMAIL_INVALID_MESSAGE = "이메일 형식으로 작성해 주세요.";
const PASSWORD_REQUIRED_MESSAGE = "비밀번호를 입력해 주세요.";
const PASSWORD_INVALID_MESSAGE = "비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.";

const isValidEmail = (value: string) => {
  const trimmed = value.trim();
  return (
    trimmed.includes("@") &&
    trimmed.includes(".") &&
    trimmed.indexOf("@") < trimmed.lastIndexOf(".")
  );
};

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState<FieldState>({ value: "", variant: "informative", error: "" });

  const [password, setPassword] = useState<FieldState>({
    value: "",
    variant: "informative",
    error: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalAction, setModalAction] = useState<() => void>(() => {});

  const canSubmit = email.value.trim().length > 0 && password.value.length > 0;

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    const trimmed = next.trim();

    if (trimmed.length === 0) {
      setEmail({ value: next, variant: "informative", error: "" });
      return;
    }

    const nextVariant: FieldVariant = isValidEmail(next) ? "informative" : "error";
    setEmail({
      value: next,
      variant: nextVariant,
      error: nextVariant === "error" ? EMAIL_INVALID_MESSAGE : "",
    });
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;

    if (next.length === 0) {
      setPassword({ value: next, variant: "informative", error: "" });
      return;
    }

    const nextVariant: FieldVariant = isValidPassword(next) ? "informative" : "error";
    setPassword({
      value: next,
      variant: nextVariant,
      error: nextVariant === "error" ? PASSWORD_INVALID_MESSAGE : "",
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <CodeIcon
        aria-hidden="true"
        className="absolute left-[1048px] top-[60px] hidden h-[530px] w-[1090px] text-primary lg:block"
      />

      <section className="relative flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-[500px] rounded-[10px] bg-white/50 shadow-[0px_40px_100px_40px_rgba(3,104,255,0.05)] backdrop-blur-[25px]">
          <div className="flex flex-col items-center px-10 py-14 sm:px-14">
            <div className="flex flex-col items-center">
              <Logo variant="large" tone="default" />
            </div>

            <form
              className="mt-10 w-full max-w-[328px] space-y-6"
              onSubmit={async (e) => {
                e.preventDefault();
                if (isSubmitting) return;

                const emailValue = email.value.trim();
                const passwordValue = password.value;

                let hasRequiredError = false;
                if (!emailValue) {
                  hasRequiredError = true;
                  setEmail((prev) => ({ ...prev, variant: "error", error: EMAIL_REQUIRED_MESSAGE }));
                }
                if (!passwordValue) {
                  hasRequiredError = true;
                  setPassword((prev) => ({
                    ...prev,
                    variant: "error",
                    error: PASSWORD_REQUIRED_MESSAGE,
                  }));
                }
                if (hasRequiredError) return;

                if (email.variant === "error" || password.variant === "error") return;

                setIsSubmitting(true);
                try {
                  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: emailValue, password: passwordValue }),
                  });

                  if (res.ok) {
                    const data = await res.json();

                    // localstorage 인증 저장
                    localStorage.setItem("accessToken", data.accessToken);
                    localStorage.setItem("refreshToken", data.refreshToken);

                    if (data.isDuplicateLogin) {
                      setIsModalOpen(true);
                      setModalTitle("중복 로그인이 불가능합니다.");
                      setModalMessage(
                        "다른 기기에 중복 로그인 된 상태입니다. [확인] 버튼을 누르면 다른 기기에서 강제 로그아웃되며, 진행중이던 타이머가 있다면 기록이 자동 삭제됩니다."
                      );
                      setModalAction(() => () => {
                        setIsModalOpen(false);
                        router.push("/");
                      });
                    } else {
                      router.push("/");
                    }

                    return;
                  }

                  // 로그인 정보를 다시 확인해주세요.
                  setIsModalOpen(true);
                  setModalTitle("로그인 정보를 다시 확인해주세요.");
                  setModalMessage("");
                  setModalAction(() => () => {
                    setIsModalOpen(false);
                  });
                } catch {
                  // 알 수 없는 이유로 로그인에 실패했습니다.
                  setIsModalOpen(true);
                  setModalTitle("알 수 없는 이유로 로그인에 실패했습니다.");
                  setModalMessage("");
                  setModalAction(() => () => {
                    setIsModalOpen(false);
                  });
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              <TextField
                label="아이디"
                name="email"
                value={email.value}
                onChange={handleEmail}
                helperText={email.variant === "error" ? email.error : ""}
                helperVariant={email.variant}
                autoComplete="email"
                placeholder="이메일 주소를 입력해 주세요."
                containerClassName="w-full"
              />

              <TextField
                label="비밀번호"
                name="password"
                value={password.value}
                onChange={handlePassword}
                helperText={password.variant === "error" ? password.error : undefined}
                helperVariant={password.variant}
                type="password"
                autoComplete="current-password"
                placeholder="비밀번호를 입력해 주세요."
                containerClassName="w-full"
              />

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                aria-disabled={!canSubmit}
                className={cn(
                  "h-12 w-full",
                  !canSubmit && "bg-gray-400 text-gray-300 hover:bg-gray-400 active:bg-gray-400 shadow-none"
                )}
              >
                로그인
              </Button>

              <div className="flex items-center justify-center">
                <Link href="/signup" className="fontSize-body-sm-m text-primary">
                  회원가입
                </Link>
              </div>
            </form>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title={modalTitle}
              primaryButtonText="확인"
              onPrimaryClick={modalAction}
              description={modalMessage}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
