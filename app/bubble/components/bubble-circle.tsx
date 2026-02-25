type BubbleCircleProps = {
  number: number;
  onClick?: () => void;
};

// A single blue bubble with a number inside
export function BubbleCircle({ number, onClick }: BubbleCircleProps) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 100,
        height: 100,
        borderRadius: "50%",
        backgroundColor: "#5BC0EB",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.8rem",
        fontWeight: 700,
        color: "white",
        fontFamily: "inherit",
        transition: "transform 0.15s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {number}
    </button>
  );
}
