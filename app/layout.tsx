import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Honeymoon Intelligence",
  description: "Find your perfect honeymoon destination",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
