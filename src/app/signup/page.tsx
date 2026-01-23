"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Button, Checkbox, Logo, TextField } from "@/components/ui";
import { useRouter } from "next/navigation";

const hasLetter = /[A-Za-z]/;
const hasNumber = /\d/;
const isValidPassword = (value: string) =>
  value.length >= 8 && hasLetter.test(value) && hasNumber.test(value);

export default function Signup() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [email, setEmail] = useState("");
  const [emailVariant, setEmailVariant] = useState<"informative" | "error" | "success">("informative");
  const [emailError, setEmailError] = useState("");

  const [nickname, setNickname] = useState("");
  const [nicknameVariant, setNicknameVariant] = useState<"informative" | "error" | "success">("informative");
  const [nicknameError, setNicknameError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [passwordVariant, setPasswordVariant] = useState<"informative" | "error" | "success">("informative");

  const passwordConfirmVariant = useMemo<"informative" | "error" | "success">(() => {
    if (!passwordConfirm) return "informative";
    return password === passwordConfirm ? "success" : "error";
  }, [password, passwordConfirm]);
  
  const [agreed, setAgreed] = useState(false);

	  const canSubmit = useMemo(() => {
	    if (!agreed || emailVariant !== "success" || nicknameVariant !== "success" || passwordVariant !== "success") return false;
	    if (password !== passwordConfirm) return false;
	    return true;
	  }, [agreed, emailVariant, nicknameVariant, passwordVariant, passwordConfirm, password]);

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <section className="hidden lg:flex items-center justify-center bg-primary">
        <div className="flex flex-col items-center gap-6">
          <Logo variant="large" tone="white" href="/" />
          <p className="fontSize-body-s text-white/90">개발자를 위한 타이머</p>
        </div>
      </section>

      <section className="flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-105">
          <h1 className="text-primary fontSize-heading-b text-center h-[30px]">회원가입</h1>

	          <form
	            className="mt-10 flex flex-col gap-8"
	            onSubmit={async (e) => {
	              e.preventDefault();
	              if (!canSubmit || isSubmitting) return;

	              setIsSubmitting(true);
	              try {
	                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
	                  method: "POST",
	                  headers: { "Content-Type": "application/json" },
	                  body: JSON.stringify({
	                    email,
	                    nickname,
	                    password,
	                    confirmPassword: passwordConfirm,
	                  }),
	                });

	                if (!res.ok) {
	                  alert("회원가입에 실패했습니다.");
	                  return;
	                }

	                router.push("/login");
	              } catch {
	                alert("회원가입에 실패했습니다.");
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
	                if(emailVariant !== "error"){
                  setEmailVariant("error");
                  setEmailError("중복을 확인해 주세요.");
                }
              }}
              onButtonClick={()=>{
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup/check-email?email=${encodeURIComponent(email)}`,
                {method: 'GET', headers: {'Content-Type': 'application/json'}}
              ).then(async(res)=>{
                  if(res.ok){
                    const data = await res.json();
                    if(data.available){
                      setEmailVariant("success");
                    } else {
                      setEmailVariant("error");
                      setEmailError("이미 사용 중인 이메일입니다.");
                    }
                  } else {
                    setEmailVariant("error");
                    setEmailError("이메일 형식으로 작성해 주세요.");
                  }
                }).catch(()=>{
                  alert("이메일 중복 확인에 실패했습니다.");
                });
              }}
              helperText={
                emailVariant === "success"
                  ? "사용 가능한 이메일입니다."
                  : emailVariant === "error" ? emailError : ""
              }
	              helperVariant={emailVariant}
	              type="email"
	              placeholder="이메일 주소 형식으로 입력해 주세요."
	              autoComplete="email"
	              containerClassName="w-full"
	              buttonText="중복 확인"
	            />
            
	            <TextField
	              label="닉네임"
	              name="nickname"
	              value={nickname}
	              onChange={(e) => {
	                setNickname(e.target.value);
	                if(nicknameVariant !== "error"){
                  setNicknameVariant("error");
                  setNicknameError("중복을 확인해 주세요.");
                }
              }}
              onButtonClick={()=>{
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup/check-nickname?nickname=${encodeURIComponent(nickname)}`,
                {method: 'GET', headers: {'Content-Type': 'application/json'}}
              ).then(async(res)=>{
                  if(res.ok){
                    const data = await res.json();
                    if(data.available){
                      setNicknameVariant("success");
                    } else {
                      setNicknameVariant("error");
                      setNicknameError("이미 사용 중인 닉네임입니다.");
                    }
                  } else {
                  alert("닉네임 중복 확인에 실패했습니다.");
                  }
                }).catch(()=>{
                  alert("닉네임 중복 확인에 실패했습니다.");
                });
              }}
              type="text"
              placeholder="닉네임을 입력해 주세요."
              containerClassName="w-full"
              buttonText="중복 확인"
              helperText={
                nicknameVariant === "success"
                  ? "사용 가능한 닉네임입니다."
                  : nicknameVariant === "error" ? nicknameError : ""
              }
	              helperVariant={nicknameVariant}
	              autoComplete="nickname"
	            />

	            <TextField
	              label="비밀번호"
	              name="password"
	              value={password}
	              onChange={(e) => {
	                const next = e.target.value;
	                setPassword(next);
	                setPasswordVariant(isValidPassword(next) ? "success" : "error");
	              }}
	              helperVariant={passwordVariant}
	              helperText={
	                passwordVariant === "error"
	                  ? "비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다."
	                  : undefined
	              }
	              type="password"
	              placeholder="비밀번호를 입력해 주세요."
	              autoComplete="new-password"
	              containerClassName="w-full"
	            />

	            <TextField
	              label="비밀번호 확인"
	              name="confirmPassword"
	              value={passwordConfirm}
	              onChange={(e) => setPasswordConfirm(e.target.value)}
	              helperVariant={passwordConfirmVariant}
	              helperText={
	                passwordConfirmVariant === "error" ? "비밀번호가 일치하지 않습니다." : undefined
	              }
	              type="password"
	              placeholder="비밀번호를 다시 입력해 주세요."
	              autoComplete="new-password"
	              containerClassName="w-full"
	            />

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="fontSize-label-m text-gray-600">이용약관</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAgreed((v) => !v)}
                    className="fontSize-body-sm-m text-primary"
                  >
                    동의함
                  </button>
                  <Checkbox checked={agreed} onChange={() => setAgreed((v) => !v)} />
                </div>
              </div>

              <div className="h-[128px] overflow-auto rounded-[5px] bg-gray-50 px-4 py-3 text-gray-600 fontSize-caption-m">
                <p className="fontSize-body-sm-s">제1조 (목적)</p>
                <p className="mt-1">
                  이 약관은 DevTime(이하 “서비스”)의 이용 조건 및 절차, 사용자와 서비스 제공자(회사) 간의
                  권리·의무 및 책임사항을 규정함을 목적으로 합니다.
                </p>
                <p className="mt-4 fontSize-body-sm-s">제2조 (정의)</p>
                <p className="mt-1">
                  “사용자”란 본 약관에 동의하고 서비스를 이용하는 자를 말합니다. 기타 용어의 정의는 관계
                  법령 및 서비스 내 별도 안내에 따릅니다.
                </p>
              </div>
            </div>

	            <Button type="submit" variant="primary" disabled={!canSubmit || isSubmitting} className="w-full h-12">
	              회원가입
	            </Button>

            <div className="flex items-center justify-center gap-2 text-primary">
              <span className="fontSize-body-r">회원이신가요?</span>
              <Link href="/login" className="fontSize-body-b">
                로그인 바로가기
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
