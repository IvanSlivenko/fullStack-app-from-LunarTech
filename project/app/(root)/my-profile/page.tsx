import { signOut } from "@/auth";
import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import React from "react";

const Page = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
        className="mb-10"
      >
        <Button
        className="bg-gradient-to-r from-yellow-400 to-white 
          font-semibold 
          font-ibmPlexItalic
          px-4 
          py-2 
          rounded-lg 
          flex 
          items-center 
          gap-2 
          hover:opacity-90 
          transition
           text-yellow-700 
           md:w-[120px] w-full"
        >Logout</Button>
      </form>
      <BookList title="Borrowed Books" books={sampleBooks} />
    </>
  );
};

export default Page;
