interface IconProps {
  size?: number; 
  className?: string;
}

export const CheckIcon = ({ size = 24, className }: IconProps) => {
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
      <path d="M16.8002 8.3999L9.64068 15.5999L7.2002 13.1456" />
    </svg>
  );
};
