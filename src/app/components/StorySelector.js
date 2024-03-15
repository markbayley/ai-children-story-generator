import Image from "next/image";
import tree from "/public/trace1.svg";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HandThumbUpIcon,
  SpeakerWaveIcon,
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
  tabSelected,
  setTabSelected,
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
      const previewTitle = extractTitleFromStory(book?.story);

      if (previewTitle.length > 25) {
        return previewTitle.substr(0, 20) + "...";
      }
      if (previewTitle.length == 0) {
        return "Untitled";
      }
      return previewTitle;
    };

    return (
      <>
        {/* User Icon */}
        <div
          className={`z-10 left-1 top-1 absolute h-1/6 ${
            userId != book.userId
              ? "bg-slate-700 border-amber-500 text-amber-500"
              : "bg-amber-500 border-white text-white"
          } border-2 rounded-tl-lg rounded-full`}
        >
          <div className="px-1 flex h-full items-center justify-center">
            <span className="text-lg md:text-sm 3xl:text-lg">
              {book?.creatorName || book?.displayName || "Anonymous"}
            </span>
            {book?.creatorPhotoURL && !imageLoadError ? (
              <div className="relative aspect-square rounded-full w-11 md:w-6 ml-1">
                <Image
                  src={book?.creatorPhotoURL}
                  alt="profile-mini"
                  fill
                  sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
                  cover="true"
                  className={
                    userId != book.userId
                      ? "rounded-full object-cover border-amber-500 border-2"
                      : "rounded-full object-cover border-white border-2"
                  }
                  onError={handleImageError}
                />
              </div>
            ) : (
              <UserCircleIcon className="w-12 aspect-square md:w-7 -mr-1" />
            )}
          </div>
        </div>

        <div className="absolute flex flex-col w-full h-full items-end gap-1 p-1">
          {/* Audio Icon */}
          {book?.audioUrl && (
            <div className="z-10 w-1/6 h-1/6 text-lg md:text-sm 3xl:text-lg flex justify-center items-center group rounded-full bg-blue-500 border-blue-500 text-white border-2">
              <div className="rounded-full text-center shadow-xl">
                <span className="scale-0 group-hover:scale-100 transition-all absolute right-10 bg-slate-700 px-1 rounded text-white">
                  {book?.audioUrl ? "audio" : ""}
                </span>
                <SpeakerWaveIcon className="h-4 w-4" />
              </div>
            </div>
          )}
          {/* Likes Icon */}
          {book?.likes > 0 && (
            <div className="z-10 w-1/6 h-1/6 text-lg md:text-sm 3xl:text-lg flex justify-center items-center group rounded-full rounded-br bg-teal-500 border-teal-500 text-white border-2">
              <div className="rounded-full text-center shadow-xl">
                <span className="scale-0 group-hover:scale-100 transition-all absolute right-10 bg-slate-700 px-1 rounded text-white">
                  {book?.likedBy?.includes(userId) ? "liked" : "likes"}
                </span>
                {book.likes || 0}
              </div>
            </div>
          )}

          {/* Shares Icon */}
          {book?.shares > 0 && (
            <div className="z-10 w-1/6 h-1/6 text-lg md:text-sm 3xl:text-lg flex justify-center items-center group rounded-full bg-indigo-500 border-indigo-500 text-white border-2">
              <div className="rounded-full text-center shadow-xl">
                <span className="scale-0 group-hover:scale-100 transition-all absolute right-10 bg-slate-700 px-1 rounded text-white">
                  {book?.sharedBy?.includes(userId) ? "shared" : "shares"}
                </span>
                {book.shares || 0}
              </div>
            </div>
          )}

          {/* Views Icon */}
          {book?.views > 0 && (
            <div className="z-10 w-1/6 h-1/6 text-lg md:text-sm 3xl:text-lg flex justify-center items-center group rounded-full bg-amber-500 border-amber-500 text-white border-2">
              <div className="rounded-full text-center shadow-xl">
                <span className="scale-0 group-hover:scale-100 transition-all absolute right-10 bg-slate-700 px-1 rounded text-white">
                  {book?.viewedBy?.includes(userId) ? "viewed" : "views"}
                </span>
                {book.views || 0}
              </div>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="absolute whitespace-nowrap bottom-1 left-0 h-1/6 z-10 max-w-fit capitalize overflow-x-hidden">
          <h5 className="pr-2 p-1 flex h-full w-full text-lg md:text-sm 3xl:text-lg items-center justify-center font-normal rounded-r-full bg-slate-700 border-amber-500 text-amber-500 rounded border-2 border-l-0">
            {formatTitle() || "Untitled"}
          </h5>
        </div>
        {/* Image */}
        <div
          className={
            loading
              ? "relative w-full h-full aspect-square flex items-center justify-center border-2 rounded border-stone-600  rounded-tr-lg"
              : "relative w-full h-full aspect-square flex items-center justify-center"
          }
        >
          {loading ? (
            <div className="spinner w-full h-full absolute"></div>
          ) : (
            <Image
              src={
                imageLoadError
                  ? tree
                  : book?.imageUrls && book.imageUrls.length > 0
                  ? book.imageUrls[0]
                  : tree
              }
              alt="preview-image"
              layout="fill"
              objectFit="cover"
              blur="true"
              blurDataURL={tree}
              onError={handleImageError}
              className="rounded-tr-lg"
            />
          )}
        </div>
      </>
    );
  };

  const booksPerPage = 6;
  // const booksPerPage = [5, 6];

  const totalPages = Math.ceil(allBooks?.length / booksPerPage);
  const myPages = Math.ceil(myBooks?.length / booksPerPage);
  console.log("myPages", myPages);

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
        {/* <div className="p-2 w-full flex justify-between absolute bottom-20 lg:w-screen lg:px-[5%] items-center lg:items-center">
          <button
            onClick={handleSlider("left")}
            className="lg:shadow-xl lg:shadow-slate-950 w-12 2.5xl:w-16 3xl:w-20 aspect-square flex justify-start items-center text-amber-500 bg-sky-900 lg:bg-sky-950 lg:hover:bg-sky-900 rounded-full"
          >
            <ChevronLeftIcon className="h-10 w-10 2.5xl:h-14 2.5xl:w-14 3xl:h-16 3xl:w-16" />
          </button>
          <button
            onClick={handleSlider("right")}
            className="lg:shadow-xl lg:shadow-slate-950 w-12 2.5xl:w-16 3xl:w-20 aspect-square flex justify-end items-center text-amber-500 bg-sky-900 lg:bg-sky-950 lg:hover:bg-sky-900 rounded-full"
          >
            <ChevronRightIcon className="h-10 w-10 2.5xl:h-14 2.5xl:w-14 3xl:h-16 3xl:w-16" />
          </button>
        </div> */}
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
        return [...allBooks].filter((book) => book?.userId == userId);
      default:
        return allBooks;
    }
  };

  return (
    <div className="">
      <div className="text-2xl px-2 pt-4 pb-4 lg:pb-2 fade-in">
        <div className="text-sm 3xl:text-lg font-semibold w-full rounded-t-lg flex justify-end sm:pr-6 gap-1 3xl:gap-2">
          <button
            className={
              tabSelected == "Recent"
                ? "text-white p-3 rounded-t-md w-28 3xl:w-36 bg-sky-900"
                : "text-gray-500 p-3  hover:text-white rounded-t-md w-28 3xl:w-36 bg-sky-950"
            }
            onClick={() => {
              setTabSelected("Recent");
              setCurrentSliceIndex(0);
            }}
          >
            Recent
          </button>
          <button
            className={
              tabSelected == "Popular"
                ? "text-white p-3 rounded-t-md w-28 3xl:w-36 bg-sky-900"
                : "text-gray-500 p-3 hover:text-white rounded-t-md w-28 3xl:w-36 bg-sky-950"
            }
            onClick={() => {
              setTabSelected("Popular");
              setCurrentSliceIndex(0);
            }}
          >
            Popular
          </button>

          <button
            className={
              tabSelected == "My Stories"
                ? "text-white p-3 rounded-t-md w-28 3xl:w-36 bg-sky-900"
                : "text-gray-500 p-3 hover:text-white rounded-t-md w-28 3xl:w-36 bg-sky-950"
            }
            onClick={() => {
              setTabSelected("My Stories");
              setCurrentSliceIndex(0);
              // setSortOrder(allBooks.userId);
            }}
          >
            My Stories
          </button>
        </div>

        <div className="">
          <div className="shadow-xs shadow-slate-950 w-full relative bg-sky-950 rounded-b-xl md:rounded-xl md:px-2 md:pt-2 2xl:px-4 2xl:pt-4 p-2 min-h-[28vh]">
            {/* Map All Stories */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 2.5xl:grid-cols-6 gap-2 2.5xl:gap-4 text-sm `}
            >
              {getSortedBooks()
                .slice(currentSliceIndex, currentSliceIndex + booksPerPage)
                .map((book) => (
                  <div
                    onClick={() => handlePreviewAll(book.id)}
                    key={book.id}
                    className={
                      selectedBook?.id != book?.id
                        ? "z-50 relative flex items-end justify-center cursor-pointer fade-in hover:ring-2 transition ease-in-out hover:ring-indigo-500 duration-200 rounded-tr-lg"
                        : "animate-pulse z-50 relative flex items-end justify-center cursor-pointer ring-2 ring-indigo-500 transition ease-in-out  hover:ring-indigo-500 duration-200 rounded-tr-lg"
                    }
                  >
                    <PreviewContent book={book} />
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

            {/* <div className="flex justify-between">
              <div className="h-full lg:absolute md:-left-16 3xl:-left-24 flex items-center justify-center pb-4">
              <button
                onClick={handleSlider("left")}
                className="shadow-xl shadow-slate-950 w-12 3xl:w-20 aspect-square flex justify-start items-center text-amber-500 bg-sky-900 lg:bg-sky-950 lg:hover:bg-sky-900 rounded-full"
              >
                <ChevronLeftIcon className="h-10 w-10 3xl:h-16 3xl:w-16" />
              </button>
              </div>

              <div className="h-full lg:absolute md:-right-16 3xl:-right-24 flex items-center justify-center pb-4">
              <button
                onClick={handleSlider("right")}
                className="shadow-xl shadow-slate-950 w-12 3xl:w-20 aspect-square flex justify-end items-center text-amber-500 bg-sky-900 lg:bg-sky-950 lg:hover:bg-sky-900 rounded-full"
              >
                <ChevronRightIcon className="h-10 w-10 3xl:h-16 3xl:w-16" />
              </button>
            </div>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
