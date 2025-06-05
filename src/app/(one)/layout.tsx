import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "SCloud",
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
            {children}
       </div>
      </body>
    </html>
  );
}
