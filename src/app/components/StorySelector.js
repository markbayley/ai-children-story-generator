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
              ? "relative w-full h-full aspect-square flex items-center justify-center border-2 rounded border-stone-600 bg-stone-700 rounded-tr-lg"
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
        <div className="flex items-center justify-center space-x-2">
          {Array.from({
            length: tabSelected == "My Stories" ? myPages : totalPages,
          }).map((_, index) => (
            <div
              key={index}
              className={`h-1 w-4 mt-3 rounded-sm ${
                currentPage === index ? "bg-amber-500" : "bg-stone-600"
              }`}
            ></div>
          ))}
        </div>
        {/* <div className="-z-50 flex gap-44 justify-between items-end md:absolute md:w-screen md:bottom-[45%] xl:bottom-20 md:px-[7%] 3xl:bottom-36 3xl:px-[9%]">
          <button
            onClick={handleSlider("left")}
            className="h-full w-1/2 py-1 md:w-12 3xl:w-16 hover:text-white text-amber-500 bg-sky-900 lg:bg-sky-950 lg:hover:bg-sky-900 rounded-full"
          >
            <ChevronLeftIcon className="h-10 w-10 3xl:h-14 3xl:w-14" />
          </button>
          <button
            onClick={handleSlider("right")}
            className="h-full w-1/2 py-1 md:w-12 3xl:w-16 flex justify-end hover:text-white text-amber-500 bg-sky-900 lg:bg-sky-950 lg:hover:bg-sky-900 rounded-full"
          >
            <ChevronRightIcon className="h-10 w-10 3xl:h-14 3xl:w-14" />
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
        return [...allBooks].sort(
          (a, b) =>
            b.likes + b.shares + b.views - (a.likes + a.shares + a.views)
        );
      case "My Stories":
        return [...allBooks].filter((book) => book?.userId == userId);
      default:
        return allBooks;
    }
  };

  return (
    <>
      <div className="text-2xl px-4 pt-4 pb-4 lg:pb-2 fade-in">
        <div className="font-sans text-sm font-semibold w-full rounded-t-lg flex justify-end sm:pr-6 gap-1">
          <button
            className={
              tabSelected == "Recent"
                ? "text-white p-3 rounded-t-md w-28 bg-sky-900"
                : "text-gray-500 p-3 hover:text-white rounded-t-md w-28 bg-sky-950"
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
                ? "text-white p-3 rounded-t-md w-28 bg-sky-900"
                : "text-gray-500 p-3 hover:text-white rounded-t-md w-28 bg-sky-950"
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
                ? "text-white p-3 rounded-t-md w-28 bg-sky-900"
                : "text-gray-500 p-3 hover:text-white rounded-t-md w-28 bg-sky-950"
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
          <div className="w-full relative bg-sky-950 rounded-b-xl md:rounded-xl md:px-2 md:pt-2 3xl:px-4 3xl:pt-4 p-2 min-h-[28vh]">
            {/* Map All Stories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2 3xl:gap-4 text-sm">
              {getSortedBooks()
                .slice(currentSliceIndex, currentSliceIndex + booksPerPage)
                .map((book) => (
                  <div
                    onClick={() => handlePreviewAll(book.id)}
                    key={book.id}
                    className={
                      selectedBook?.id != book?.id
                        ? "relative flex items-end justify-center cursor-pointer fade-in hover:ring-2 transition ease-in-out hover:ring-indigo-500 duration-200 rounded-tr-lg"
                        : "relative flex items-end justify-center cursor-pointer fade-in ring-2 ring-indigo-500 transition ease-in-out hover:ring-indigo-500 duration-200 rounded-tr-lg"
                    }
                  >
                    <PreviewContent book={book} />
                  </div>
                ))}
            </div>

            <PaginationBars
              myPages={myPages}
              totalPages={totalPages}
              currentSliceIndex={currentSliceIndex}
              booksPerPage={booksPerPage}
            />
            <div className="flex justify-between">
              <button
                onClick={handleSlider("left")}
                className="lg:absolute md:-left-16 md:bottom-48 lg:bottom-64 xl:bottom-24 3xl:bottom-36 3xl:-left-24 w-12 py-1 3xl:w-16 flex justify-start text-amber-500 bg-sky-900 lg:bg-sky-950 lg:hover:bg-sky-900 rounded-full"
              >
                <ChevronLeftIcon className="h-10 w-10 3xl:h-14 3xl:w-14" />
              </button>
              <button
                onClick={handleSlider("right")}
                className="lg:absolute md:-right-16 md:bottom-48 lg:bottom-64 xl:bottom-24 3xl:bottom-36 3xl:-right-24 w-12 py-1 3xl:w-16 flex justify-end text-amber-500 bg-sky-900 lg:bg-sky-950 lg:hover:bg-sky-900 rounded-full"
              >
                <ChevronRightIcon className="h-10 w-10 3xl:h-14 3xl:w-14" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
