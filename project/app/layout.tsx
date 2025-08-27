import "../css/globals.css";
import localFont from "next/font/local";
import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookWise",
  description:
    "BookWise is a book borrowing university library management solution",
};
//
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
      className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
