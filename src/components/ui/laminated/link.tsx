import React from "react";
import { laminatedBase, laminatedSizes, laminatedVariants } from "./styles";

type LaminatedLinkProps = {
  color?: "yellow" | "violet" | "slate";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function LaminatedLink({
  color = "yellow",
  size = "md",
  className = "",
  children,
  ...props
}: LaminatedLinkProps) {
  const v = laminatedVariants[color];

  return (
    <a
      {...props}
      className={`
        cursor-pointer
        ${laminatedBase}
        ${laminatedSizes[size]}
        ${v.bg}
        ${v.text}
        ${v.ring}
        ${v.shadow}
        ${v.hover}
        ${className}
      `}
    >
      <span
        className="
          pointer-events-none
          absolute inset-x-1 top-1
          h-3 rounded-md
          bg-linear-to-b from-white/40 to-transparent
        "
      />

      <span className="relative z-10 font-ubuntu">{children}</span>
    </a>
  );
}
