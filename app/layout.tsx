import "./globals.css";

export const metadata = {
  title: "World of Atlantis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="m-0 p-0">{children}</body>
    </html>
  );
}
  
