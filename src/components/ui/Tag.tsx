"use client";

import { cn } from "@/lib/utils";
import { useId, useState } from "react";

export interface TagProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  onAdd?: (value: string) => void;
  addButtonLabel?: string;
  containerClassName?: string;
}

export const Tag = ({
  label = "Input Label",
  placeholder = "Placeholder",
  value,
  defaultValue,
  onChange,
  onAdd,
  onFocus,
  onBlur,
  addButtonLabel = "추가",
  containerClassName,
  className,
  id: idProp,
  ...inputProps
}: TagProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState<string>(
      (value ?? defaultValue ?? "") as string
    );

    const labelId = useId();
    const internalId = useId();
    const inputId = idProp ?? internalId;

    const currentValue = value !== undefined ? String(value) : internalValue;
    const hasValue = currentValue.length > 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleAdd = () => {
      if (hasValue) {
        onAdd?.(currentValue);
        // Clear input after adding
        if (value === undefined) {
          setInternalValue("");
        }
        const syntheticEvent = {
          target: { value: "" },
          currentTarget: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange?.(syntheticEvent);
      }
    };

    return (
      <div className={cn("flex flex-col items-start gap-2 w-45", containerClassName)}>
        {label && (
          <label
            id={labelId}
            htmlFor={inputId}
            className="fontSize-label-m text-gray-600 flex items-center self-stretch"
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "flex flex-row items-center justify-center px-6 py-4 gap-4 self-stretch rounded-[8px] bg-gray-100",
            className
          )}
        >
          <div className="flex-1 flex items-center gap-0 relative">
            <input
              id={inputId}
              type="text"
              value={currentValue}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholder}
              aria-labelledby={label ? labelId : undefined}
              className={cn(
                "w-full bg-transparent border-none outline-none fontSize-body-m",
                isFocused ? "text-gray-800" : "text-gray-600",
                "placeholder:text-gray-300"
              )}
              {...inputProps}
            />
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!hasValue}
            className={cn(
              "fontSize-body-b flex-none transition-colors",
              hasValue ? "text-primary" : "text-gray-400",
              !hasValue && "cursor-not-allowed"
            )}
          >
            {addButtonLabel}
          </button>
        </div>
      </div>
    );
};
