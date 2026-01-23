interface IconProps {
  size?: number; 
  className?: string;
}

export const ChevronRightIcon = ({ size = 24, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="currentColor"
      className={className}
    >
      <path d="M9.5 7L14.5 12L9.5 17" />
    </svg>
  );
};
