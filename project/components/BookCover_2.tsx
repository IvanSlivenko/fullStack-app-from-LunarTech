import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Book3D from "./BookCoverSvg";
import Book3D_2 from "./BookCoverSvg_2";

type BookCoverVariant = "extraSmail" | "smail" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmail: "book_cover_extra_smail",
  smail: "book_cover_smail",
  medium: "book_cover_medium",
  regular: "book_cover_regular",
  wide: "book_cover_wide",
};

interface Props {
  variant?: BookCoverVariant;
  coverColor: string;
  coverImage: string;
  className?: string;
}

const BookCover_2 = ({
  variant = "regular",
  coverColor = "#012B48",
  coverImage = "/images/kanyon.jpg",
}: Props) => {
  return (
    <div className="relative transition-all duration-300"
    >
      <Book3D_2 cover={coverImage} color={coverColor} width="170" height="240" widthImg="170" heightImg="240" />
    </div>
  );
};

export default BookCover_2;
