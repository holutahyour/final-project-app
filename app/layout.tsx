import { Providers } from "@/components/ui/chakra-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";

import { Toaster } from "@/components/ui/chakra-toaster";
import Loading from "./loading";
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Educ8e Connector",
  description: "Educ8e Connector Frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
      </head>
      <body
        className={
          `h-dvh bg-white ${inter.className} antialiased`
        }
      >
        <Providers>
          <Suspense fallback={<Loading />}>
            <Toaster />
            {children}
          </Suspense>
        </Providers>

      </body>
    </html>
  );
}
