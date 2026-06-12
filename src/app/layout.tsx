import type { Metadata } from "next";
import { Fredoka, Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import FloatingCart from "@/components/FloatingCart";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Crokangol Golosinas",
  description:
    "La dulzura que acompaña tus mejores momentos. Descubrí cientos de golosinas, promociones y productos para compartir.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${fredoka.variable} ${poppins.variable}`}>
      <body className="font-body antialiased">
         <CartProvider>
          <Navbar />
          {children}
          <FloatingCart />
          <FloatingWhatsApp />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
