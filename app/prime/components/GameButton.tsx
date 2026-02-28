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
  const variantStyles = {
    primary: {
      backgroundColor: "#f7c948",
      color: "#111",
      border: "3px solid #111",
      padding: "2% 4%",
      fontSize: "clamp(20%, 2vw, 35px)",
      boxShadow: "0 6px 0 #111",
    },
    yes: {
      backgroundColor: "#7dd3fc",
      color: "#0f172a",
      border: "3px solid #0f172a",
      padding: "2% 4%",
      fontSize: "clamp(18px, 2vw, 28px)",
      boxShadow: "0 6px 0 #0f172a",
    },
    no: {
      backgroundColor: "#fda4af",
      color: "#0f172a",
      border: "3px solid #0f172a",
      padding: "2% 4%",
      fontSize: "clamp(18px, 2vw, 28px)",
      boxShadow: "0 6px 0 #0f172a",
    },
    continue: {
      backgroundColor: "#4ade80",
      color: "#0f172a",
      border: "3px solid #0f172a",
      padding: "1.5% 3.5%",
      fontSize: "clamp(18px, 2vw, 28px)",
      boxShadow: "0 6px 0 #0f172a",
    },
  };

  const currentStyle = variantStyles[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...currentStyle,
        borderRadius: "999px",
        fontWeight: 700,
        fontFamily: "'Trebuchet MS', 'Verdana', 'Geneva', sans-serif",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        boxShadow: disabled ? 'none' : currentStyle.boxShadow,
      }}
    >
      {children}
    </button>
  );
}
