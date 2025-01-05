import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Toaster } from 'react-hot-toast';
import { Providers } from "@/components/shared/provider";

export const metadata: Metadata = {
  title: "Todo",
  description: "Todo!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
       <div className="wrapper">

       <Providers>
          <Header />
          
          <main className="main">
            {children}
            <Toaster />
          </main>
          
          <Footer />

        </Providers>

       </div>
      </body>
    </html>
  );
}
