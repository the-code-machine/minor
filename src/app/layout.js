import { Inter } from "next/font/google";
import "./globals.css";
import { ProviderEx } from "@/redux/Provider";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Submify",
  description: "Automatic Detection Remote System",
};

export default function RootLayout({ children }) {
  return (
    <ProviderEx>

      <html lang="en">
        <body className={inter.className}>
       
          <Toaster
            position="top-center"
            reverseOrder={false} />
          {children}</body>
      </html>
    </ProviderEx>
  );
}
