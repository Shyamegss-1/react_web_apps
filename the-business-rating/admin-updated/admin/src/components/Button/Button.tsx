import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps<T extends React.ElementType> {
  children: React.ReactNode;
  sx?: React.CSSProperties;
  className?: string;
  variant?: "contained" | "bordered" | "light";
  href?: string;
  component?: T;
}

type ButtonRef<T extends React.ElementType> = ButtonProps<T> &
  Omit<React.ComponentProps<T>, keyof ButtonProps<T>>;

const Button = <T extends React.ElementType = "span">({
  children,
  sx,
  className = "",
  variant = "contained",
  href,
  component,
}: ButtonRef<T>): React.ReactElement => {
  const variantClasses = {
    contained:
      "rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
    bordered: "border border-blue-500 text-blue-500",
    light:
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-zinc-600 hover:bg-opacity-75 text-white",
  }[variant];

  const combinedClasses = `${variantClasses} ${className}`;
  const Component = href ? Link : "button";
  const Span = component || "span";

  return (
    <Component
      style={{ ...sx }}
      className={`px-4 py-2 rounded ${combinedClasses}`}
      to={href ?? "#"}
    >
      <Span>{children}</Span>
    </Component>
  );
};

export default Button;
