import { TrashIcon } from "@heroicons/react/20/solid";
import { ArrowUpTrayIcon, EyeIcon, HandThumbUpIcon, ShareIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import React from "react";

export const BookIcons = ({
  handleDeleteBook,
  handleSaveBook,
  handleLikeBook,
  dismiss,
  unsaved,
  selectedBook,
  page,
  setPage,
  setMessage,
  setShow,
  userId,
  show,
  audio,
  audioRef
}) => {
  return (
    <div className="z-10 right-6 lg:right-12 lg:pb-5 absolute flex flex-col justify-start md:justify-end items-center h-[32vh] md:h-[60vh] gap-8 w-10 mt-5 xl:mt-0 text-sm">
      {selectedBook?.id == undefined && (
        <div
          onClick={handleSaveBook}
          className={
            !dismiss && unsaved
              ? "group relative text-white max-w-xs md:border-2 bg-rose-500 md:border-rose-500 text-sm md:text-rose-500 md:hover:bg-rose-500 md:hover:text-white rounded shadow-lg cursor-pointer md:bg-sky-950"
              : dismiss && unsaved
              ? "animate-pulse group relative text-white rounded hover:cursor-pointer border-2 border-rose-500 bg-rose-500"
              : "group relative text-white rounded hover:cursor-pointer border-2 border-rose-500 bg-rose-500"
          }
        >
          <ArrowUpTrayIcon className="h-9 w-9 p-1" />
          <span className="scale-0 group-hover:scale-100 transition-all absolute top-1 right-12 bg-sky-950 p-1 rounded">
            {unsaved ? "Save" : dismiss && unsaved ? "Saving..." : "Saved"}
          </span>
        </div>
      )}

      <div
        onClick={() => setPage(5)}
        className={
          page != 6
            ? "group relative text-white md:text-amber-500 md:border-2 rounded md:border-amber-500 hover:cursor-pointer md:hover:bg-amber-500 bg-amber-500 md:hover:text-white md:bg-sky-950"
            : "group relative text-white rounded hover:cursor-pointer border-2 border-amber-500 bg-amber-500"
        }
      >
        <EyeIcon className="h-9 w-9 p-1" />
        <span className="scale-0 group-hover:scale-100 transition-all absolute top-1 right-12 bg-sky-950 p-1 rounded">
          {page != 5 ? "Read" : "Viewed"}
        </span>
      </div>

      <div
        onClick={() => {
          setMessage({ text: "Sharing Links Open", type: "share" });
          setShow(!show);
        }}
        className={
          selectedBook?.sharedBy?.includes(userId)
            ? "group relative text-white rounded hover:cursor-pointer border-2 border-indigo-500 bg-indigo-500"
            : "group relative text-white md:text-indigo-500 md:border-2 rounded md:border-indigo-500 hover:cursor-pointer md:hover:bg-indigo-500 bg-indigo-500 md:hover:text-white md:bg-sky-950"
        }
      >
        <ShareIcon className="h-9 w-9 p-1" />
        <span className="scale-0 group-hover:scale-100 transition-all absolute top-1 right-12 bg-sky-950 p-1 rounded">
          {selectedBook?.sharedBy?.includes(userId) ? "Shared" : "Share"}
        </span>
        <span
          className={
            selectedBook?.sharedBy?.includes(userId)
              ? "absolute -top-3 -right-6 px-2 font-sans  text-sm bg-indigo-500 border-2  rounded-bl-xl text-white rounded-full"
              : "absolute -top-3 -right-6 px-2 font-sans  text-sm bg-sky-950  border-2 border-indigo-500 rounded-bl-xl text-indigo-500 rounded-full"
          }
        >
          {selectedBook?.shares || 0}
        </span>
      </div>

      {selectedBook?.userId != undefined && userId != selectedBook?.userId && (
        <div
          onClick={() => handleLikeBook(selectedBook?.id, userId)}
          className={
            selectedBook?.likedBy?.includes(userId)
              ? "group relative text-white rounded hover:cursor-pointer border-2 border-teal-500 bg-teal-500 "
              : "group relative text-white md:text-teal-500 border-2 rounded md:border-teal-500 hover:cursor-pointer  md:hover:bg-teal-500 bg-teal-500 md:hover:text-white md:bg-sky-950"
          }
        >
          <HandThumbUpIcon className="h-9 w-9  p-1" />
          <span className="scale-0 group-hover:scale-100 transition-all absolute top-1 right-12 bg-sky-950 p-1 rounded">
            {selectedBook?.likedBy?.includes(userId) ? "Liked" : "Like"}
          </span>
          <span
            className={
              selectedBook?.likedBy?.includes(userId)
                ? "absolute -top-3 -right-6 px-2 font-sans  text-sm bg-teal-500 border-2  rounded-bl-xl text-white rounded-full "
                : "absolute -top-3 -right-6 px-2 font-sans  text-sm  border-2 border-teal-500 rounded-bl-xl text-teal-500 rounded-full md:bg-sky-950"
            }
          >
            {selectedBook?.likes || 0}
          </span>
        </div>
      )}

      {userId == selectedBook?.userId && (
        <div
          onClick={() => handleDeleteBook(selectedBook?.id)}
          className={
            !dismiss
              ? "group relative text-white md:text-pink-600 md:border-2 rounded md:border-pink-600 hover:cursor-pointer  md:hover:bg-pink-500 bg-pink-500 md:hover:text-white md:bg-sky-950"
              : "group relative text-white rounded hover:cursor-pointer border-2 border-pink-500 bg-pink-500"
          }
        >
          <TrashIcon className="h-9 w-9  p-1" />
          <span className="scale-0 group-hover:scale-100 transition-all absolute top-1 right-12 bg-sky-950 p-1 rounded">
            {!dismiss ? "Delete" : "Deleted"}
          </span>
        </div>
      )}
          <div
         
          className={
            !dismiss
              ? "group relative text-white md:text-fuchsia-500 md:border-2 rounded md:border-fuchsia-500 hover:cursor-pointer  md:hover:bg-fuchsia-500 bg-fuchsia-500 md:hover:text-white md:bg-slate-950 "
              : "group relative text-white rounded hover:cursor-pointer border-2 border-pink-500 bg-pink-500"
          }
        >

{/* {
          <div className="mr-2 hidden shadow-lg rounded-full border-2 border-stone-700 opacity-80">
            <audio
              ref={audioRef}
              controls
              src={`${audio}`}
              className="w-full"
              style={{ height: "40px", width:"75px", border: "2px" }}
            />
          </div>
        } */}



          <SpeakerWaveIcon className="h-9 w-9  p-1" />
          <span className="scale-0 group-hover:scale-100 transition-all absolute top-1 right-12 bg-sky-950 p-1 rounded">
            {!dismiss ? "Audio" : "Stop"}
          </span>
        </div>
    </div>
  );
};
