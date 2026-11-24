import { Geist, Geist_Mono, Poppins } from "next/font/google";
import { createElement } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata = {
  title: "Artículo 140 | Inicio de sesión",
  description: "Inicio de sesión | Acceso para estudiantes y empleados",
};

export default function RootLayout({ children }) {
  return createElement(
    "html",
    { lang: "es", className: `${geistSans.variable} ${geistMono.variable} ${poppins.variable}` },
    createElement("body", {}, children)
  );
}
