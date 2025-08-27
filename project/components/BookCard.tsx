"use client";

import React, { FC, useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import BookCover_2 from "./BookCover_1";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface BookCoverImageProps {
  cover?: string;
  alt: string;
}

const BookCoverImage: FC<BookCoverImageProps> = ({ cover, alt }) => {
  const [src, setSrc] = useState(cover || "/images/kanyon_2.jpg");
  return (
    <div className="book-cover-books">
      <NextImage
        src={src}
        alt={alt}
        // width={170}
        // height={240}
        width={220}
        height={240}
        className="book-cover object-cover rounded"
        onError={() => setSrc("/images/kanyon_2.jpg")} // fallback при некоректному URL
        unoptimized // якщо зовнішні картинки, можна залишити
      />
    </div>
  );
};

export const BookCard = ({
  id,
  cover,
  title,
  genre,
  color,
  isLoanedBook = false,
}: Book) => {

  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  return (
    <div className="flex flex-col items-center gap-2">
      <li className={cn(isLoanedBook && "xs:w-52 w-full")}>
        <Link href={`/books/${id}`}>
          <BookCover_2
            coverColor={color}
            coverImage={cover}
            className={cn(isLoanedBook && "w-full flex flex-col items-center")}
          ></BookCover_2>
          <div
            className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}
            // style={{
            //   background: "green",
            // }}
          >
            <p className="book-cover-title">{title}</p>
            <p className="font-ibmPlexItalic  book-cover-title">{genre}</p>
          </div>
          {isLoanedBook && (
            <div className="mt-3 min-w-full">
              <div
                className="book-loaned"
                // style={{
                //   background:"blue"
                // }}
              >
                <NextImage
                  src="calendar.svg"
                  alt="calendar"
                  width={18}
                  height={18}
                  className="object-contain"
                />
                <p className="font-ibmPlexItalic text-calendar">
                  11 days left to return
                </p>
              </div>

              <div
                className="flex flex-1 justify-center"
                style={{
                  marginTop: "10px",
                  width: "270px",
                }}
              >
                <Button
                  variant="custome_4"
                  className={isDesktop ? "book-btn-desktop font-ibmPlexItalic" : "book-btn-mobail font-ibmPlexItalic"}
                >
                  Download recipient
                </Button>
              </div>
            </div>
          )}
        </Link>
        {/* <BookCoverImage cover={cover} alt={title} /> */}
      </li>
    </div>
  );
};
