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
      <body className="antialiased">
        {/* Mobile-only view */}
        <div className="block md:hidden">
          {children}
        </div>
        
        {/* Desktop/Tablet message */}
        <div className="hidden md:flex items-center justify-center min-h-screen bg-white">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Please register on your mobile phone
            </h1>
            <p className="text-gray-600">
              This registration form is optimized for mobile devices.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}


