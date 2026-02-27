import { Heart } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import "./treasure-hearts.css"

export function Hearts({ lives }: { lives: number }) {
    const [popIndex, setPopIndex] = useState<number | null>(null)
    const prevLives = useRef(lives)

    useEffect(() => {
        if (lives < prevLives.current) {
            setPopIndex(lives)
            setTimeout(() => setPopIndex(null), 300)
        }
        prevLives.current = lives
    }, [lives])

    return (
        <div className="flex items-center gap-1 primary-box">
            {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                    key={i}
                    className={
                        "transition-all duration-300 " +
                        (i === popIndex ? "heart-pop " : "") +
                        (i < lives
                            ? "fill-red-500 text-red-500 scale-100"
                            : "fill-none text-gray-400 scale-100")
                    }
                />
            ))}
        </div>
    )
}