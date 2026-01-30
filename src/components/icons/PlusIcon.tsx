interface IconProps {
  size?: number; 
  className?: string;
}

export const PlusIcon = ({ size = 24, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M11.9998 4.80005L11.9998 19.2M19.1998 12L4.7998 12" />
    </svg>
  );
};
