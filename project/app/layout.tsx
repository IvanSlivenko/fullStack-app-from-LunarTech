import "../css/globals.css";
import localFont from "next/font/local";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "BookWise",
  description:
    "BookWise is a book borrowing university library management solution",
};
//
export default async function RootLayout ({ children }: { children: ReactNode }) {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className="antialiased">
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
