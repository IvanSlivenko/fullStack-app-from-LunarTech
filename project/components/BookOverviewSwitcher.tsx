"use client";

import BookOverview from "@/components/BookOverview";
import BookOverviewColumn from "@/components/BookOverview_2";
import { sampleBooks } from "@/constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const BookOverviewSwitcher = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      {isDesktop ? (
        <BookOverview {...sampleBooks[0]} />
      ) : (
        <BookOverviewColumn {...sampleBooks[0]} />
      )}
    </>
  );
};

export default BookOverviewSwitcher;
