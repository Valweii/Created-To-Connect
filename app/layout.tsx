import type { Metadata } from "next";
import { Barlow_Condensed, Bebas_Neue, Inter } from 'next/font/google';
import "./globals.css";

// Optimized font loading with automatic self-hosting and preloading
const barlowCondensed = Barlow_Condensed({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-barlow-condensed',
});

const bebasNeue = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas-neue',
});

const inter = Inter({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

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
    <html lang="en" className={`${barlowCondensed.variable} ${bebasNeue.variable} ${inter.variable}`}>
      <body className={`antialiased ${barlowCondensed.className}`}>
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


