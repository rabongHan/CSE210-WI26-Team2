import "./globals.css";

export const metadata = {
  title: "Prime Factory",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="m-0 p-0" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
