import React, { useEffect, useState } from "react";
import {
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import tree from "/public/trace1.svg";

export const PreviewContent = ({
  book,
  extractTitleFromStory,
  user,
  userId,
  loading,
  handleSearch,
  setSearchQuery,
  searchQuery,
  showWithAudio,
  selectedTheme,
  selectedCreator,
}) => {
  const [imageLoadError, setImageLoadError] = useState(false);

  const handleImageError = () => {
    setImageLoadError(true);
  };

  useEffect(() => {
    setImageLoadError(false);
  }, [user]);

  const formatTitle = () => {
    const previewTitle = extractTitleFromStory(book?.story);

    if (previewTitle?.length > 25) {
      return previewTitle?.substr(0, 20) + "...";
    }
    if (previewTitle?.length == 0) {
      return "Untitled Storybook";
    }
    return previewTitle;
  };



  return (
    <>
      {/* User Icon */}
      <div
        className={`z-10 left-1 top-1 absolute h-1/6 w-fit flex items-center justify-center ${
          // userId != book?.userId
          selectedCreator?.includes(book?.creatorName || book?.displayName)
            ? "bg-amber-500 ring-white text-white shadow-md shadow-slate-800"
            : "bg-slate-700 ring-amber-500 text-amber-500 shadow-md shadow-slate-800"
        } ring-2 rounded-tl-lg rounded-full`}
      >
        <div className="px-1 flex items-center xl:items-start 2.5xl:items-center">
          <span className="text-lg md:text-md xl:text-sm 3xl:text-lg h-full">
            {book?.creatorName || book?.displayName || "Anonymous"}
          </span>
          {book?.creatorPhotoURL && !imageLoadError ? (
            <div className="relative rounded-full w-10 h-10 xl:w-6 xl:h-6 2.5xl:h-8 2.5xl:w-8 3xl:h-11 3xl:w-11  ml-1">
              <Image
                src={book?.creatorPhotoURL}
                alt="profile-mini"
                fill
                sizes="10vw"
                className={
                  userId != book?.userId
                    ? "rounded-full object-cover"
                    : "rounded-full object-cover ring-white ring-2"
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

        <div
          className={
            showWithAudio && book?.audioUrl
              ? "z-10 w-1/6 h-1/6 text-lg md:text-sm 3xl:text-lg flex justify-center items-center group rounded-full bg-amber-500 border-white text-white border-2 shadow-md shadow-slate-800"
              : "z-10 w-1/6 h-1/6 text-lg md:text-sm 3xl:text-lg flex justify-center items-center group rounded-full bg-slate-700 border-amber-500 text-amber-500 border-2 shadow-md shadow-slate-800"
          }
        >
          <div className="rounded-full text-center shadow-xl ">
            <span className="scale-0 group-hover:scale-100 transition-all absolute right-10 bg-slate-700 px-1 rounded text-white">
              {book?.audioUrl ? "audio" : "no audio"}
            </span>
            {book?.audioUrl ? (
              <SpeakerWaveIcon className=" font-bold w-6 h-6 xl:w-4 xl:h-4 2.5xl:h-5 2.5xl:w-5 3xl:h-7 3xl:w-7 " />
            ) : (
              <SpeakerXMarkIcon className=" w-6 h-6 xl:w-4 xl:h-4 2.5xl:h-5 2.5xl:w-5 3xl:h-7 3xl:w-7" />
            )}
          </div>
        </div>

        {/* Likes Icon */}
        {book?.likes > 0 && (
          <div className="z-10 w-1/6 h-1/6 text-lg md:text-sm 3xl:text-lg flex justify-center items-center group rounded-full rounded-br bg-teal-500 border-teal-500 text-white border-2 shadow-md shadow-slate-800">
            <div className="rounded-full text-center shadow-xl">
              <span className="scale-0 group-hover:scale-100 transition-all absolute right-10 bg-slate-700 px-1 rounded text-white">
                {book?.likedBy?.includes(userId) ? "liked" : "likes"}
              </span>
              {book?.likes || 0}
            </div>
          </div>
        )}

        {/* Shares Icon */}
        {book?.shares > 0 && (
          <div className="z-10 w-1/6 h-1/6 text-lg md:text-sm 3xl:text-lg flex justify-center items-center group rounded-full bg-indigo-500 border-indigo-500 text-white border-2 shadow-md shadow-slate-800">
            <div className="rounded-full text-center shadow-xl">
              <span className="scale-0 group-hover:scale-100 transition-all absolute right-10 bg-slate-700 px-1 rounded text-white">
                {book?.sharedBy?.includes(userId) ? "shared" : "shares"}
              </span>
              {book?.shares || 0}
            </div>
          </div>
        )}

        {/* Views Icon */}
        {book?.views > 0 && (
          <div className="z-10 w-1/6 h-1/6 text-lg md:text-sm 3xl:text-lg flex justify-center items-center group rounded-full bg-fuchsia-500 border-fuchsia-500 text-white border-2 shadow-md shadow-slate-800">
            <div className="rounded-full text-center shadow-xl">
              <span className="scale-0 group-hover:scale-100 transition-all absolute right-10 bg-slate-700 px-1 rounded text-white">
                {book?.viewedBy?.includes(userId) ? "viewed" : "views"}
              </span>
              {book?.views || 0}
            </div>
          </div>
        )}
      </div>

     

      {/* Title */}
      <>
        <div className=" absolute whitespace-nowrap bottom-1 left-0 h-1/6 xl:h-1/5 w-fit  z-10  capitalize overflow-x-hidden">
          <div
            className={
              selectedTheme?.includes(book?.theme) ||
              (searchQuery != "" &&
                book?.title?.toLowerCase().includes(searchQuery?.toLowerCase()))
                ? "bg-amber-500 border-white text-white h-full  text-lg md:text-md xl:text-sm 3xl:text-lg flex flex-col justify-center font-normal rounded-r-full rounded border-2 border-l-0  "
                : "bg-slate-700 border-amber-500 text-amber-500 h-full  text-lg md:text-md xl:text-sm 3xl:text-lg flex flex-col justify-center font-normal rounded-r-full rounded border-2 border-l-0 "
            }
          >
            <span
              className={
                "mb-1 w-full px-1  text-sm md:text-xs 3xl:text-lg  text-white font-semibold"
              }
            >
              {book?.theme || "No Theme"}
            </span>
            <div className=" w-full px-1 pr-3 -mt-2 italic">
              {" "}
              {formatTitle()}
            </div>
          </div>
        </div>
      </>

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
                : book?.imageUrls && book?.imageUrls?.length > 0
                ? book.imageUrls[0]
                : tree
            }
            alt="preview-image"
            layout="fill"
            objectFit="cover"
            blur="true"
            blurDataURL={tree}
            onError={handleImageError}
            className="rounded-tr-lg w-64 bg-stone-600"
          />
        )}
      </div>
    </>
  );
};
