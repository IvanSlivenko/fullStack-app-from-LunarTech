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

const BookCover_1 = ({
  variant = "regular",
  coverColor = "#012B48",
  coverImage = "../public/images/kanyon.jpg",
}: Props) => {
  return (
    // <div className="relative transition-all duration-300 z-0">
    <div className="relative transition-all duration-300"
    >
      {/* w-200 h-280 */}
      <Book3D cover={coverImage} color={coverColor} width="200" height="300"  widthImg="200" heightImg="300" widthSvg="" heightSvg="370" />
    </div>
  );
};

export default BookCover_1;
