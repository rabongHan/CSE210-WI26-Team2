import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function PrimaryButton({ href, children, className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center justify-center rounded-xl px-5 py-3",
        "font-semibold",
        "bg-primary text-primary-foreground",
        "hover:opacity-90 transition",
        className,
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export function SecondaryButton({ href, children, className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center justify-center rounded-xl px-5 py-3",
        "font-semibold",
        "border border-border bg-card text-foreground",
        "hover:bg-accent/10 transition",
        className,
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
