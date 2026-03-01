import Link from "next/link";

// This is required to make optional props possible and for typing requirements
type PrimaryButtonProps = {
  href?: string;
  children: React.ReactNode;
};

// This is for locked buttons
type StageButtonProps = {
  label: string;
  description: string;
  unlocked: boolean;
  onClick: () => void;
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

// Stage buttons

export function StageButton({ label, description, unlocked, onClick }: StageButtonProps) {
  return (
    <button
      disabled={!unlocked}
      onClick={onClick}
      className={`cursor-target btn-pink relative flex items-center justify-between
        px-8 py-4 rounded-2xl border-4 text-left w-72 transition-transform
        duration-150 ease-in-out
        ${unlocked
          ? "hover:scale-105 active:scale-95 cursor-pointer opacity-100"
          : "opacity-40 cursor-not-allowed"
        }`}
    >
      <div>
        <p className="text-white text-2xl font-black m-0 leading-tight">{label}</p>
        <p className="text-[#8899AA] text-sm m-0 mt-1">{description}</p>
      </div>
    </button>
  );
}