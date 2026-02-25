import React from "react";

type TreasureHeaderProps = {
  subtitle?: string;
};

export function TreasureHeader({ subtitle }: TreasureHeaderProps) {
  return (
    <div className="text-center py-5">
      <h1 className="text-5xl font-extrabold">
        <a href="/treasure" className="hover:text-black/80">Treasure Game</a>
      </h1>
      {subtitle && <p className="text-black-600">{subtitle}</p>}
    </div>
  );
}