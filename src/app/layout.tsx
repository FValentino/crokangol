import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crokangol",
  description: "Tienda mayorista para distribuidora de dulces crokangol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
    >
      <body >{children}</body>
    </html>
  );
}
