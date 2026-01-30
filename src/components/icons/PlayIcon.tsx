interface IconProps {
  size?: number;
  className?: string;
}

export const PlayIcon = ({ size = 24, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 100"
      fill="currentColor"
      className={className}
    >
      <path d="M77.6727 45.5679C80.7758 47.5378 80.7758 52.4623 77.6727 54.4321L6.98182 99.3067C3.87879 101.277 -1.56621e-07 98.8143 0 94.8747L3.56802e-06 5.12534C3.72464e-06 1.18573 3.87879 -1.27653 6.98182 0.693278L77.6727 45.5679Z" />
    </svg>
  );
};
