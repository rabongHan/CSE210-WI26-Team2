{/* Cog: gear / ChevronRight: > right arrow / ChevronDown: v down arrow */}
import { Cog, ChevronRight, ChevronDown } from "lucide-react";

export function Connector() {
  return (
    <div className="flex items-center gap-1 text-white/35">
      <Cog className="hidden md:block w-4 h-4 animate-spin"
        style={{ animationDuration: "5s" }} />
      {/* right arrow: only visible on desktop screens */}
      <ChevronRight className="hidden md:block w-6 h-6" />
      {/* down arrow: only visible on mobile (Default) */}
      <ChevronDown className="block md:hidden w-6 h-6" />
      <Cog className="hidden md:block w-4 h-4 animate-spin"
        style={{ animationDuration: "5s", animationDirection: "reverse" }} />
    </div>
  );
}
