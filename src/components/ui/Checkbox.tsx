import { cn } from "@/lib/utils";
import { CheckIcon } from "@/components/icons";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = ({
  label,
  className,
  checked,
  onChange,
  ...props
}: CheckboxProps) => {
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
              "w-[18px] h-[18px] rounded-md transition-all flex items-center justify-center",
              checked
                ? "bg-[rgba(76,121,255,0.1)] border border-[var(--color-primary)]"
                : "bg-white border border-[var(--color-primary)]"
            )}
          >
            {checked && (
              <CheckIcon className="w-4 h-4 text-[var(--color-primary)]" />
            )}
          </div>
      </div>

      {label && (
        <span className="fontSize-body-m text-[var(--color-gray-500)]">
          {label}
        </span>
      )}
    </label>
  );
};

interface CheckboxTagProps {
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
          ? "bg-[var(--color-primary-10)] text-[var(--color-primary)]"
          : "bg-[var(--color-gray-100)] text-[var(--color-gray-500)]",
        className
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="sr-only"
      />

      <div
        className={cn(
          "w-[18px] h-[18px] rounded-md transition-all flex items-center justify-center flex-none",
          checked
            ? "bg-[rgba(76,121,255,0.1)] border border-[var(--color-primary)]"
            : "bg-white border border-[var(--color-primary)]"
        )}
      >
        {checked && (
          <CheckIcon className="w-4 h-4 text-[var(--color-primary)]" />
        )}
      </div>

      <span className="fontSize-body-m flex-none">
        {label}
      </span>
    </label>
  );
};
