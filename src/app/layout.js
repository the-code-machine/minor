import { Inter } from "next/font/google";
import "./globals.css";
import {  ProviderEx } from "@/redux/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DRS",
  description: "Automatic Detection Remote System",
};

export default function RootLayout({ children }) {
  return (
    <ProviderEx>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </ProviderEx>
  );
}
