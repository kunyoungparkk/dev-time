import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center h-12 px-4 py-3 rounded-[5px] gap-2 fontSize-subtitle-s transition-all focus:outline-none",
  {
    variants: {
      variant: {
        primary: `
          bg-[#4C79FF] text-white
          hover:bg-[#4C79FF] hover:shadow-[inset_0_0_0_999px_rgba(0,0,0,0.1)]
          active:shadow-[inset_0_0_0_999px_rgba(0,0,0,0.2)]
          focus:border-[1.5px] focus:border-[#FF47FF]
          disabled:bg-[#969DA8] disabled:text-[#CCD0D6] disabled:shadow-none
        `,
        secondary: `
          bg-[rgba(76,121,255,0.1)] text-[#4C79FF]
          hover:shadow-[inset_0_0_0_999px_rgba(0,0,0,0.1)]
          active:shadow-[inset_0_0_0_999px_rgba(0,0,0,0.2)]
          focus:border-[1.5px] focus:border-[#FF47FF]
          disabled:bg-[#E5E7EB] disabled:text-[#969DA8] disabled:shadow-none
        `,
        tertiary: `
          bg-[#F9FAFB] text-[#4C79FF]
          hover:shadow-[inset_0_0_0_999px_rgba(0,0,0,0.1)]
          active:shadow-[inset_0_0_0_999px_rgba(0,0,0,0.2)]
          focus:border-[1.5px] focus:border-[#FF47FF]
          disabled:bg-[#E5E7EB] disabled:text-[#969DA8] disabled:shadow-none
        `,
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = ({
  variant,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ variant }), className)} {...props}>
      {children}
    </button>
  );
};
