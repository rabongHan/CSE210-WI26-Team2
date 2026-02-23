type BubbleCircleProps = {
  number: number;
  onClick?: () => void;
};

export function BubbleCircle({ number, onClick }: BubbleCircleProps) {
  return (
    <button
      className="cursor-target w-[100px] h-[100px] rounded-full bg-[#5BC0EB] border-none
        cursor-pointer flex items-center justify-center text-3xl font-bold
        text-white font-inherit transition-transform duration-150 ease-in-out
        hover:scale-110"
      onClick={onClick}
    >
      {number}
    </button>
  );
}
