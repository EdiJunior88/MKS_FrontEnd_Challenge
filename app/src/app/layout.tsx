import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Favicon from "/public/favicon.ico";
import "@/app/css/reset.css";
import StyledComponentsRegistry from "@/app/registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MKS Sistemas",
  description: "Gerado e criado por next app",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
