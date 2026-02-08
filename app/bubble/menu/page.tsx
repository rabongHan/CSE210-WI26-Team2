"use client";

import { Target } from "lucide-react";
import { useEffect, useState } from "react";
import { NavButton} from "@/app/bubble/components/bubble-buttons";

export default function Page() {
  const [now, setNow] = useState("");

  useEffect(() => setNow(new Date().toISOString()), []);

  return (
    <main style={{ fontFamily: "system-ui", padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Target />
        <h1 style={{ margin: 0 }}>Bubble Menu</h1>
          <NavButton href={'/bubble/game'}>
              Start
          </NavButton>

          <NavButton href={'/'}>
              Back
          </NavButton>

      </div>
      <p>Time: {now}</p>
    </main>
  );
}
