import type { Metadata } from "next";
import { Poppins, Nunito,Montserrat } from "next/font/google"
import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-poppins"
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-montserrat"
})

export const metadata: Metadata = {
  title: "Storage App",
  description: "Store your files.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} font-montserrat antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
