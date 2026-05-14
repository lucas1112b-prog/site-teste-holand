import type { Metadata } from "next";
import { Zalando_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const zalandoSans = Zalando_Sans({ 
  subsets: ["latin"],
  weight: ["200", "400", "600", "700", "800"],
  variable: "--font-zalando"
});

export const metadata: Metadata = {
  title: "Holand & Co",
  description: "Premium Digital Experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${zalandoSans.variable} font-sans`}>
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
