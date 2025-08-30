import "../css/globals.css";
import localFont from "next/font/local";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

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
        <Toaster/>
      </body>
    </html>
  );
}
