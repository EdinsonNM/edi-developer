import React from "react";

interface OnlyForDevsProps {
  children?: React.ReactNode;
}

const OnlyForDevs = ({ children }: OnlyForDevsProps) => {
  // Add your component logic here

  return <div>ONLY FOR DEVS{children}</div>;
};

export default OnlyForDevs;
