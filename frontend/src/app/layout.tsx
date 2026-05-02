import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GlobalLayout from "@/components/GlobalLayout";
import { CartProvider } from "@/hooks/useCart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IMPERIALS | Luxury Fashion",
  description: "High-end editorial e-commerce experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-obsidian text-white antialiased min-h-full flex flex-col`}>
        <CartProvider>
          <GlobalLayout>
            {children}
          </GlobalLayout>
        </CartProvider>
      </body>
    </html>
  );
}

