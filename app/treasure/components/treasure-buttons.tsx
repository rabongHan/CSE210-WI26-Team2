import Link from "next/link"

// This is required to make optional props possible and for typing requirements
type PrimaryButtonProps = {
  href?: string;
  children: React.ReactNode;
};

// Button for navigating to other pages E.g. start, back
export function NavButton({href, children}: PrimaryButtonProps) {
    return (
      <Link href={href}>
          <button className="
              inline-flex items-center justify-center gap-2 
              rounded-xl px-6 py-3 font-bold shadow-lg backdrop-blur transition-all duration-200
              hover:scale-105 hover:shadow-xl active:scale-95
            "> {children}</button>
      </Link>
    );
}

