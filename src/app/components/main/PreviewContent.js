import React, { useEffect, useState } from "react";
import { SpeakerWaveIcon, SpeakerXMarkIcon, UserCircleIcon } from "@heroicons/react/24/outline";
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
  showWithAudio
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

    if (previewTitle.length > 25) {
      return previewTitle.substr(0, 20) + "...";
    }
    if (previewTitle.length == 0) {
      return "Untitled";
    }
    return previewTitle;
  };

  console.log("searchQueryPC", searchQuery)

  return (
    <>
      {/* User Icon */}
      <div
        // onClick={(event) => {
        //   setSearchQuery(book?.creatorName);
        //   // event.stopPropagation();

        //   handleSearch;
        // }}
        className={`z-10 left-1 top-1 absolute h-1/6 ${
          // userId != book?.userId
          searchQuery == book?.creatorName || book?.displayName
            ? "bg-amber-500 border-white text-white"
            : "bg-slate-700 border-amber-500 text-amber-500"
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
                  userId != book?.userId
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
        
          <div className={ showWithAudio && book?.audioUrl? "z-10 w-1/6 h-1/6 text-lg md:text-sm 3xl:text-lg flex justify-center items-center group rounded-full bg-amber-500 border-white text-white border-2"
          : "z-10 w-1/6 h-1/6 text-lg md:text-sm 3xl:text-lg flex justify-center items-center group rounded-full bg-slate-700 border-amber-500 text-amber-500 border-2"}>
            <div className="rounded-full text-center shadow-xl">
              <span className="scale-0 group-hover:scale-100 transition-all absolute right-10 bg-slate-700 px-1 rounded text-white">
                {book?.audioUrl ? "audio" : "no audio"}
              </span>
              {book?.audioUrl ?  <SpeakerWaveIcon className="h-4 w-4 font-extrabold" /> : <SpeakerXMarkIcon className="h-4 w-4" /> }
            </div>
          </div>
      
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
          <div className="z-10 w-1/6 h-1/6 text-lg md:text-sm 3xl:text-lg flex justify-center items-center group rounded-full bg-fuchsia-500 border-fuchsia-500 text-white border-2">
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
      <>
      <span className="absolute bottom-2  left-0  px-1 text-xs  z-20  text-white font-semibold">{book?.theme}</span>
      <div className="absolute whitespace-nowrap bottom-1 left-0 h-[20%] z-10 max-w-fit capitalize overflow-x-hidden">
       
        <h5 className={ searchQuery != "" && book?.title
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
            ? "bg-amber-500 border-white text-white pr-2 px-1 flex h-full w-full text-lg md:text-sm 3xl:text-lg items-start justify-center font-normal rounded-r-full rounded border-2 border-l-0"
            : "bg-slate-700 border-amber-500 text-amber-500 pr-2 px-1 flex h-full w-full text-lg md:text-sm 3xl:text-lg items-start justify-center font-normal rounded-r-full rounded border-2 border-l-0"
        }
       >
          {formatTitle() || "Untitled"}
        </h5>
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
            className="rounded-tr-lg w-64"
          />
        )}
      </div>
    </>
  );
};
