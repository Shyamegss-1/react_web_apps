import React from "react";

interface containerProps<E extends React.ElementType> {
  size: "xl" | "lg" | "md";
  component?: E;
  children?: React.ReactNode;
}

type typeContainer<E extends React.ElementType> = containerProps<E> &
  Omit<React.ComponentProps<E>, keyof containerProps<E>>;

export default function Container<E extends React.ElementType = "div">({
  size,
  component,
  children,
}: typeContainer<E>) {
  const El = component || "div";

  return <El className={`container-${size}`}>{children}</El>;
}
