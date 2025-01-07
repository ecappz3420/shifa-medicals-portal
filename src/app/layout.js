"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@ant-design/v5-patch-for-react-19";

const inter = Inter({
  subsets: ["latin"],
  weights: [400, 500, 600, 700],
  styles: ["normal"],
});

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
