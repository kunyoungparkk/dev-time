'use client';

import { cn } from "@/lib/utils";
import { CheckIcon } from "@/components/icons";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  size?: number;
  color?: string;
}

const checkboxColorClasses = {
  primary: { border: "border-primary", icon: "text-primary" },
  white: { border: "border-white", icon: "text-white" },
} as const;

export const Checkbox = ({
  label,
  className,
  checked,
  onChange,
  size = 18,
  color = "primary",
  ...props
}: CheckboxProps) => {
  const resolvedColor =
    checkboxColorClasses[color as keyof typeof checkboxColorClasses] ??
    checkboxColorClasses.primary;

  return (
    <label className={cn("inline-flex items-center gap-2 cursor-pointer", className)}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
          {...props}
        />
          <div
            className={cn(
              "rounded-md transition-all flex items-center justify-center border",
              resolvedColor.border,
              checked ? "bg-primary-10" : "bg-transparent"
            )}
            style={{
              width: size,
              height: size,
            }}
          >
            {checked && (
              <CheckIcon className={resolvedColor.icon} size={size} />
            )}
          </div>
      </div>

      {label && (
        <span className="fontSize-body-m text-gray-500">
          {label}
        </span>
      )}
    </label>
  );
};

export interface CheckboxTagProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const CheckboxTag = ({
  label,
  checked = false,
  onChange,
  className,
}: CheckboxTagProps) => {
  return (
    <label
      className={cn(
        "inline-flex flex-row justify-center items-center py-1 px-2 gap-2 rounded-md cursor-pointer transition-colors",
        checked
          ? "bg-primary-10 text-primary"
          : "bg-gray-100 text-gray-500",
        className
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          onChange?.(e.target.checked);
        }}
        className="sr-only"
      />

      <div
        className={cn(
          "w-[18px] h-[18px] rounded-md transition-all flex items-center justify-center flex-none",
          checked
            ? "bg-primary-10 border border-primary"
            : "bg-white border border-primary"
        )}
      >
        {checked && (
          <CheckIcon className="text-primary" />
        )}
      </div>

      <span className="fontSize-body-m flex-none">
        {label}
      </span>
    </label>
  );
};
