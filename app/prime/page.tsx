"use client";

import { Target } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [now, setNow] = useState("");

  useEffect(() => setNow(new Date().toISOString()), []);

  return (
    <main style={{ fontFamily: "system-ui", padding: 24 }}>
      <div className="welcome">Welcome to the prime testing minigame!</div>
    </main>
  );
}
