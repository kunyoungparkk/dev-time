interface IconProps {
  size?: number; 
  className?: string;
}

export const ChevronUpIcon = ({ size = 24, className }: IconProps) => {
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
      <path d="M7 14.5L12.0008 9.5L17 14.5" />
    </svg>
  );
};
