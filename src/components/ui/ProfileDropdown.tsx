"use client";

import { cn } from "@/lib/utils";
import { useControllableState, useOnClickOutside } from "@/lib/hooks";
import { LogoutIcon, UserIcon } from "@/components/icons";
import { useEffect, useId, useMemo, useRef, useState } from "react";

interface ProfileDropdownProps {
  userName?: string;
  userImage?: string;
  myPageHref?: string;
  logoutHref?: string;
  onMyPage?: () => void;
  onLogout?: () => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: "start" | "end";
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
}

export const ProfileDropdown = ({
  userName = "User",
  userImage,
  myPageHref = "/mypage",
  logoutHref,
  onMyPage,
  onLogout,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  align = "start",
  className,
  buttonClassName,
  menuClassName,
}: ProfileDropdownProps) => {
  const [open, setOpen] = useControllableState<boolean>({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | HTMLButtonElement | null>>([]);

  const menuId = useId();
  const buttonId = useId();

  const items = useMemo(
    () => [
      {
        key: "mypage",
        label: "마이페이지",
        icon: <UserIcon size={20} className="text-[#4B5563]" />,
        href: myPageHref,
        onSelect: onMyPage,
      },
      {
        key: "logout",
        label: "로그아웃",
        icon: <LogoutIcon size={20} className="text-[#4B5563]" />,
        href: logoutHref,
        onSelect: onLogout,
      },
    ],
    [logoutHref, myPageHref, onLogout, onMyPage]
  );

  const closeMenu = () => {
    setOpen(false);
    setActiveIndex(-1);
    buttonRef.current?.focus();
  };

  const openMenu = (index = 0) => {
    setOpen(true);
    setActiveIndex(index);
  };

  useOnClickOutside({
    ref: wrapperRef,
    when: open,
    handler: () => {
      setOpen(false);
      setActiveIndex(-1);
    },
  });

  useEffect(() => {
    if (!open) {
      setActiveIndex(-1);
      return;
    }
    if (activeIndex >= 0) return;
    setActiveIndex(0);
  }, [activeIndex, open]);

  useEffect(() => {
    if (!open) return;
    if (activeIndex < 0) return;
    const element = itemRefs.current[activeIndex];
    element?.focus();
  }, [open, activeIndex]);

  const onTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) return openMenu(0);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return openMenu(items.length - 1);
      return;
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (open) return closeMenu();
      return openMenu(0);
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  const onItemKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.min(index + 1, items.length - 1);
      setActiveIndex(next);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = Math.max(index - 1, 0);
      setActiveIndex(prev);
      return;
    }

    if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
      return;
    }

    if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(items.length - 1);
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
      return;
    }

    if (e.key === "Tab") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  const triggerInitial = userName?.[0]?.toUpperCase() || "U";

  return (
    <div ref={wrapperRef} className={cn("relative inline-block", className)}>
      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => (open ? closeMenu() : openMenu(0))}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          "flex items-center gap-3 rounded-[999px] bg-white px-3 py-2 shadow-[0px_8px_8px_rgba(0,0,0,0.05)]",
          "border border-[#CCD0D6]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF47FF]",
          buttonClassName
        )}
      >
        <div className="w-8 h-8 rounded-full bg-[#E5E7EB] overflow-hidden flex items-center justify-center flex-none">
          {userImage ? (
            <img src={userImage} alt={userName} className="w-full h-full object-cover" />
          ) : (
            <span className="fontSize-body-s text-[#4B5563]">{triggerInitial}</span>
          )}
        </div>
        <span className="fontSize-body-m text-[#4B5563]">{userName}</span>
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-labelledby={buttonId}
          className={cn(
            "absolute z-50 mt-2 w-[130px] rounded-[5px] border border-[#CCD0D6] bg-white px-3 py-4 shadow-[0px_8px_8px_rgba(0,0,0,0.05)]",
            align === "end" ? "right-0" : "left-0",
            menuClassName
          )}
        >
          <div className="flex flex-col gap-4">
            {items.map((item, index) => {
              const commonProps = {
                ref: (el: HTMLAnchorElement | HTMLButtonElement | null) => {
                  itemRefs.current[index] = el;
                },
                role: "menuitem" as const,
                tabIndex: index === activeIndex ? 0 : -1,
                onMouseEnter: () => setActiveIndex(index),
                onMouseDown: (e: React.MouseEvent) => e.preventDefault(),
                onKeyDown: (e: React.KeyboardEvent) => onItemKeyDown(e, index),
                className: cn(
                  "flex w-full items-center gap-4 rounded-[5px] px-2 py-1 text-left text-[#4B5563]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF47FF]",
                  "hover:bg-[#F9FAFB]"
                ),
              };

              const content = (
                <>
                  {item.icon}
                  <span className="fontSize-body-m">{item.label}</span>
                </>
              );

              return (
                <div key={item.key} className="flex flex-col gap-4">
                  {item.href ? (
                    <a
                      {...commonProps}
                      href={item.href}
                      onClick={() => {
                        item.onSelect?.();
                        closeMenu();
                      }}
                    >
                      {content}
                    </a>
                  ) : (
                    <button
                      {...commonProps}
                      type="button"
                      onClick={() => {
                        item.onSelect?.();
                        closeMenu();
                      }}
                    >
                      {content}
                    </button>
                  )}
                  {index < items.length - 1 && <span className="h-px w-full bg-[#CCD0D6]" />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
