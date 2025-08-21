import "../css/globals.css";
import localFont from "next/font/local";
import { ReactNode } from "react";
import type { Metadata } from "next";
//
// const ibmPlexSans = localFont({
//   src: [
//     {
//       path: "./fonts/IBMPlexSans-VariableFont_wdth,wght.ttf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "./fonts/IBMPlexSans-Italic-VariableFont_wdth,wght.ttf",
//       weight: "400",
//       style: "italic",
//     },
//   ],
//   variable: "--font-ibm-plex-sans",
// });
//
// const bebasNeue = localFont({
//   src: [
//     { path: "./fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
//   ],
//   variable: "--font-bebas-neue",
// });
//
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
      // className={`${ibmPlexSans.variable} ${bebasNeue.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
