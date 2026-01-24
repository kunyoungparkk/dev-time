"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CodeIcon } from "@/components/icons";
import { Button, Logo, TextField, Modal } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailVariant, setEmailVariant] = useState<"informative" | "error" | "success">("informative");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordVariant, setPasswordVariant] = useState<"informative" | "error" | "success">("informative");
  const [passwordError, setPasswordError] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalAction, setModalAction] = useState<() => void>(() => {});

  const canSubmit = useMemo(() => email.trim().length > 0 && password.length > 0, [email, password]);

  useEffect(()=>{
    const emailIsValid = email.includes("@") && email.includes(".") && email.indexOf("@") < email.lastIndexOf(".");
    
    if (emailVariant === "error" && emailIsValid) {
      setEmailVariant("informative");
      setEmailError("");
    }
    else if (email && !emailIsValid) {
      setEmailVariant("error");
      setEmailError("이메일 형식으로 작성해 주세요.");
    }
  }, [email]);
  useEffect(()=>{
    const passwordIsValid = password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);
    
    if (passwordVariant === "error" && passwordIsValid) {
      setPasswordVariant("informative");
      setPasswordError("");
    }
    else if (password && !passwordIsValid) {
      setPasswordVariant("error");
      setPasswordError("비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.");
    }
  }, [password])
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
                if(!email || !password){
                  setEmailVariant("error");
                  setEmailError("이메일을 입력해 주세요.");
                  setPasswordVariant("error");
                  setPasswordError("비밀번호를 입력해 주세요.");
                  return;
                }
                if (emailVariant === "error" || passwordVariant === "error" || isSubmitting) return;
                
                setIsSubmitting(true);
                try {
                  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                  }).then(async (res) => {
                    if(res.ok){
                      const data = await res.json();
                      
                      //localstorage 인증 저장
                      localStorage.setItem("accessToken", data.accessToken);
                      localStorage.setItem("refreshToken", data.refreshToken);

                      if(data.isDuplicateLogin){
                        setIsModalOpen(true);
                        setModalTitle("중복 로그인이 불가능합니다.");
                        setModalMessage("다른 기기에 중복 로그인 된 상태입니다. [확인] 버튼을 누르면 다른 기기에서 강제 로그아웃되며, 진행중이던 타이머가 있다면 기록이 자동 삭제됩니다.");
                        setModalAction(() => () => {
                          setIsModalOpen(false);
                          router.push("/");
                        });
                      }else{
                        router.push("/");
                      }

                      }
                    else {
                      // 로그인 정보를 다시 확인해주세요.
                      setIsModalOpen(true);
                      setModalTitle("로그인 정보를 다시 확인해주세요.");
                      setModalAction(() => () => {
                        setIsModalOpen(false);
                      });
                    }
                  });

                } catch (error) {
                  // 로그인에 실패했습니다.
                  setIsModalOpen(true);
                  setModalTitle("알 수 없는 이유로 로그인에 실패했습니다.");
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                helperText={emailVariant === "error" ? emailError : ""}
                helperVariant={emailVariant}
                autoComplete="email"
                placeholder="이메일 주소를 입력해 주세요."
                containerClassName="w-full"
              />

              <TextField
                label="비밀번호"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                helperText={passwordVariant === "error" ? passwordError : undefined}
                helperVariant={passwordVariant}
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
