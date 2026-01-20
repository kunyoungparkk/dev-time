import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
}

const buttonVariants = {
  primary: `
    bg-primary text-white
    disabled:bg-state-disabled disabled:text-gray-400
    focus:ring-2 focus:ring-[#FF47FF]
  `,
  secondary: `
    bg-primary-10 text-primary
    disabled:bg-gray-200 disabled:text-state-disabled
    focus:ring-2 focus:ring-[#FF47FF]
  `,
  tertiary: `
    bg-gray-50 text-primary
    disabled:bg-gray-200 disabled:text-state-disabled
    focus:ring-2 focus:ring-[#FF47FF]
  `,
};

export const Button = ({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center leading-none h-12 px-4 py-3 rounded-[5px] gap-8 fontSize-subtitle-s transition-colors focus:outline-none',
        buttonVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
