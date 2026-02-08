import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prime Factory",
  description: "CSE 210 Project Group 2",
};
export default function RootLayout({children,}: Readonly<{
  children: React.ReactNode
}>)
{
  return (
    <html>
      <body>
          {children}
      </body>
    </html>
  )
}