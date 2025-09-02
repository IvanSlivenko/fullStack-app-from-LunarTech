import React from "react";
import { Button } from "@/components/ui/button";
import BookCover_1 from "@/components/BookCover_1";

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
    <section
      className="text-white font-ibmPlexItalic"
    >

      <div className="flex flex-1 flex-row gap-5">
        {/* --------------------------------------------------------- */}
        <div
          className="flex flex-col gap-5"
          style={{
            height: "300px",
            width: "auto",
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
           md:w-[120px] w-full"
          >
            <img src="book-logo_2.svg" alt="book" width={20} height={20} />
            <p>Borrow Book</p>
          </Button>
        </div>
        {/* --------------------------------------------------------------------------- */}

        {/* --------------------------------------------------------------------------- */}
        <div
          className="relative"
          style={{
            width: "500px",
            height: "300px",
            marginLeft: "150px",
            // background: "white",
          }}
        >
          <div
            className=" absolute left-40 top-0 rotate-12 opacity-40  max-sm:hidden"
            style={{
              width: "400px",
              height: "300px",
              marginLeft: "15px",
              marginTop: "30px",
              // background: "red",
            }}
          >
            <BookCover_1
              variant="regular"
              className="z-10"
              coverColor={color}
              coverImage={cover}
            />
          </div>

          <div
            style={{
              width: "400px",
              height: "300px",
              // background: "green",
            }}
          >
            <BookCover_1
              variant="regular"
              className="z-10"
              coverColor={color}
              coverImage={cover}
            />
          </div>
        </div>
        {/* ------------------------------------------------------------------------------- */}
      </div>
    </section>
  );
};

export default BookOverview;
