import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";
import BookOverviewColumn from "@/components/BookOverview_2";
import BookOverviewSwitcher from "@/components/BookOverviewSwitcher";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

const Home = async () => {

 
  const result = await db.select().from(users);
  console.log(JSON.stringify(result, null, 2));
  return (
    <>
      {/* ----------------------------------------------------------- var 1 */}

      {/* <BookOverview {...sampleBooks[0]} />
    <BookOverviewColumn {...sampleBooks[0]} /> */}

      {/* ----------------------------------------------------------- */}

      {/* ------------------------------------------------------------------------ var 2 */}
      <BookOverviewSwitcher />
      {/* ------------------------------------------------------------------------ */}
      <BookList
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-28 "
      />
    </>
  );
};

export default Home;
