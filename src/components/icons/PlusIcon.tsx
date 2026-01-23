interface IconProps {
  size?: number; 
  className?: string;
}

export const PlusIcon = ({ size = 24, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="currentColor"
      className={className}
    >
      <path d="M11.9998 4.80005L11.9998 19.2M19.1998 12L4.7998 12" />
    </svg>
  );
};
