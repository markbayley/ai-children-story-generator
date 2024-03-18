import { PreviewContent } from "./PreviewContent";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
export const StorySelector = ({
  myBooks,
  allBooks,
  extractTitleFromStory,
  handlePreviewAll,
  userId,
  currentSliceIndex,
  setCurrentSliceIndex,
  selectedBook,
  user,
  loading,
  tabSelected,
  setTabSelected,
  searchResults,
  setSearch,
  searchQuery,
  setMessage,
  handleSearch,
  setSearchQuery,
  search, 
  showCreators
}) => {
  const booksPerPage = 6;

  const totalPages = Math.ceil(allBooks?.length / booksPerPage);
  const myPages = Math.ceil(myBooks?.length / booksPerPage);
  // console.log("myPages", myPages);

  const PaginationBars = ({
    totalPages,
    myPages,
    tabSelected,
    currentSliceIndex,
    booksPerPage,
  }) => {
    const currentPage = Math.ceil(currentSliceIndex / booksPerPage);

    return (
      <div className="md:flex md:justify-center">
        <div className="flex items-center justify-center space-x-2 3xl:space-x-3">
          {Array.from({
            length: tabSelected == "My Stories" ? myPages : totalPages,
          }).map((_, index) => (
            <div
              key={index}
              className={`h-1 w-4 2.5xl:w-6 3xl:w-8 mt-3 2.5xl:mt-4 3xl:mt-6 mb-1 rounded-sm ${
                currentPage === index ? "bg-amber-500" : "bg-stone-600"
              }`}
            ></div>
          ))}
        </div>
      </div>
    );
  };

  const handleSlider = (direction) => () => {
    setCurrentSliceIndex((prevIndex) => {
      let newIndex = prevIndex;
      if (direction === "right") {
        // Move to the next set of books if not at the end
        newIndex = Math.min(
          prevIndex + booksPerPage,
          allBooks?.length - booksPerPage
        );
      } else if (direction === "left") {
        // Move to the previous set of books if not at the start
        newIndex = Math.max(prevIndex - booksPerPage, 0);
      }
      return newIndex;
    });
  };

  // Function to sort books based on the selected tab
  const getSortedBooks = () => {
    switch (tabSelected) {
      //case "Users"
       // return ...
      case "Search":
        // setLength(() => searchResults.length)
        return searchResults;
      case "Recent":
        return [...allBooks].sort((a, b) => b.createdAt - a.createdAt);
      case "Popular":
        return [...allBooks].sort((a, b) => {
          // Calculate the sum of likes, shares, and views for each book
          const sumA = (a.likes || 0) + (a.shares || 0) + (a.views || 0);
          const sumB = (b.likes || 0) + (b.shares || 0) + (b.views || 0);

          // Sort in descending order based on the sum
          return sumB - sumA;
        });

      case "My Stories":
        return [...allBooks]
          .filter((book) => book?.userId == userId)
          .sort((a, b) => b.createdAt - a.createdAt);
      default:
        return allBooks;
    }
  };

  // const [newLength, setNewLength] = useState("full");
  // const [newCol, setNewCol] = useState("6");

  // useEffect(() => {
  //   if (getSortedBooks().length >= 6) {
  //     setNewLength("full");
  //     setNewCol("6");
  //   } else if (getSortedBooks().length < 6) {
  //     const len = getSortedBooks().length.toString();
  //     setNewLength(`${len}/6`);
  //     setNewCol(len);
  //   }
  //   console.log("newLength", newLength, "newCol", newCol);
  // }, [tabSelected, searchResults, allBooks]);

  return (
    <div className="">
      <div className={"text-2xl px-2 pt-4 pb-4 lg:pb-2 fade-in "}>
        <div className="text-sm 3xl:text-lg font-semibold w-full  rounded-t-lg flex justify-end sm:pr-6 gap-1 3xl:gap-2">
          <button
            className={
              tabSelected == "Search"
                ? "text-white p-1 rounded-t-md w-14 3xl:w-18 bg-sky-900 flex justify-center"
                : "text-gray-500 p-1 hover:text-white rounded-t-md w-14 3xl:w-18 bg-sky-950 flex justify-center"
            }
            onClick={() => {
              setTabSelected("Search");
              setCurrentSliceIndex(0);
              setSearch(true);
              // setMessage({
              //   text: `${searchResults?.length} Search Results`,
              //   type: "like",
              // });
               setMessage({
                text: `Search Books`,
                type: "like",
              });
            }}
          >
            <MagnifyingGlassIcon className="icon" />
          </button>
          <button
            className={
              tabSelected == "Recent"
                ? "text-white  rounded-t-md w-28 3xl:w-36 bg-sky-900"
                : "text-gray-500   hover:text-white rounded-t-md w-28 3xl:w-36 bg-sky-950"
            }
            onClick={() => {
              setTabSelected("Recent");
              setCurrentSliceIndex(0);
              setSearch(false);
              setMessage({
                text: " Recent Books",
                type: "info",
              });
            }}
          >
            Recent
          </button>
          <button
            className={
              tabSelected == "Popular"
                ? "text-white  rounded-t-md w-28 3xl:w-36 bg-sky-900"
                : "text-gray-500  hover:text-white rounded-t-md w-28 3xl:w-36 bg-sky-950"
            }
            onClick={() => {
              setTabSelected("Popular");
              setCurrentSliceIndex(0);
              setSearch(false);
              setMessage({ text: "Popular Books", type: "info" });
            }}
          >
            Popular
          </button>

          <button
            className={
              tabSelected == "My Stories"
                ? "text-white  rounded-t-md w-28 3xl:w-36 bg-sky-900"
                : "text-gray-500  hover:text-white rounded-t-md w-28 3xl:w-36 bg-sky-950"
            }
            onClick={() => {
              setTabSelected("My Stories");
              setCurrentSliceIndex(0);
              setSearch(false);
              setMessage({ text: myBooks.length + " Results", type: "info" });
            }}
          >
            My Stories
          </button>
        </div>

        <div className="flex justify-end">
          {getSortedBooks().length === 0 ? (
            <div
              className={` shadow-xs shadow-slate-950 w-full relative bg-sky-950 rounded-b-xl md:rounded-xl md:px-2 md:pt-2 2xl:px-4 2xl:pt-4 p-2 min-h-[28vh] `}
            >
              <p className="text-white italic text-sm w-full flex justify-center items-center py-40 md:py-32  xl:py-16 2xl:py-24 2.5xl:py-32">
               { search && searchResults == 0 ? "No matches found..." : search ? "Enter a search query..." : "No stories created..."}
              </p>
            </div>
          ) : (
            <div
              className={` shadow-xs shadow-slate-950 w-full relative bg-sky-950 rounded-b-xl md:rounded-xl md:px-2 md:pt-2 2xl:px-4 2xl:pt-4 p-2 min-h-[28vh] `}
            >
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 2.5xl:grid-cols-6 gap-2 2.5xl:gap-4 text-sm `}
              >
                {getSortedBooks()
                  .slice(currentSliceIndex, currentSliceIndex + booksPerPage)
                  .map((book) => (
                    <div
                      onClick={() => handlePreviewAll(book.id)}
                      key={book.id}
                      className={
                        selectedBook?.id != book?.id
                          ? "z-50 relative flex items-end justify-center cursor-pointer fade-in hover:ring-2 transition ease-in-out hover:ring-sky-600 duration-200 rounded-tr-lg"
                          : " z-50 relative flex items-end justify-center cursor-pointer ring-2 ring-sky-600 transition ease-in-out  hover:ring-sky-600 duration-200 rounded-tr-lg"
                      }
                    >
                      <PreviewContent
                        book={book}
                        extractTitleFromStory={extractTitleFromStory}
                        user={user}
                        userId={userId}
                        loading={loading}
                        handleSearch={handleSearch}
                        setSearchQuery={setSearchQuery}
                      />
                    </div>
                  ))}

                <div className="flex w-full justify-between md:absolute md:h-full md:right-0 xl:top-0">
                  <div className="h-full md:absolute md:-left-16 2.5xl:-left-20 3xl:-left-24 flex items-center justify-start py-1">
                    <button
                      onClick={handleSlider("left")}
                      className="lg:shadow-xl lg:shadow-slate-950 w-12 3xl:w-20 aspect-square flex justify-start items-center text-amber-500 bg-sky-900 lg:bg-sky-950 hover:bg-sky-900 rounded-full"
                    >
                      <ChevronLeftIcon className="h-10 w-10 3xl:h-16 3xl:w-16" />
                    </button>
                  </div>

                  <div className="h-full md:absolute md:-right-16 2.5xl:-right-20 3xl:-right-24 flex items-center justify-end  py-1">
                    <button
                      onClick={handleSlider("right")}
                      className="lg:shadow-xl lg:shadow-slate-950 w-12 3xl:w-20 aspect-square flex justify-end items-center text-amber-500 bg-sky-900 lg:bg-sky-950 hover:bg-sky-900 rounded-full"
                    >
                      <ChevronRightIcon className="h-10 w-10 3xl:h-16 3xl:w-16" />
                    </button>
                  </div>
                </div>
              </div>

              <PaginationBars
                myPages={myPages}
                totalPages={totalPages}
                currentSliceIndex={currentSliceIndex}
                booksPerPage={booksPerPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
