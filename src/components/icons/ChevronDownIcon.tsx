interface IconProps {
  size?: number; 
  className?: string;
}

export const ChevronDownIcon = ({ size = 24, className }: IconProps) => {
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
      <path d="M7 9.5L12.0008 14.5L17 9.5" />
    </svg>
  );
};
