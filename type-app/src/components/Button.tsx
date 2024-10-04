import React from "react";

interface buttonProps {
  sy?: React.CSSProperties;
  size?: "small" | "large" | "medium";
  children: React.ReactNode;
  onClick?: (e?: any) => void;
}

const Button: React.FC<buttonProps> = ({ sy, size, children, onClick }) => {
  return (
    <button
      style={sy}
      onClick={onClick}
      className={`btn-sx ${size || "medium"}`}
    >
      {children}
    </button>
  );
};

export default Button;
