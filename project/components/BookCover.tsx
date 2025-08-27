import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type BookCoverVariant = "extraSmail" | "smail" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmail: "book_cover_extra_smail",
  smail: "book_cover_smail",
  medium: "book_cover_medium",
  regular: "book_cover_regular",
  wide: "book_cover_wide",
};

interface Props {
  className?: string;
  variant?: BookCoverVariant;
  coverColor: string;
  coverImage: string;
}

const BookCover = ({
  className,
  variant = "regular",
  coverColor = "#012B48",
  coverImage = "https://picsum.photos/200/300",
}: Props) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300 h-auto",
        variantStyles[variant],
        className,
      )}
    >
      BOOK SIDE SVG
      <div
        className="absolute z-10 "
        style={{
          left: "12%",
          width: "87.5%",
          height: "88%",
        }}
      >
        <Image
          src={coverImage}
          alt="Book cover"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default BookCover;
