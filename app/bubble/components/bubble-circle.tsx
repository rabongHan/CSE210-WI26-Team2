type BubbleCircleProps = {
  number: number;
  color?: string;
  onClick?: () => void;
};

export function BubbleCircle({ number, color = "#5BC0EB", onClick }: BubbleCircleProps) {
  return (
    <button
      className="cursor-target w-[100px] h-[100px] rounded-full border-none
        cursor-pointer flex items-center justify-center text-3xl font-bold
        text-white font-inherit transition-transform duration-150 ease-in-out
        hover:scale-110"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {number}
    </button>
  );
}
