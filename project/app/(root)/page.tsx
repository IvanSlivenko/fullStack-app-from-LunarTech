import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";
import BookOverviewColumn from "@/components/BookOverview_2";
import BookOverviewSwitcher from "@/components/BookOverviewSwitcher";

const Home = () => {
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
      containerClassName="mt-28"
    />
  </>
)};

export default Home;
