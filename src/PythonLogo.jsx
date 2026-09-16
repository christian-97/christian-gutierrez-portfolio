import React from "react";

export function PythonLogo({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Python Logo"
      style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle" }}
    >
      <path
        d="M11.5 2C8.46 2 7 3.12 7 5v2h5v1H5.5C3.57 8 2 9.79 2 12s1.57 4 3.5 4H7v-2.5C7 11.34 8.46 10 11.5 10H15V5c0-1.88-1.46-3-3.5-3zm-1 2a1 1 0 110 2 1 1 0 010-2z"
        fill="#387eb8"
      />
      <path
        d="M12.5 22c3.04 0 4.5-1.12 4.5-3v-2h-5v-1h6.5c1.93 0 3.5-1.79 3.5-4s-1.57-4-3.5-4H17v2.5C17 12.66 15.54 14 12.5 14H9v5c0 1.88 1.46 3 3.5 3zm1-2a1 1 0 110-2 1 1 0 010 2z"
        fill="#f2c811"
      />
    </svg>
  );
}

export default PythonLogo;
