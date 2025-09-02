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
      {/* <li className={cn(isLoanedBook && "xs:w-52 w-full")} */}
      <li>
        <Link href={`/books/${id}`}>
          <BookCover_2
            coverColor={color}
            coverImage={cover}
            className={cn(isLoanedBook && "w-full flex flex-col items-center")}
          ></BookCover_2>
          <div className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
            <p className="text-white">{title}</p>
            <p className="font-ibmPlexItalic text-white">{genre}</p>
          </div>
          {isLoanedBook && (
            <div className="mt-3 min-w-full">
              <div className="book-loaned">
                <NextImage
                  src="calendar.svg"
                  alt="calendar"
                  width={18}
                  height={18}
                  className="object-contain"
                />
                <p className="font-ibmPlexItalic text-yellow-600">
                  11 days left to return
                </p>
              </div>

              <div className="flex flex-1 justify-center">
                <Button
                  variant="default"
                  className="bg-orange-200 text-yellow-800 md:w-[120px] w-full"
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
