"use client";

import { cn } from "@/lib/utils";
import { useId, useState } from "react";
import { Button } from "./Button";
import { VariantProps, cva } from "class-variance-authority";

// TextFieldInput Component
export interface TextFieldInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

export const TextFieldInput = ({
  containerClassName,
  className,
  onFocus,
  onBlur,
  onChange,
  value,
  defaultValue,
  ...inputProps
}: TextFieldInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState<string>(
    (value ?? defaultValue ?? "") as string
  );

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const currentValue = value !== undefined ? String(value) : internalValue;
  const hasValue = currentValue.length > 0;

  return (
    <div
      className={cn(
        "flex flex-row items-center px-4 py-3 gap-2.5 bg-gray-50 rounded-[5px] flex-1",
        containerClassName
      )}
    >
      <input
        value={currentValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn(
          "w-full bg-transparent border-none outline-none fontSize-body-m",
          isFocused ? "text-gray-800" : hasValue ? "text-gray-600" : "text-gray-300",
          "placeholder:text-gray-300",
          className
        )}
        {...inputProps}
      />
    </div>
  );
};

// TextFieldHelperText Component
const helperTextVariants = cva(
  "fontSize-caption-m flex items-center",
  {
    variants: {
      variant: {
        informative: "text-secondary-informative",
        error: "text-secondary-negative",
        success: "text-secondary-positive",
      },
    },
    defaultVariants: {
      variant: "informative",
    },
  }
);

export interface TextFieldHelperTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof helperTextVariants> {
  children: React.ReactNode;
}

export const TextFieldHelperText = ({
  children,
  variant,
  className,
  ...spanProps
}: TextFieldHelperTextProps) => {
  return (
    <span
      className={cn(helperTextVariants({ variant }), className)}
      {...spanProps}
    >
      {children}
    </span>
  );
};

// TextFieldButton Component
export interface TextFieldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const TextFieldButton = ({
  type = "button",
  children,
  className,
  ...buttonProps
}: TextFieldButtonProps) => {
  return (
    <Button
      variant="secondary"
      type={type}
      className={cn("h-11 fontSize-label-s flex-none", className)}
      {...buttonProps}
    >
      {children}
    </Button>
  );
};

// TextField Component (Main)
export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children'> {
  label?: string;
  helperText?: string;
  helperVariant?: VariantProps<typeof helperTextVariants>['variant'];
  buttonText?: string;
  buttonDisabled?: boolean;
  onButtonClick?: () => void;
  containerClassName?: string;
  inputContainerClassName?: string;
}

export const TextField = ({
  label,
  helperText,
  helperVariant,
  buttonText,
  onButtonClick,
  containerClassName,
  inputContainerClassName,
  className,
  id: idProp,
  ...inputProps
}: TextFieldProps) => {
  const labelId = useId();
  const internalId = useId();
  const inputId = idProp ?? internalId;
  const helperTextId = useId();

  const buttonDisabled =
    inputProps.value !== undefined || inputProps.defaultValue !== undefined
      ? String(inputProps.value ?? inputProps.defaultValue ?? "").trim().length === 0
      : false;

  return (
    <div className={cn("flex flex-col items-start gap-2 w-52", containerClassName)}>
      {label && (
        <label
          id={labelId}
          htmlFor={inputId}
          className="fontSize-label-m text-gray-600 flex items-center self-stretch"
        >
          {label}
        </label>
      )}

      <div className={cn("flex flex-row items-center gap-3 self-stretch", inputContainerClassName)}>
        <TextFieldInput
          id={inputId}
          aria-labelledby={label ? labelId : undefined}
          aria-describedby={helperText ? helperTextId : undefined}
          className={className}
          {...inputProps}
        />

        {buttonText && (
          <TextFieldButton disabled={buttonDisabled} onClick={onButtonClick}>
            {buttonText}
          </TextFieldButton>
        )}
      </div>

      {helperText && (
        <TextFieldHelperText id={helperTextId} variant={helperVariant}>
          {helperText}
        </TextFieldHelperText>
      )}
    </div>
  );
};
