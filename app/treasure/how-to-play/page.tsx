"use client"

import { Heart, Star, Target } from "lucide-react"
import { PrimaryButton, SecondaryButton } from "@/components/game/game-buttons"
import { GameNav } from "@/components/game/game-nav"
import { useGame } from "@/lib/game-context"
import { useEffect } from "react"

export default function TreasureHowToPlayPage() {
  const { resetTreasure } = useGame()

  // Reset treasure state when starting fresh
  useEffect(() => {
    resetTreasure()
  }, [resetTreasure])

  return (
    <main className="min-h-screen bg-background">
      <GameNav />
      
      <div className="mx-auto max-w-2xl px-4 pb-16">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/20">
            <Target className="h-12 w-12 text-accent" />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold text-foreground">Treasure Chest</h1>
          <p className="mt-2 text-lg text-muted-foreground">Divisibility Rules Tutorial</p>
        </div>

        <div className="mt-10 space-y-6">
          {/* How to play */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xl font-bold text-foreground">How to Play</h2>
            <ul className="mt-4 space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  1
                </span>
                <span>You&apos;ll see a number and a list of divisibility rules (2-9)</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  2
                </span>
                <span>Select ALL the rules that apply to that number</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  3
                </span>
                <span>Submit your answer to see if you&apos;re correct!</span>
              </li>
            </ul>
          </div>

          {/* Scoring */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xl font-bold text-foreground">Scoring</h2>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-success/20 px-3 py-1">
                  <Star className="h-5 w-5 text-success" />
                </div>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Fully Correct:</strong> +100 points
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-warning/20 px-3 py-1">
                  <Star className="h-5 w-5 text-warning" />
                </div>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Partially Correct:</strong> +50 points, -1 life
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-destructive/20 px-3 py-1">
                  <Star className="h-5 w-5 text-destructive" />
                </div>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Wrong:</strong> 0 points, -1 life
                </span>
              </div>
            </div>
          </div>

          {/* Lives */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xl font-bold text-foreground">Lives</h2>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex gap-1">
                <Heart className="h-6 w-6 fill-destructive text-destructive" />
                <Heart className="h-6 w-6 fill-destructive text-destructive" />
                <Heart className="h-6 w-6 fill-destructive text-destructive" />
              </div>
              <span className="text-muted-foreground">You have 3 lives. Lose them all and it&apos;s game over!</span>
            </div>
          </div>

          {/* Goal */}
          <div className="rounded-2xl border-2 border-accent bg-accent/10 p-6">
            <h2 className="text-xl font-bold text-foreground">Goal</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Score <strong className="text-accent">350 points</strong> to open the treasure chest and unlock the next game!
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <PrimaryButton href="/treasure/guidelines">
            Start Game
          </PrimaryButton>
          <SecondaryButton href="/select">
            Back to Games
          </SecondaryButton>
        </div>
      </div>
    </main>
  )
}