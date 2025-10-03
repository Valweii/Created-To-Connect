import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Created 2 Connect - Youth Camp 2025",
  description: "Friendship & Community - Join us for an unforgettable youth camp experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}


