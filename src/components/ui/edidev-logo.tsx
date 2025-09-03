import React from "react";

interface EdiDevLogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
}

export const EdiDevLogo: React.FC<EdiDevLogoProps> = ({
  className = "",
  width = "auto",
  height = "auto",
  alt = "EdiDev Logo",
}) => {
  return (
    <img
      src="/edidev.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default EdiDevLogo;
