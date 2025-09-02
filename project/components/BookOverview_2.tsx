import React from "react";
import { Button } from "@/components/ui/button";
import BookCover from "@/components/BookCover";
import BookCover_1 from "@/components/BookCover_1";
import BookCover_3 from "./BookCover_3";
import BookCover_2 from "@/components/BookCover_2";

const BookOverviewColumn = ({
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
    <section
      className="text-white font-ibmPlexItalic"
      // style={{
      //   border: "1px solid black",
      // }}
    >
      {/* ========================================================================================== */}
      {/* <span> BookOverwiew_2</span> */}

      <div className="flex flex-1 flex-col gap-5 ms:flex-col">
        {/* ------------------------------------------------------------------------ */}
        <div
          className="relative flex flex-1 justify-center"
          style={{
            width: "300px",
            height: "200px",
          }}
        >
          <div
            className=" absolute left-40 top-0 opacity-40 rotate-12 max-sm:hidden"
            style={{
              marginTop: "20px",
            }}
          >
            {/* <BookCover_3 variant="wide" coverColor={color} coverImage={cover}/> */}
            <BookCover_2
              variant="wide"
              className="z-10"
              coverColor={color}
              coverImage={cover}
            />
          </div>

          <div>
            <BookCover_2
              variant="wide"
              className="z-10"
              coverColor={color}
              coverImage={cover}
            />
          </div>
        </div>
        {/* ------------------------------------------------------------------ */}

        {/* ----------------------------------------------------------------- */}
        <div
          className="flex flex-col gap-5"
          style={{
            height: "auto",
            width: "300px",
          }}
        >
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

          <Button 
          // variant="custome_4" 
          className="bg-gradient-to-r from-yellow-400 to-white 
          font-semibold 
          px-4 
          py-2 
          rounded-lg 
          flex 
          items-center 
          gap-2 
          hover:opacity-90 
          transition
           text-yellow-700 
           md:w-[120px] w-full">
            <img src="book-logo_2.svg" alt="book" width={20} height={20} />
            <p>Borrow Book</p>
          </Button>
        </div>
        {/* ------------------------------------------------------- */}
      </div>
    </section>
  );
};

export default BookOverviewColumn;
