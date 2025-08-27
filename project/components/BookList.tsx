"use client";

import React, { FC } from "react";
import { sampleBooks } from "@/constants";
import { BookCard } from "./BookCard";




interface BookListProps {
  title: string;
  books: Book[];
  containerClassName?: string;
}

const BookList: FC<BookListProps> = ({
  title = "Latest Books",
  books = sampleBooks,
  containerClassName = "",
}) => {
  return (
    <section className={containerClassName}>
      <h2 className="text-white font-bebas text-4xl">{title}</h2>
      <ul className="book-list">
        {books.map((book) => (
          
           <BookCard 
           key={book.id}  
           cover={book.cover} 
           title={book.title} 
           genre={book.genre} 
           color={book.color}
           isLoanedBook={book.isLoanedBook}
          
           />
          
        ))}
      </ul>
    </section>
  );
};

export default BookList;
