import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Character Search",
  description: "Server-rendered Rick and Morty character search",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
