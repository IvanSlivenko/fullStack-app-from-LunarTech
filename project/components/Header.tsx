"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Session } from "next-auth";


const Header = ({session } : {session : Session}) => {
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
        <li>
          <Link href="/my-profile">
          <Avatar>
            <AvatarFallback
            className="bg-amber-100 text-yellow-800  flex justify-center"
            >
              {getInitials(session?.user?.name || "IN")}</AvatarFallback>
          </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
