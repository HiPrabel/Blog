import React from "react";
import logoSrc from "/LOGO.png";

function Logo({ width = "100px", className = "" }) {
  return (
    <div>
      <img src={logoSrc} alt="LOGO" width={width} className={className} fetchpriority="high"/>
    </div>
  );
}

export default Logo;
