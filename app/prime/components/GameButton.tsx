/**
 * Reusable button component with different variants
 */

interface GameButtonProps {
  onClick: () => void;
  variant?: 'primary' | 'yes' | 'no' | 'continue';
  disabled?: boolean;
  children: React.ReactNode;
}

export default function GameButton({ 
  onClick, 
  variant = 'primary', 
  disabled = false, 
  children
}: GameButtonProps) {
  const variantClasses = {
    primary: "bg-[#f7c948] text-gray-900 border-gray-900 py-[2%] px-[4%] text-[clamp(20%,2vw,35px)] shadow-[0_6px_0_#111]",
    yes: "bg-sky-300 text-slate-900 border-slate-900 py-[2%] px-[4%] text-[clamp(18px,2vw,28px)] shadow-[0_6px_0_#0f172a]",
    no: "bg-rose-300 text-slate-900 border-slate-900 py-[2%] px-[4%] text-[clamp(18px,2vw,28px)] shadow-[0_6px_0_#0f172a]",
    continue: "bg-green-400 text-slate-900 border-slate-900 py-[1.5%] px-[3.5%] text-[clamp(18px,2vw,28px)] shadow-[0_6px_0_#0f172a]",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${variantClasses[variant]} border-[3px] rounded-full font-bold font-sans cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none`}
    >
      {children}
    </button>
  );
}
