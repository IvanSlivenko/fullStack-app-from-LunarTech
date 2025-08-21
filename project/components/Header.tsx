"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className=" my-10 flex justify-between gap-5 ">
      <Link href="/" className="flex items-center ">
        <img
          src="/book-logo_1.svg"
          alt="book-logo_1"
          width={20}
          className="rounded-2xl mr-2"
        />
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/library"
            className={cn(
              "cursor-pointer capitalize",
              pathname === "/library" ? "text-yellow-500" : "text-white",
            )}
          >
            Library
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
