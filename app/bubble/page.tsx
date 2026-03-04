"use client";

import { NavButton } from "@/app/bubble/components/bubble-buttons";
import TargetCursor from "@/app/bubble/components/TargetCursor";

export default function Page() {
  return (
    <main
      className="page-ocean justify-center text-center"
    >
      <TargetCursor/>

      <h1 className="text-7xl font-black text-white leading-tight drop-shadow-lg">
        WELCOME
      </h1>
      <h2 className="text-5xl font-black text-white leading-tight mb-8 drop-shadow-lg">
        TO THE WORLD OF ATLANTIS
      </h2>

      <div className="flex flex-col gap-4">
        <NavButton href={"/bubble/menu"}>START</NavButton>
        <NavButton href={"/"}>BACK</NavButton>
      </div>
    </main>
  );
}
