import { PreviewContent } from "./selector/PreviewContent";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PaintBrushIcon,
} from "@heroicons/react/24/outline";
export const SelectorIndex = ({
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
  filterResults,
  showWithAudio,
  selectedTheme,
  selectedCreator,
}) => {
  const itemsPerPage = 12;
  const totalItems =
    tabSelected == "Search"
      ? searchResults.length
      : tabSelected == "Filter"
      ? filterResults.length
      : tabSelected == "MyBooks"
      ? myBooks.length
      : allBooks.length;
  // const totalPages = Math.ceil(allBooks?.length / booksPerPage);
  // const myPages = Math.ceil(myBooks?.length / booksPerPage);

  const PaginationBars = ({ totalItems, currentSliceIndex, itemsPerPage }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentPage = Math.ceil(currentSliceIndex / itemsPerPage);

    return (
      <div className="md:flex md:justify-center">
        <div className="flex items-center justify-center space-x-2 3xl:space-x-3">
          {Array.from({ length: totalPages }).map((_, index) => (
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

  const handleSlider =
    (direction, currentSliceIndex, itemsPerPage, totalItems) => () => {
      setCurrentSliceIndex((prevIndex) => {
        let newIndex = prevIndex;
        if (direction === "right") {
          // Move to the next set of items if not at the end
          newIndex = Math.min(
            prevIndex + itemsPerPage,
            totalItems - itemsPerPage
          );
        } else if (direction === "left") {
          // Move to the previous set of items if not at the start
          newIndex = Math.max(prevIndex - itemsPerPage, 0);
        }
        return newIndex;
      });
    };

  // Function to sort books based on the selected tab
  const getSortedBooks = () => {
    switch (tabSelected) {
      //case "Users"
      // return ...
      case "Filter":
        return filterResults;
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

      case "MyBooks":
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
    <div className="z-30">
      <div className={"text-2xl px-2 pt-4 pb-4 lg:pb-2 fade-in "}>
        <div className="text-sm 3xl:text-lg font-semibold w-full  rounded-t-lg flex justify-end sm:pr-6 gap-1 3xl:gap-2">
          <button
            className={
              tabSelected == "Recent"
                ? "text-white  rounded-t-md w-28 3xl:w-36 bg-sky-900"
                : "hover:bg-sky-900 text-white rounded-t-md w-28 3xl:w-36 bg-sky-950"
            }
            onClick={() => {
              setTabSelected("Recent");
              setCurrentSliceIndex(0);
              setSearch(false);
              setMessage({
                text: " Recent Books",
                type: "create",
              });
            }}
          >
            Recent
          </button>
          <button
            className={
              tabSelected == "Popular"
                ? "text-white  rounded-t-md w-28 3xl:w-36 bg-sky-900"
                : "hover:bg-sky-900 text-white rounded-t-md w-28 3xl:w-36 bg-sky-950"
            }
            onClick={() => {
              setTabSelected("Popular");
              setCurrentSliceIndex(0);
              setSearch(false);
              setMessage({ text: "Popular Books", type: "create" });
            }}
          >
            Popular
          </button>

          <button
            className={
              tabSelected == "MyBooks"
                ? "text-white  rounded-t-md w-28 3xl:w-36 bg-sky-900"
                : " hover:bg-sky-900 text-white rounded-t-md w-28 3xl:w-36 bg-sky-950"
            }
            onClick={() => {
              setTabSelected("MyBooks");
              setCurrentSliceIndex(0);
              setSearch(false);
              setMessage({ text: myBooks.length + " Results", type: "create" });
            }}
          >
            <span className="flex items-center justify-center w-full">
              {" "}
              Create
              {/* <PaintBrushIcon className="icon" /> */}
            </span>
          </button>

          <button
            className={
              tabSelected == "Filter"
                ? "text-white p-1 rounded-t-md w-14 xl:w-28 3xl:w-36 bg-sky-900 flex justify-center"
                : "hover:bg-sky-900 text-white p-1 rounded-t-md w-14 xl:w-28 3xl:w-36 bg-sky-950 flex justify-center"
            }
            onClick={() => {
              setTabSelected("Filter");
              setCurrentSliceIndex(0);
              setSearch("filter");

              setMessage({
                text: `Filter Books`,
                type: "create",
              });
            }}
          >
            {filterResults?.length > 0 && (
              <span className=" flex items-center absolute justify-end pr-1 rounded-full h-3 w-12 xl:w-20 3xl:w-34 z-10 text-xs text-amber-500">
                {filterResults.length}
              </span>
            )}

            <div className="flex items-center justify-center w-full">
              <span className="hidden xl:flex">Filter </span>{" "}
              <FunnelIcon
                className={
                  selectedTheme?.length > 0 ||
                  selectedCreator?.length > 0 ||
                  showWithAudio
                    ? "icon text-amber-500"
                    : "icon"
                }
              />
            </div>
          </button>

          <button
            className={
              tabSelected == "Search"
                ? "text-white p-1 rounded-t-md w-14 xl:w-28 3xl:w-36 bg-sky-900 flex justify-center"
                : "hover:bg-sky-900 text-white p-1 rounded-t-md w-14 xl:w-28 3xl:w-36 bg-sky-950 flex justify-center"
            }
            onClick={() => {
              setTabSelected("Search");
              setCurrentSliceIndex(0);
              setSearch("search");
              // setMessage({
              //   text: `${searchResults?.length} Search Results`,
              //   type: "like",
              // });
              setMessage({
                text: `Search Books`,
                type: "create",
              });
            }}
          >
            {searchResults?.length > 0 && (
              <span className="flex items-center absolute justify-end pr-1 rounded-full h-3 w-12 xl:w-20 3xl:w-36 z-10 text-xs text-amber-500">
                {searchResults.length}
              </span>
            )}

            <div className="flex items-center justify-center w-full">
              <span className="hidden xl:flex"> Search</span>{" "}
              <MagnifyingGlassIcon
                className={searchQuery ? "icon text-amber-500" : "icon"}
              />
            </div>
          </button>
        </div>

        <div className="flex justify-end">
          {getSortedBooks().length === 0 ? (
            <div
              className={` shadow-xs shadow-slate-950 w-full relative bg-sky-950 rounded-b-xl md:rounded-xl md:px-2 md:pt-2 2xl:px-4 2xl:pt-4 p-2 min-h-[28vh] `}
            >
              <p className="text-white italic text-sm w-full flex justify-center items-center py-40 md:py-32  xl:py-16 2xl:py-24 2.5xl:py-32">
                {searchQuery ||
                selectedTheme ||
                showWithAudio ||
                selectedCreator
                  ? "No matches found..."
                  : search == "search"
                  ? "Enter a search query..."
                  : "No filters selected"}
              </p>
            </div>
          ) : (
            <div
              className={` shadow-xs shadow-slate-950 w-full relative bg-sky-950 rounded-b-xl md:rounded-xl md:px-2 md:pt-2 2xl:px-4 2xl:pt-4 p-2 min-h-[28vh] `}
            >
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2 2.5xl:gap-4 text-sm `}
              >
                {getSortedBooks()
                  .slice(currentSliceIndex, currentSliceIndex + itemsPerPage)
                  .map((book) => (
                    <div
                      onClick={() => handlePreviewAll(book.id)}
                      key={book.id}
                      className={
                        selectedBook?.id != book?.id
                          ? "z-30 relative flex items-end justify-center cursor-pointer fade-in hover:ring-2 transition ease-in-out hover:ring-amber-500 duration-200 rounded-tr-lg"
                          : " z-30 relative flex items-end justify-center cursor-pointer ring-2 ring-amber-500 transition ease-in-out  hover:ring-amber-500 duration-200 rounded-tr-lg"
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
                        searchQuery={searchQuery}
                        showWithAudio={showWithAudio}
                        selectedTheme={selectedTheme}
                        selectedCreator={selectedCreator}
                      />
                    </div>
                  ))}

                <div className="flex w-full justify-between md:absolute md:h-full md:right-0 xl:top-0">
                  <div className="h-full md:absolute md:-left-16 2.5xl:-left-20 3xl:-left-24 flex items-center justify-start py-1">
                    <button
                      onClick={handleSlider(
                        "left",
                        currentSliceIndex,
                        itemsPerPage,
                        totalItems
                      )}
                      className="lg:shadow-xl lg:shadow-slate-950 w-12 3xl:w-20 aspect-square flex justify-start items-center text-amber-500 bg-sky-900 lg:bg-sky-950 hover:bg-sky-900 rounded-full"
                    >
                      <ChevronLeftIcon className="h-10 w-10 3xl:h-16 3xl:w-16 p-1" />
                    </button>
                  </div>

                  <div className="h-full md:absolute md:-right-16 2.5xl:-right-20 3xl:-right-24 flex items-center justify-end  py-1">
                    <button
                      onClick={handleSlider(
                        "right",
                        currentSliceIndex,
                        itemsPerPage,
                        totalItems
                      )}
                      className="lg:shadow-xl lg:shadow-slate-950 w-12 3xl:w-20 aspect-square flex justify-end items-center text-amber-500 bg-sky-900 lg:bg-sky-950 hover:bg-sky-900 rounded-full"
                    >
                      <ChevronRightIcon className="h-10 w-10 3xl:h-16 3xl:w-16 p-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* <PaginationBars
                myPages={myPages}
                totalPages={totalPages}
                currentSliceIndex={currentSliceIndex}
                booksPerPage={booksPerPage}
              /> */}
              <PaginationBars
                totalItems={totalItems} // Pass the length of filteredResults or searchResults
                currentSliceIndex={currentSliceIndex}
                itemsPerPage={itemsPerPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
