import Link from "next/link";
import { Anchor } from "lucide-react";

export function HomeButton() {
    return (
        <Link
            href="/" // to Home Page
            className="fixed top-4 left-4 z-50 group flex items-center rounded-lg
                bg-white/20 backdrop-blur p-2.5 shadow-lg border border-white/30
                transition-all duration-300 hover:bg-white/35 hover:shadow-xl hover:scale-105 hover:pr-4 hover:gap-2 active:scale-95"
        > // fixed position at top left corner (16px from top, left edges)
          // z-50; ensures it appears above other content
          // group; for hover animation (anchors rotates on hover)
            <Anchor
                className="w-5 h-5 transition-transform duration-300 group-hover:rotate-[-20deg]"
            />
            <span className="text-sm font-bold opacity-0 max-w-0 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:max-w-[60px]">
                Home
            </span> // initially hidden (opacity 0), becomes visible on hover (opacity 100)
                    // and expands from 0 to 60px width (max-w-0 to max-w-60)
        </Link>
    );
}
