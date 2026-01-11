interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className = '', width = 180, height = 40 }: LogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 180 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Ticket Icon */}
      <g>
        {/* Main ticket shape */}
        <rect
          x="2"
          y="8"
          width="32"
          height="24"
          rx="3"
          fill="#FF4905"
        />
        
        {/* Perforation circles on left */}
        <circle cx="10" cy="12" r="1" fill="white" opacity="0.4" />
        <circle cx="10" cy="16" r="1" fill="white" opacity="0.4" />
        <circle cx="10" cy="20" r="1" fill="white" opacity="0.4" />
        <circle cx="10" cy="24" r="1" fill="white" opacity="0.4" />
        <circle cx="10" cy="28" r="1" fill="white" opacity="0.4" />
        
        {/* Accent stripe */}
        <rect
          x="18"
          y="8"
          width="4"
          height="24"
          fill="#1a2b49"
        />
        
        {/* Perforation circles on right */}
        <circle cx="26" cy="12" r="1" fill="white" opacity="0.4" />
        <circle cx="26" cy="16" r="1" fill="white" opacity="0.4" />
        <circle cx="26" cy="20" r="1" fill="white" opacity="0.4" />
        <circle cx="26" cy="24" r="1" fill="white" opacity="0.4" />
        <circle cx="26" cy="28" r="1" fill="white" opacity="0.4" />
      </g>

      {/* Text: Gotiquet */}
      <text
        x="42"
        y="27"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="22"
        fontWeight="700"
        fill="#FF4905"
      >
        Gotiquet
      </text>
    </svg>
  );
}