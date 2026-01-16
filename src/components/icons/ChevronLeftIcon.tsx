interface IconProps {
  size?: number; 
  className?: string;
}

export const ChevronLeftIcon = ({ size = 24, className }: IconProps) => {
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
      <path d="M14.5 17L9.5 12L14.5 7" />
    </svg>
  );
};
