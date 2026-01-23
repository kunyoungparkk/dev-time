interface IconProps {
  size?: number; 
  className?: string;
}

export const ChevronUpIcon = ({ size = 24, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="currentColor"
      className={className}
    >
      <path d="M7 14.5L12.0008 9.5L17 14.5" />
    </svg>
  );
};
