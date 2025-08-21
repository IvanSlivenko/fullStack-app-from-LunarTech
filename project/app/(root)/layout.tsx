import localFont from "next/font/local";
import React, { ReactNode } from "react";
import Header from "@/components/Header";

export const bebasNeue = localFont({
  src: "../fonts/BebasNeue-Regular.ttf", // шлях від файлу layout.tsx
  variable: "--font-bebas", // змінна для Tailwind
  weight: "400",
  style: "normal",
});

export const ibmPlexItalic = localFont({
  src: "../fonts/IBMPlexSans-Italic-VariableFont_wdth,wght.ttf", // шлях від файлу layout.tsx
  variable: "--font-ibmPlexItalic", // змінна для Tailwind
  weight: "400",
  style: "normal",
});

export const ibmPlexVarible = localFont({
  src: "../fonts/IBMPlexSans-VariableFont_wdth,wght.ttf", // шлях від файлу layout.tsx
  variable: "--font-ibmPlexVariable", // змінна для Tailwind
  weight: "400",
  style: "normal",
});

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main
      className={`${bebasNeue.variable} ${ibmPlexItalic.variable} ${ibmPlexVarible.variable} font-bebas root-container`}
    >
      <div className="max-w-7xl mx-auto">
        <span className="text-stone-50">
          <Header />
        </span>
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
