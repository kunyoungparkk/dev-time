"use client";

import { cn } from "@/lib/utils";
import { useId } from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  containerClassName?: string;
  error?: boolean;
  helperText?: string;
}

export const Textarea = ({
  label,
  containerClassName,
  error = false,
  helperText,
  placeholder = "Placeholder",
  className,
  id: idProp,
  ...textareaProps
}: TextareaProps) => {
    const labelId = useId();
    const internalId = useId();
    const textareaId = idProp ?? internalId;
    const helperTextId = useId();

    return (
      <div className={cn("flex flex-col items-start gap-2 w-142 h-21", containerClassName)}>
        {label && (
          <label
            id={labelId}
            htmlFor={textareaId}
            className="fontSize-label-m text-gray-600 flex items-center self-stretch"
          >
            {label}
          </label>
        )}

        <textarea
          id={textareaId}
          placeholder={placeholder}
          aria-labelledby={label ? labelId : undefined}
          aria-describedby={helperText ? helperTextId : undefined}
          aria-invalid={error}
          className={cn(
            "flex flex-row items-start self-stretch resize-none",
            "px-4 py-3 rounded-[5px] bg-gray-50",
            "fontSize-body-m text-gray-600",
            "placeholder:text-gray-300",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-state-focus",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "ring-2 ring-red-500",
            className
          )}
          {...textareaProps}
        />

        {helperText && (
          <span
            id={helperTextId}
            className={cn(
              "fontSize-body-xs",
              error ? "text-red-500" : "text-[#6B7280]"
            )}
          >
            {helperText}
          </span>
        )}
      </div>
    );
};
