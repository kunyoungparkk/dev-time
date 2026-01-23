interface IconProps {
  width?: number;
  height?: number;
  className?: string;
}

export const CodeIcon = ({ width = 42, height = 20, className }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="currentColor"
      className={className}
    >
        <path d="M26.3271 1.44922L20.4736 20L15.6797 18.5508L21.5332 0L26.3271 1.44922ZM12.5859 4.93262L7.16504 10.1367L12.5859 15.3398L9.07324 18.8457L0 10.1367L9.07324 1.42676L12.5859 4.93262ZM42 10.1367L32.9268 18.8457L29.4141 15.3398L34.835 10.1367L29.4141 4.93262L32.9268 1.42676L42 10.1367Z"/>
    </svg>
  );
};
