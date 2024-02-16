import Image from "next/image";
import pic7 from "/public/pic7.jpg";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

export const StorySelector = ({
  myBooks,
  allBooks,
  extractTitleFromStory,
  handlePreviewMine,
  handlePreviewAll,
  myStoriesSelected,
  setMyStoriesSelected,
  handleLikeBook,
  userId,
  handleDeleteBook,
  setMessage,
  currentSliceIndex,
  setCurrentSliceIndex,
  selectedBook,
  user,
}) => {
  const PreviewContent = ({ book }) => {
    const [imageLoadError, setImageLoadError] = useState(false);

    const handleImageError = () => {
      setImageLoadError(true);
    };

    useEffect(() => {
      setImageLoadError(false);
    }, [user]);

    return (
      <>
        {/* User Icon */}
        <div
          className={`z-10 left-1 top-1 absolute h-1/6  ${
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
                  className="rounded-full object-cover border-2"
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
              likes
            </span>
            {book.likes}
          </div>
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 h-1/6 z-10 text-lg capitalize md:text-sm ">
          <h5 className="px-1 flex h-full items-center justify-center rounded-r-full text-white  font-light bg-gradient-to-r from-sky-950 to-[#3c3232] rounded border-b-2 border-gray-900  drop-shadow-2xl">
            {extractTitleFromStory(book.story) || "Untitled"}
          </h5>
        </div>
        {/* Image */}
        <div className="relative w-full aspect-square">
          {book.imageUrls && book.imageUrls.length > 0 && !imageLoadError ? (
            <Image
              // src={book.imageUrls[0] || pic7}
              src={pic7}
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              alt="preview"
              className="rounded-tr-xl"
              onError={handleImageError}
            />
          ) : (
            <Image src={pic7} loading="eager" priority={true} fill sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw" alt="preview" className="rounded-tr-xl" />
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
      <div className="flex items-center justify-center space-x-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            className={`h-1 w-8 mt-4 mb-2 rounded-sm ${
              currentPage === index ? "bg-amber-500" : "bg-gray-500"
            }`}
          ></div>
        ))}
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

  return (
    <>
      <div className="mt-10 text-2xl px-4 pb-80">
        {/* All Stories Tab */}
        <div className="font-sans text-sm w-full rounded-t-lg flex justify-end pr-8 gap-2">
          <button
            className={
              !myStoriesSelected
                ? "text-teal-500 bg-slate-800 rounded-t-lg px-3 py-2 border-x-2 border-t-2 border-teal-500"
                : "text-gray-500 hover:text-teal-500 bg-slate-800 rounded-t-lg px-3 py-2 border-x border-t border-gray-500"
            }
            onClick={() => setMyStoriesSelected(false)}
          >
            Most Liked
          </button>
          {/* User Stories Tab*/}
          {/* {myBooks.length > 0 && ( */}
          <button
            className={
              myStoriesSelected
                ? "text-amber-500 bg-slate-800 rounded-t-lg px-3 py-2 border-x-2 border-t-2 border-amber-500"
                : "text-gray-500 hover:text-amber-500 bg-slate-800 rounded-t-lg px-3 py-2 border-x border-t border-gray-500"
            }
            onClick={() => setMyStoriesSelected(true)
              // : () =>
              //     setMessage({ text: "No Stories Created", type: "create" })
            }
          >
            My Stories
          </button>
        </div>

        <div className="">
          {/* Map All User Stories */}
          {myStoriesSelected ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2 text-sm mb-3  bg-sky-950 rounded-md  p-2 border-2 border-amber-500">
              {myBooks.map((book) => (
                <div
                  onClick={() => handlePreviewMine(book.id)}
                  key={book.id}
                  className={
                    selectedBook?.id != book?.id
                      ? "relative flex items-end justify-center cursor-pointer fade-in border-2 border-[#15161b] hover:border-2 transition ease-in-out hover:border-amber-500 duration-200 rounded-tr-xl"
                      : "relative flex items-end justify-center cursor-pointer fade-in border-2 border-amber-500 hover:border-2 transition ease-in-out hover:border-amber-500 duration-200 rounded-tr-xl "
                  }
                >
                  <PreviewContent book={book} />
                </div>
              ))}
            </div>
          ) : (
            <div className=" w-full relative bg-sky-950 rounded-md opacity-95 p-2 border-2 border-teal-500">
              {/* Map All Stories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2 text-sm ">
                <button
                  onClick={handleSlider("left")}
                  className="h-full w-12 absolute -left-20 hover:text-gray-500 text-amber-500"
                >
                  <ChevronLeftIcon className="h-10 w-10" />
                </button>

                {allBooks
                  .slice()
                  .sort((a, b) => (b.likes || 0) - (a.likes || 0))
                  .slice(currentSliceIndex, currentSliceIndex + booksPerPage)
                  .map((book) => (
                    <div
                      onClick={() => handlePreviewAll(book.id)}
                      key={book.id}
                      className={
                        selectedBook?.id != book?.id
                          ? "relative flex items-end justify-center cursor-pointer fade-in border-2 border-gray-900 shadow-md transition ease-in-out hover:shadow-teal-500 duration-200 rounded-tr-xl "
                          : "relative flex items-end justify-center cursor-pointer fade-in border-2 border-gray-900 shadow-md shadow-teal-500 transition ease-in-out hover:shadow-teal-500 duration-200 rounded-tr-xl"
                      }
                    >
                      <PreviewContent book={book} />
                    </div>
                  ))}

                <button
                  onClick={handleSlider("right")}
                  className="h-full w-12 absolute -right-20 hover:text-gray-500 text-amber-500"
                >
                  <ChevronRightIcon className="h-10 w-10" />
                </button>
              </div>
              <PaginationBars
                totalPages={totalPages}
                currentSliceIndex={currentSliceIndex}
                booksPerPage={booksPerPage}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
