import { cn } from "@/lib/utils";
import Link from "next/link";
import { Logo } from "./Logo";

interface NavigationBarProps {
  type?: 'pc' | 'tablet' | 'mobile';
  currentPath?: string;
  isLoggedIn?: boolean;
  userName?: string;
  userImage?: string;
  className?: string;
}

interface NavigationBarMenuProps {
  currentPath?: string;
}

export const NavigationBar = ({
  type = 'pc',
  currentPath = '/',
  isLoggedIn = false,
  userName,
  userImage,
  className,
}: NavigationBarProps) => {
  return (
    <nav
      className={cn(
        "flex flex-row justify-between items-center h-10",
        type === 'pc' ? 'w-300' :
        type === 'tablet' ? 'w-300' :
        type === 'mobile' ? 'w-300' : '',
        className
      )}
    >
      <div className="flex flex-row items-center gap-12">
        <Logo href="/" />
        <NavigationBarMenu currentPath={currentPath} />
      </div>
      <NavigationBarLogin
        isLoggedIn={isLoggedIn}
        userName={userName}
        userImage={userImage}
      />
    </nav>
  );
};

export const NavigationBarMenu = ({ currentPath = '/' }: NavigationBarMenuProps) => {
  return (
    <div className="flex flex-row items-center gap-9 text-[var(--color-secondary-indigo)]">
      <Link
        href="/dashboard"
        className={cn(
          currentPath === "/dashboard"
            ? "fontSize-body-b underline underline-offset-4"
            : "fontSize-body-m"
        )}
      >
        대시보드
      </Link>
      <Link
        href="/ranking"
        className={cn(
          currentPath === "/ranking"
            ? "fontSize-body-b underline underline-offset-4"
            : "fontSize-body-m"
        )}
      >
        랭킹
      </Link>
    </div>
  );
};

export const NavigationBarAccount = ({})=>{
  return (
      <div className="flex flex-row justify-end items-center gap-9 text-[var(--color-secondary-indigo)] fontSize-body-s">
        <Link href="/login">
          로그인
        </Link>
        <Link href="/signup">
          회원가입
        </Link>
      </div>
  );
}

interface NavigationBarLoginProps {
  isLoggedIn?: boolean;
  userName?: string;
  userImage?: string;
}

export const NavigationBarLogin = ({
  isLoggedIn = false,
  userName,
  userImage,
}: NavigationBarLoginProps) => {
  if (!isLoggedIn) {
    return <NavigationBarAccount />;
  }

  return (
    <div className="flex flex-row justify-end items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-[#E5E7EB] overflow-hidden flex-none">
        {userImage ? (
          <img
            src={userImage}
            alt={userName || "User"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#4B5563] fontSize-body-s">
            {userName?.[0]?.toUpperCase() || "U"}
          </div>
        )}
      </div>
      <span className="fontSize-body-b text-[var(--color-secondary-indigo)] text-right">
        {userName || "User"}
      </span>
    </div>
  );
};