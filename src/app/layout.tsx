import type { Metadata } from "next";
import { Zalando_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollArrow from "@/components/ScrollArrow";
import ClientLayout from "@/components/ClientLayout";

const zalandoSans = Zalando_Sans({ 
  subsets: ["latin"],
  weight: ["200", "400", "600", "700", "800"],
  variable: "--font-zalando"
});

export const metadata: Metadata = {
  title: "Morgan & Co",
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
        <ClientLayout>
          <CustomCursor />
          <ScrollArrow />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ClientLayout>
      </body>
    </html>
  );
}
