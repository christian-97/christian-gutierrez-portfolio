import React from "react";

export function PowerBiLogo({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Microsoft Power BI Logo"
      style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle" }}
    >
      <defs>
        <linearGradient id="pbi-grad-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D99B00" />
          <stop offset="100%" stopColor="#B37D00" />
        </linearGradient>
        <linearGradient id="pbi-grad-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2C811" />
          <stop offset="100%" stopColor="#D99B00" />
        </linearGradient>
        <linearGradient id="pbi-grad-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FADB43" />
          <stop offset="100%" stopColor="#F2C811" />
        </linearGradient>
      </defs>
      {/* Right / Tallest bar */}
      <rect x="21" y="4" width="7" height="24" rx="2" fill="url(#pbi-grad-3)" />
      {/* Middle bar */}
      <rect x="12.5" y="11" width="7" height="17" rx="2" fill="url(#pbi-grad-2)" />
      {/* Left / Shortest bar */}
      <rect x="4" y="18" width="7" height="10" rx="2" fill="url(#pbi-grad-1)" />
    </svg>
  );
}

export default PowerBiLogo;
