"use client";

import { BubbleGameProvider } from "@/app/bubble/lib/bubble-context";

export default function BubbleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BubbleGameProvider>{children}</BubbleGameProvider>;
}
