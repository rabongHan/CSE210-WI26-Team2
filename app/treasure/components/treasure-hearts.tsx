import { Heart } from "lucide-react"

export function Hearts({ lives }: { lives: number }) {
    return (
        <div className="flex items-center gap-1 primary-box">
            {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                    key={i}
                    className={
                        "transition-all duration-300 " +
                        (i < lives
                            ? "fill-red-500 text-red-500 scale-100"
                            : "fill-none text-gray-400 scale-100")
                    }
                />
            ))}
        </div>
    )
}