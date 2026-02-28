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
      <button className="cursor-target btn-pink text-3xl py-3 px-12 tracking-wide">
        {children}
      </button>
    </Link>
  );
}