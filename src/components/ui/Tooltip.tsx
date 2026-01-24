"use client";

import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export const Tooltip = ({
  content,
  children,
  position = "top",
  className,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible || !triggerRef.current || !tooltipRef.current) return;

    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (position) {
      case "top":
        top = -tooltipRect.height - 8;
        left = (triggerRect.width - tooltipRect.width) / 2;
        break;
      case "bottom":
        top = triggerRect.height + 8;
        left = (triggerRect.width - tooltipRect.width) / 2;
        break;
      case "left":
        top = (triggerRect.height - tooltipRect.height) / 2;
        left = -tooltipRect.width - 8;
        break;
      case "right":
        top = (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.width + 8;
        break;
    }

    setTooltipStyle({ top, left });
  }, [isVisible, position]);

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          style={tooltipStyle}
          className={cn(
            "absolute z-50 max-w-82 rounded-md py-1 px-2 gap-2",
            "bg-[var(--color-gray-800)] text-[var(--color-gray-white)] fontSize-caption-r",
            "whitespace-nowrap shadow-lg",
            "animate-in fade-in-0 zoom-in-95",
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};
