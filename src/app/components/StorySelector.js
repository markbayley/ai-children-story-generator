import Image from "next/image";
import pic7 from "/public/pic7.jpg";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Tab } from "@headlessui/react";
import { useState, useEffect } from "react";

export const StorySelector = ({
  myBooks,
  allBooks,
  extractTitleFromStory,
  handlePreviewMine,
  handlePreviewAll,
  myStoriesSelected,
  setMyStoriesSelected,
  userId,
  currentSliceIndex,
  setCurrentSliceIndex,
  selectedBook,
  user,
  loading,
  playing,
  setPlaying,
}) => {
  const PreviewContent = ({ book }) => {
    const [imageLoadError, setImageLoadError] = useState(false);

    const handleImageError = () => {
      setImageLoadError(true);
    };

    useEffect(() => {
      setImageLoadError(false);
    }, [user]);

    const formatTitle = () => {
      let title = extractTitleFromStory(book?.story);
      if (title.length > 25) {
        return title.substr(0, 25) + "...";
      }
      return title;
    };

    return (
      <>
        {/* User Icon */}
        <div
          className={`z-10   left-1 top-1 absolute h-1/6  ${
            userId != book.userId
              ? "bg-slate-700 border-amber-500 text-amber-500"
              : "bg-amber-500 border-white text-white"
          } border-2 rounded-tl-lg rounded-full`}
        >
          <div className="px-1 flex h-full items-center justify-center">
            <span className="text-lg md:text-sm">
              {book?.creatorName || book?.displayName}
            </span>
            {book?.creatorPhotoURL && !imageLoadError ? (
              <div className="relative aspect-square rounded-full w-11 md:w-6 mx-[2px]">
                <Image
                  src={book?.creatorPhotoURL}
                  alt="profile-mini"
                  fill
                  sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
                  cover="true"
                  className="rounded-full object-cover border-2 "
                  onError={handleImageError}
                />
              </div>
            ) : (
              <UserCircleIcon className="w-12 aspect-square md:w-7" />
            )}
          </div>
        </div>

        {/* Likes Icon */}
        <div
          className={`z-10 right-1 top-1 absolute w-1/6 h-1/6 text-2xl md:text-sm flex justify-center items-center group rounded-full rounded-br ${
            book?.likedBy?.includes(userId)
              ? "bg-teal-500 border-teal-500 text-white"
              : "bg-slate-700 text-teal-500 border-teal-500"
          } border-2`}
        >
          <div className="rounded-full text-center shadow-xl">
            <span className="scale-0 group-hover:scale-100 transition-all absolute right-8 bg-slate-700 px-2 rounded text-white">
              {book?.likedBy?.includes(userId) ? "liked" : "likes"}
            </span>
            {book.likes}
          </div>
        </div>

        {/* Title */}
        <div className="absolute whitespace-nowrap bottom-0 left-0 h-1/6 z-10 max-w-fit capitalize overflow-x-hidden">
          <h5 className="pr-2 p-1 flex h-full w-full items-center justify-center text-xs font-normal rounded-r-full text-white  bg-gradient-to-r from-sky-950 to-[#3c3232] rounded border-b-2 border-gray-900 drop-shadow-2xl">
            {formatTitle(book?.story) || "Untitled"}
          </h5>
        </div>
        {/* Image */}
        <div className="relative w-full h-full aspect-square flex items-center justify-center">
          {book.imageUrls && book.imageUrls.length > 0 && !imageLoadError && (
            <>
              {/* {<div className="spinner w-10 h-10 absolute z-20"></div>} */}
              <Image
                src={book.imageUrls[0] || pic7}
                //src={pic7}
                 fill
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
                priority={true}
                loading="eager"
                alt="preview"
                className="rounded-tr-xl"
                onError={handleImageError}
              />
            </>
          )}
        </div>
      </>
    );
  };

  const booksPerPage = 6;

  const totalPages = Math.ceil(allBooks.length / booksPerPage);

  const PaginationBars = ({ totalPages, currentSliceIndex, booksPerPage }) => {
    const currentPage = Math.ceil(currentSliceIndex / booksPerPage);

    return (
      <div className="md:flex md:justify-center ">
        <div className="flex items-center justify-center space-x-4  ">
          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              className={`h-1 w-8 mt-4 mb-2 rounded-sm  ${
                currentPage === index ? "bg-amber-500" : "bg-gray-500"
              }`}
            ></div>
          ))}
        </div>
        <div className="-z-50 flex justify-between items-end md:absolute md:w-screen md:bottom-[45%] xl:bottom-24 md:px-[9%]">
          <button
            onClick={handleSlider("left")}
            className="h-full w-1/2 py-1 md:w-12 hover:text-white text-amber-500 bg-sky-900 lg:bg-sky-950 lg:hover:bg-sky-900 rounded-full"
          >
            <ChevronLeftIcon className="h-10 w-10" />
          </button>
          <button
            onClick={handleSlider("right")}
            className="h-full w-1/2 py-1 md:w-12 flex justify-end hover:text-white text-amber-500 bg-sky-900 lg:bg-sky-950 lg:hover:bg-sky-900 rounded-full"
          >
            <ChevronRightIcon className="h-10 w-10" />
          </button>
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
          allBooks.length - booksPerPage
        );
      } else if (direction === "left") {
        // Move to the previous set of books if not at the start
        newIndex = Math.max(prevIndex - booksPerPage, 0);
      }
      return newIndex;
    });
  };

  const [tabSelected, setTabSelected] = useState("Recent");
  //const [sortOrder, setSortOrder] = useState(allBooks.createdAt);
  console.log("tabSelected", tabSelected);

  // Function to sort books based on the selected tab
  const getSortedBooks = () => {
    switch (tabSelected) {
      case "Recent":
        return [...allBooks].sort((a, b) => b.createdAt - a.createdAt);
      case "Popular":
        return [...allBooks].sort((a, b) => b.likes - a.likes);
      case "My Stories":
        return [...allBooks].filter((book) => book?.userId == userId); // Assuming myBooks is already fetched and doesn't need sorting
      default:
        return allBooks;
    }
  };

  return (
    <>
      <div className=" text-2xl px-4 pt-8 pb-16 lg:pb-2 fade-in">
        <div className="font-sans text-sm font-semibold w-full rounded-t-lg flex justify-end sm:pr-6 gap-1 ">
          <button
            className={
              tabSelected == "Recent"
                ? "text-white p-3 rounded-t-md w-28 bg-sky-900"
                : "text-gray-500 p-3 hover:text-white rounded-t-md w-28 bg-sky-950"
            }
            onClick={() => {
              setTabSelected("Recent");
            
            }}
          >
            Recent
          </button>
          <button
            className={
              tabSelected == "Popular"
              ? "text-white p-3 rounded-t-md w-28 bg-sky-900"
              : "text-gray-500 p-3 hover:text-white rounded-t-md w-28 bg-sky-950"
            }
            onClick={() => {
              setTabSelected("Popular");
           
            }}
          >
            Popular
          </button>

          <button
            className={
              tabSelected == "My Stories"
              ? "text-white p-3 rounded-t-md w-28 bg-sky-900"
              : "text-gray-500 p-3 hover:text-white rounded-t-md w-28 bg-sky-950"
            }
            onClick={() => {
              setTabSelected("My Stories");
              // setSortOrder(allBooks.userId);
            }}
          >
            My Stories
          </button>
        </div>

        <div className="">
          <div className="w-full relative bg-sky-950 rounded-xl md:px-6 md:pt-6 p-2">
            {/* Map All Stories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 text-sm min-h-[180px]">
              {getSortedBooks()
                .slice(currentSliceIndex, currentSliceIndex + booksPerPage)
                .map((book) => (
                  <div
                    onClick={() => handlePreviewAll(book.id)}
                    key={book.id}
                    className={
                      selectedBook?.id != book?.id
                        ? "relative flex items-end justify-center cursor-pointer fade-in shadow-md transition ease-in-out hover:shadow-teal-500 duration-200 rounded-tr-xl "
                        : "relative flex items-end justify-center cursor-pointer fade-in shadow-md shadow-teal-500 transition ease-in-out hover:shadow-teal-500 duration-200 rounded-tr-xl"
                    }
                  >
                    <PreviewContent book={book} />
                  </div>
                ))}
            </div>
            <PaginationBars
              totalPages={totalPages}
              currentSliceIndex={currentSliceIndex}
              booksPerPage={booksPerPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};
