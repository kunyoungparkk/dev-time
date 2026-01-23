import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center h-12 px-4 py-3 rounded-[5px] gap-2 fontSize-subtitle-s transition-all focus:outline-none",
  {
    variants: {
      variant: {
        primary: `
          bg-primary text-white
          hover:bg-primary hover:shadow-[inset_0_0_0_999px_rgba(0,0,0,0.1)]
          active:shadow-[inset_0_0_0_999px_rgba(0,0,0,0.2)]
          focus:border-[1.5px] focus:border-[#FF47FF]
          disabled:bg-gray-400 disabled:text-gray-300 disabled:shadow-none
        `,
        secondary: `
          bg-[rgba(76,121,255,0.1)] text-primary
          hover:shadow-[inset_0_0_0_999px_rgba(0,0,0,0.1)]
          active:shadow-[inset_0_0_0_999px_rgba(0,0,0,0.2)]
          focus:border-[1.5px] focus:border-[#FF47FF]
          disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none
        `,
        tertiary: `
          bg-gray-50 text-primary
          hover:shadow-[inset_0_0_0_999px_rgba(0,0,0,0.1)]
          active:shadow-[inset_0_0_0_999px_rgba(0,0,0,0.2)]
          focus:border-[1.5px] focus:border-[#FF47FF]
          disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none
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
