import Link from "next/link";

// This is required to make optional props possible and for typing requirements
type PrimaryButtonProps = {
  href?: string;
  children: React.ReactNode;
};

// Button for navigating to other pages E.g. start, back
export function NavButton({ href, children }: PrimaryButtonProps) {
    return (
      <Link href={href}>
      <button
        style={{
          backgroundColor: "#FFB6C1",
          color: "black",
          fontSize: "1.8rem",
          fontWeight: 800,
          padding: "0.8rem 3rem",
          border: "none",
          borderRadius: "9999px",
          cursor: "pointer",
          fontFamily: "inherit",
          letterSpacing: "0.05em",
        }}
      >
        {children}
      </button>
      </Link>
    );
}