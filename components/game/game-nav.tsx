import Link from "next/link";

export function GameNav() {
  return (
    <header className="border-b border-border bg-card/70 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-bold text-foreground">
          CSE210 Game
        </Link>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/select" className="hover:text-foreground">
            Games
          </Link>
          <Link href="/treasure/how-to-play" className="hover:text-foreground">
            How to Play
          </Link>
        </nav>
      </div>
    </header>
  );
}
