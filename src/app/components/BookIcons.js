import { TrashIcon } from "@heroicons/react/20/solid";
import {
  ArrowUpTrayIcon,
  EyeIcon,
  HandThumbUpIcon,
  ShareIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import IconModal from "./IconModal";

export const BookIcons = ({
  handleDeleteBook,
  handleSaveBook,
  handleLikeBook,
  handleShareBook,
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
  audioRef,
  processing,
  deleting,
  playing,
  setPlaying,
  audioPages,
  audioPage,
  lastPage,
  setAudioPage
}) => {
  // Delete Modal
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="z-10 max-x-sm lg:right-8 xl:right-12 3xl:right-24 lg:pb-5 lg:absolute flex lg:flex-col justify-center lg:justify-end items-center h-10 lg:h-[60vh] gap-8 w-full lg:w-10 mt-5 xl:mt-0 text-sm">
      {selectedBook?.id == undefined && (
        <div
          onClick={handleSaveBook}
          className={
            !dismiss && unsaved
              ? "group relative max-w-xs border-2 border-rose-500 text-rose-500 text-sm bg-sky-950 hover:bg-rose-500 hover:text-white rounded shadow-lg cursor-pointer "
              : dismiss && processing
              ? "animate-pulse group relative text-white rounded hover:cursor-pointer border-2 border-rose-500 bg-rose-500"
              : "group relative text-white rounded hover:cursor-pointer border-2 border-rose-500 bg-rose-500"
          }
        >
          <ArrowUpTrayIcon className="h-9 w-9 p-1 3xl:h-14 3xl:w-14 3xl:p-2" />
          <span className="scale-0 group-hover:scale-100 transition-all absolute top-1 right-12 bg-sky-950 p-1 rounded">
            {unsaved ? "Save" : dismiss && unsaved ? "Saving..." : "Saved"}
          </span>
        </div>
      )}

      {userId == selectedBook?.userId && (
        <div
          onClick={openModal}
          className={
            !deleting
              ? "group relative bg-sky-950 border-2 border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white rounded cursor-pointer"
              : "group relative bg-rose-500 border-2 border-rose-500 text-white rounded cursor-pointer"
          }
        >
          <IconModal
            isOpen={isOpen}
            closeModal={closeModal}
            handleDeleteBook={handleDeleteBook}
            selectedBook={selectedBook}
          />

          {/* <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Open 
        </button> */}

          <TrashIcon className="h-9 w-9 p-1 3xl:h-14 3xl:w-14 3xl:p-2" />
          <span className="scale-0 group-hover:scale-100 transition-all absolute top-1 right-12 bg-sky-950 p-1 rounded">
            {!deleting ? "Delete" : "Deleting"}
          </span>
        </div>
      )}

      {selectedBook?.userId != undefined && userId != selectedBook?.userId && (
        <div
          onClick={() => handleLikeBook(selectedBook?.id, userId)}
          className={
            selectedBook?.likedBy?.includes(userId)
              ? "group relative text-white rounded hover:cursor-pointer border-2 border-teal-500 bg-teal-500 "
              : "group relative text-white md:text-teal-500 border-2 rounded md:border-teal-500 hover:cursor-pointer  md:hover:bg-teal-500 bg-teal-500 md:hover:text-white md:bg-sky-950"
          }
        >
          <HandThumbUpIcon className="h-9 w-9 p-1 3xl:h-14 3xl:w-14 3xl:p-2" />
          <span className="scale-0 group-hover:scale-100 transition-all absolute top-1 right-12 bg-sky-950 p-1 rounded">
            {selectedBook?.likedBy?.includes(userId) ? "Liked" : "Like"}
          </span>
          {  selectedBook?.likedBy?.includes(userId) &&
          <span
            className={"absolute -top-3 -right-3 px-1  border-2  text-xs 3xl:text-lg 3xl:px-3 3xl:-top-5 3xl:-right-8 bg-teal-500  text-white rounded-full "
                
            }
          >
            {selectedBook?.likes || 0}
          </span>
}
        </div>
      )}

      <div
        onClick={() => {
          handleShareBook(selectedBook?.id, userId);
          setMessage({ text: "Sharing Links", type: "share" });
          setShow(true);
        }}
        className={
          selectedBook?.sharedBy?.includes(userId)
            ? "group relative text-white rounded hover:cursor-pointer border-2 border-indigo-500 bg-indigo-500"
            : "group relative text-white md:text-indigo-500 md:border-2 rounded md:border-indigo-500 hover:cursor-pointer md:hover:bg-indigo-500 bg-indigo-500 md:hover:text-white md:bg-slate-900"
        }
      >
        <ShareIcon className="h-9 w-9 p-1 3xl:h-14 3xl:w-14 3xl:p-2" />
        <span className="scale-0 group-hover:scale-100 transition-all absolute top-1 right-12 bg-sky-950 p-1 rounded">
          {selectedBook?.sharedBy?.includes(userId) ? "Shared" : "Share"}
        </span>
       { selectedBook?.sharedBy?.includes(userId) &&
        
        <span
          className={"absolute -top-3 -right-3 px-1  border-2  text-xs  3xl:text-lg 3xl:px-3 3xl:-top-5 3xl:-right-8 bg-indigo-500  text-white rounded-full"
              
          }
        >
          {selectedBook?.shares || 0}
        </span>
}
      </div>

      <div
        onClick={() => {
          setPage(lastPage);
          setMessage({ text: "Read 3 times", type: "info" });
        }}
        className={
          page != audioPages + 1
            ? "group relative text-white md:text-amber-500 md:border-2 rounded md:border-amber-500 hover:cursor-pointer md:hover:bg-amber-500 bg-amber-500 md:hover:text-white md:bg-sky-950"
            : "group relative text-white rounded hover:cursor-pointer border-2 border-amber-500 bg-amber-500"
        }
      >
        <EyeIcon className="h-9 w-9 p-1 3xl:h-14 3xl:w-14 3xl:p-2" />
        <span className="scale-0 group-hover:scale-100 transition-all absolute top-1 right-12 bg-sky-950 p-1 rounded">
          {page != audioPages + 1 ? "Reading" : "Reads"}
        </span>
      </div>

      {(selectedBook?.audioUrl || audio) && (
        <div
          onClick={() => {
            setPlaying(!playing);
            !playing ? audioRef?.current?.play() : audioRef?.current?.pause();
          }}
          className={
            !playing
              ? "group relative bg-gray-900 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded cursor-pointer"
              : "group relative bg-blue-600 border-2 border-blue-600 text-white rounded cursor-pointer"
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

          {playing ? (
            <SpeakerWaveIcon
              className="h-9 w-9 p-1 3xl:h-14 3xl:w-14 3xl:p-2"
              onClick={() => { setMessage({ text: "", type: "" }); setPage(audioPage)}}
            />
          ) : (
            <SpeakerXMarkIcon
              className="h-9 w-9 p-1 3xl:h-14 3xl:w-14 3xl:p-2"
              onClick={() => { setMessage({ text: "", type: "" }); setPage(audioPage)}}
            />
          )}
          <span className="scale-0 group-hover:scale-100 transition-all absolute top-1 right-12 bg-sky-950 p-1 rounded">
            {playing ? "Mute" : "Play"}
          </span>
        </div>
      )}
    </div>
  );
};
