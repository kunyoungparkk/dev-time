interface IconProps {
  size?: number; 
  className?: string;
}

export const DoubleChevronLeftIcon = ({ size = 24, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M17 17L12 12L17 7" />
      <path d="M12 17L7 12L12 7" />
    </svg>
  );
};
