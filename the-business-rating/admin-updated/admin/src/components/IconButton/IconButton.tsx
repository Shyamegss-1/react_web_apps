import React from "react";

import { Android, Icon } from "iconsax-react";
import { Link } from "react-router-dom";

interface ButtonProps<T extends React.ElementType> {
  children: React.ReactNode;
  sx?: React.CSSProperties;
  className?: string;
  variant?: "contained" | "bordered" | "light" | "secondary";
  href?: string;
  component?: T;
  Icon?: any;
}

type ButtonRef<T extends React.ElementType> = ButtonProps<T> &
  Omit<React.ComponentProps<T>, keyof ButtonProps<T>>;

const IconButton = <T extends React.ElementType = "span">({
  children,
  sx,
  className = "",
  variant = "contained",
  href,
  component,
  Icon,
  ...props
}: ButtonRef<T>): React.ReactElement => {
  const variantClasses = {
    contained:
      "rounded-md bg-green-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 inline-flex items-center",
    bordered:
      "border border-blue-500 text-blue-500 inline-flex items-center inline-flex items-center",
    light:
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold transition-colors hover:bg-zinc-300 inline-flex items-center",
    secondary:
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold transition-colors bg-zinc-300 inline-flex items-center ",
  }[variant];

  const combinedClasses = `${variantClasses} ${className}`;
  const Component = href ? Link : component || "button";
  const Span = "span";

  return (
    <Component
      style={{ ...sx }}
      className={`px-4 py-2 rounded ${combinedClasses}`}
      to={href ?? "#"}
      {...props}
    >
      {!Icon ? <Android size="24" color="#d9e3f0" variant="Outline" /> : Icon}
      <Span className="ms-2">{children}</Span>
    </Component>
  );
};

export default IconButton;
