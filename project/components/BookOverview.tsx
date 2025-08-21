import React from "react";
import { Button } from "@/components/ui/button";
import BookCover from "@/components/BookCover";

const BookOverview = ({
  title,
  author,
  genre,
  rating,
  total_copies,
  available_copies,
  description,
  color,
  cover,
  video,
  summary,
}: Book) => {
  return (
    <section className="text-white font-ibmPlexItalic">
      <div className="flex flex-1 flex-col gap-5">
        <h1 className="text-4xl font-bebas">{title} </h1>
        <div className="flex gap-5">
          <p>
            By <span className=" text-yellow-100">{author}</span>
          </p>

          <p>
            Category: <span className=" text-yellow-100">{genre}</span>
          </p>
        </div>
        <div className="flex flex-row gap-1">
          <img src="star.svg" alt={title} width={22} height={22} />
          <p>{rating}</p>
        </div>
        <div className="flex gap-5">
          <p>
            Total Books:
            <span className="text-yellow-300 ml-2">{total_copies}</span>
          </p>

          <p>
            Available Books:
            <span className="text-green-400 ml-2">{available_copies}</span>
          </p>
        </div>
        <p className="">{description}</p>
        <Button variant="custome_4">
          <img src="book-logo_2.svg" alt="book" width={20} height={20} />
          <p>Borrow Book</p>
        </Button>
      </div>
      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={color}
            coverImage={cover}
          />
        </div>
        <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
          <BookCover variant="wide" coverColor={color} coverImage={cover} />
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
