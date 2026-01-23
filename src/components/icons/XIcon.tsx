interface IconProps {
  size?: number; 
  className?: string;
}

export const XIcon = ({ size = 24, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="currentColor"
      className={className}
    >
      <path d="M18 6L6 18M18 18L6 6" />
    </svg>
  );
};
