import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HashTag Detector",
  description: "For highlight and extract hashtags in textarea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} my-custom-background h-90vh bg-cover bg-center`}>
        {children}    
      </body>
    </html>
  );
}
