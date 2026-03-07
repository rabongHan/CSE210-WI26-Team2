import Link from "next/link";
import { Lock } from "lucide-react"; {/* Lock: lock icon */ }
import { GameInfo } from "@/app/lib/types";
import ElectricBorder from "@/app/shared_components/ElectricBorder";

{/* 
export type GameInfo = {
    name: string;
    subtitle: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    unlocked: boolean;
    gradient: string;
    glow: string;
    iconBg: string;
    step: number;
};
*/}

// electric border colors matched to each game's theme
const ELECTRIC_COLORS: Record<string, string> = {
    "Treasure Chest": "#f59e0b",
    "Bubble Atlantis": "#2fd3f4",
    "Prime Dragon":   "#f97316",
};

export function GameCard({ game, electric = false }: { game: GameInfo; electric?: boolean }) {
    const Icon = game.icon;
    const electricColor = ELECTRIC_COLORS[game.name] ?? "#2fd3f4";

    const inner = (
        <div className={[
                "relative w-52 sm:w-56 rounded-2xl border-2 backdrop-blur-sm",
                "p-5 sm:p-6 flex flex-col items-center gap-3",
                "transition-all duration-300",
                game.unlocked /* when game is unlocked */
                    ? `bg-gradient-to-br ${game.gradient} border-white/30 hover:scale-105 hover:border-white/50 active:scale-95`
                    : "bg-black/40 border-white/10 cursor-not-allowed", /* locked */
            ].join(" ")}
            style={game.unlocked
                    ? { boxShadow: `0 8px 32px ${game.glow}` } 
                    : undefined /* no style for locked */
            }
        >
            {/* Step circle badge */}
            <div
                className={[
                    "absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center",
                    "border text-xs font-bold",
                    game.unlocked
                        ? "bg-white/25 border-white/40 text-white backdrop-blur-sm"
                        : "bg-black/50 border-white/10 text-white/30",
                ].join(" ")}
            >
                {game.step} {/* 1 or 2 or 3*/}
            </div>

            {/* Icon circle */}
            <div
                className={[
                    "w-16 h-16 rounded-full flex items-center justify-center",
                    "transition-transform duration-300",
                    game.unlocked
                        ? `${game.iconBg} group-hover:rotate-12 group-hover:scale-110` 
                        /* when hovered rotate right bit and become bigger*/
                        : "bg-white/5",
                ].join(" ")}
            >
                {game.unlocked ? 
                    (<Icon className="w-8 h-8 text-white drop-shadow-lg" /> /* from: const Icon = game.icon; */) 
                    : (<Lock className="w-7 h-7 text-white/25" /> /* When locked, only lock icon*/)}
            </div>

            {/* Label */}
            <h3 className={`text-lg font-bold ${game.unlocked ? "text-white" : "text-white/30"}`}
                style={game.unlocked ? { textShadow: "0 2px 8px rgba(0,0,0,0.3)" } : undefined}>
                {game.name}
            </h3>
            <p className={`text-xs text-center leading-relaxed ${game.unlocked ? "text-white/80" : "text-white/20"}`}>
                {game.subtitle} {/* leading-relaxed: line height 1.625 */}
            </p>
        </div>
    );

    if (game.unlocked) {
        const linked = (
            <Link href={game.href} className="group no-underline">
                {inner}
            </Link>
        );
        if (electric) {
            return (
                <ElectricBorder
                    color={electricColor}
                    speed={1}
                    chaos={0.12}
                    thickness={2}
                    style={{ borderRadius: 16 }}
                >
                    {linked}
                </ElectricBorder>
            );
        }
        return linked;
    }
    {/* OTHERWISE: return the inner div when game is locked; no link */}
    return inner;
}
