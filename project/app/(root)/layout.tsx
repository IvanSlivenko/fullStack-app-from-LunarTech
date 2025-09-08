import localFont from "next/font/local";
import React, { ReactNode } from "react";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { after } from "next/server";
import { users } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";

export const bebasNeue = localFont({
  src: "../fonts/BebasNeue-Regular.ttf", // шлях від файлу layout.tsx
  variable: "--font-bebas", // змінна для Tailwind
  weight: "400",
  style: "normal",
  display: "swap",
});

export const ibmPlexItalic = localFont({
  src: "../fonts/IBMPlexSans-Italic-VariableFont_wdth,wght.ttf", // шлях від файлу layout.tsx
  variable: "--font-ibmPlexItalic", // змінна для Tailwind
  weight: "400",
  style: "normal",
  display: "swap",
});

export const ibmPlexVarible = localFont({
  src: "../fonts/IBMPlexSans-VariableFont_wdth,wght.ttf", // шлях від файлу layout.tsx
  variable: "--font-ibmPlexVariable", // змінна для Tailwind
  weight: "400",
  style: "normal",
  display: "swap",
});

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  // after(async() => {
  //   if(!session?.user.id)return
  //   await db.update(users)
  //   .set({lastActivityDate: new Date()
  //   .toISOString()
  //   .slice(0,10)})
  //   .where(eq(users.id, session?.user?.id))
  // })

  if(session?.user.id) {
    await db
      .update(users)
      .set({lastActivityDate: new Date().toISOString().slice(0, 10)})
      .where(eq(users.id, session.user.id));
  }

  return (
    <main
      className={`${bebasNeue.variable} ${ibmPlexItalic.variable} ${ibmPlexVarible.variable} font-bebas root-container`}
    >
      <div className="max-w-7xl mx-auto">
        <span className="text-stone-50">
          <Header session={session} />
        </span>
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
