import { cn } from "@/lib/utils";
import { XIcon } from "../icons";

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  onRemove?: () => void;
}

export const Chip = ({
  className,
  children,
  onRemove,
  onClick,
  ...props
}: ChipProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center h-11 px-3 py-3 rounded-md gap-2.5 border fontSize-body-sm-m transition-all",
        "bg-[rgba(76,121,255,0.1)] text-primary border-[#4C79FF1A]",
        "hover:bg-[rgba(76,121,255,0.15)]",
        "active:bg-[rgba(76,121,255,0.2)]",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 hover:text-secondary-indigo transition-colors"
          aria-label="Remove"
        >
          <XIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
