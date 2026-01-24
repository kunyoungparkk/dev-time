interface IconProps {
  size?: number; 
  className?: string;
}

export const DoubleChevronRightIcon = ({ size = 24, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="currentColor"
      className={className}
    >
      <path d="M7 7L12 12L7 17" />
      <path d="M12 7L17 12L12 17" />
    </svg>
  );
};
