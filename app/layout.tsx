import "./globals.css";
import { GameProvider } from "@/lib/game-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
