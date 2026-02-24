import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gian Piero Cano | Ingeniero de Sistemas & Arquitecto IA",
  description: "Diseñando el futuro con Inteligencia Artificial, Cloud Computing y Automatización.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Navbar />
        <div className="pt-16">
          {children}
        </div>
        <Footer />
        <Toaster
          position="bottom-center"
          richColors
          closeButton
          toastOptions={{
            style: {
              marginBottom: "2rem",
              background: "rgb(15 23 42)",
              border: "1px solid rgb(51 65 85)",
              color: "#f8fafc",
            },
            className: "sonner-toast-visible",
          }}
        />
      </body>
    </html>
  );
}
