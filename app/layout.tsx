import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ada Pesan Spesial Buat Kamu ❤️ | Dari Hanan",
  description: "Buka pesannya ya, ada sesuatu yang penting banget...",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💖</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen antialiased font-sans">{children}</body>
    </html>
  );
}
