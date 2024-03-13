import { TrashIcon } from "@heroicons/react/20/solid";
import {
  ArrowPathIcon,
  ArrowUpTrayIcon,
  EyeIcon,
  HandThumbUpIcon,
  ShareIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import IconModal from "./IconModal";
import { MdOutlineShare } from "react-icons/md";

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
  setAudioPage,
  handleViewBook,
  setOpen,
}) => {
  // Delete Modal
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  console.log(
    "playing",
    playing,
    "audioRef.current.paused",
    audioRef?.current?.paused
  );

  return (
    <div className="max-x-sm xl:right-0 xl:absolute flex xl:flex-col justify-start xl:justify-end items-center xl:h-[60vh]
     gap-4 px-2 pt-1 sm:gap-6 w-full xl:w-28 2xl:w-32 2.5xl:w-40 3xl:w-52 pb-4 ml-0 md:ml-2 text-sm">
      {audioRef?.current?.duration > 0 && (
        <div
          onClick={() => {
            setPlaying(!playing);
            !playing ? audioRef?.current?.play() : audioRef?.current?.pause();
          }}
          className={
            !playing
              ? "group relative xl:bg-sky-950 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded cursor-pointer"
              : "group relative bg-blue-600 border-2 border-blue-600 text-white rounded cursor-pointer"
          }
        >
          {playing ? (
            <SpeakerWaveIcon
              className="icon"
              onClick={() => {
                setMessage({ text: "", type: "" });
                setPage(audioPage);
              }}
            />
          ) : page == lastPage ? (
            <ArrowPathIcon
              className="icon"
              onClick={() => {
                setMessage({ text: "", type: "" });
                setPage(0);
                setAudioPage(0);
              }}
            />
          ) : (
            <SpeakerXMarkIcon
              className="icon"
              onClick={() => {
                setMessage({ text: "", type: "" });
                setPage(audioPage);
              }}
            />
          )}
          <span className="scale-0 group-hover:scale-100 transition-all absolute -top-10 -right-0 xl:top-1 xl:right-12 bg-sky-950 p-1 rounded">
            {playing ? "Mute" : "Play"}
          </span>
        </div>
      )}

      {unsaved && selectedBook?.id == undefined && (
        <div
          onClick={handleSaveBook}
          className={
            unsaved && processing
              ? "animate-pulse cursor-progress group relative text-white rounded border-2 border-rose-500 bg-rose-500"
              : unsaved
              ? "group relative max-w-xs border-2 border-rose-500 text-rose-500 text-sm bg-sky-950 hover:bg-rose-500 hover:text-white rounded shadow-lg cursor-pointer "
              : "group relative text-white rounded  border-2 border-rose-500 bg-rose-500 cursor-help"
          }
        >
          <ArrowUpTrayIcon className="icon" />
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
              ? "group relative xl:bg-sky-950 border-2 border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white rounded cursor-pointer"
              : "group relative bg-rose-500 border-2 border-rose-500 text-white rounded cursor-pointer"
          }
        >
          <IconModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            closeModal={closeModal}
            handleDeleteBook={handleDeleteBook}
            selectedBook={selectedBook}
            setPlaying={setPlaying}
            setAudioPage={setAudioPage}
            setPage={setPage}
            userId={userId}
            setOpen={setOpen}
            setMessage={setMessage}
          />

          {/* <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Open 
        </button> */}

          <TrashIcon className="icon" />
          <span className="scale-0 group-hover:scale-100 transition-all absolute -top-10 -right-2 xl:top-1 xl:right-12 bg-sky-950 p-1 rounded">
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
          <HandThumbUpIcon className="icon" />
          <span className="scale-0 group-hover:scale-100 transition-all absolute -top-10 -right-1 xl:top-1 xl:right-12 bg-sky-950 p-1 rounded">
            {selectedBook?.likedBy?.includes(userId) ? "Liked" : "Like"}
          </span>
          {selectedBook?.likes > 0 && (
            <span
              className={
                "absolute -top-3 -right-3 px-1 3xl:h-8 3xl:w-8 flex justify-center border-2 text-xs 3xl:text-lg 3xl:px-3 3xl:-top-5 3xl:-right-8 bg-teal-500  text-white rounded-full "
              }
            >
              {selectedBook?.likes || 0}
            </span>
          )}
        </div>
      )}

      {selectedBook?.id != undefined && (
        <div
          onClick={() => {
            handleShareBook(selectedBook?.id, userId);
            //setMessage({ text: "Sharing Links", type: "share" });
            //setShow(true);
          }}
          className={
            selectedBook?.sharedBy?.includes(userId)
              ? "group relative text-white rounded hover:cursor-pointer border-2 border-indigo-500 bg-indigo-500"
              : "group relative text-indigo-500 border-2 rounded border-indigo-500 hover:cursor-pointer hover:bg-indigo-500 hover:text-white xl:bg-sky-950"
          }
        >
          <ShareIcon className="icon" />
          <span className="scale-0 group-hover:scale-100 transition-all absolute -top-10 -right-1 xl:top-1 xl:right-12 bg-sky-950 p-1 rounded">
            {selectedBook?.sharedBy?.includes(userId) ? "Shared" : "Share"}
          </span>
          {selectedBook?.shares > 0 && (
            <span
              className={
                "absolute -top-3 -right-3 px-1 border-2 text-xs 3xl:text-lg 3xl:px-3 3xl:-top-5 3xl:-right-8 bg-indigo-500  text-white rounded-full"
              }
            >
              {selectedBook?.shares || 0}
            </span>
          )}
        </div>
      )}

      {selectedBook?.id != undefined && (
        <div
          onClick={() => {
            //handleViewBook(selectedBook?.id, userId)
            //setPage(audioPages + 1);
            setMessage({
              text: `Read  ${selectedBook.views}  times`,
              type: "view",
            });
          }}
          className={
            selectedBook?.views == 0
              ? "group relative  text-amber-500 border-2 rounded border-amber-500 hover:cursor-pointer hover:bg-amber-500 hover:text-white xl:bg-sky-950"
              : "group relative text-white rounded hover:cursor-pointer border-2 border-amber-500 bg-amber-500"
          }
        >
          <EyeIcon className="icon" />
          <span className="scale-0 group-hover:scale-100 transition-all absolute -top-10 -right-1 xl:top-1 xl:right-12 bg-sky-950 p-1 rounded">
            {page != audioPages + 1 ? "Views" : "Viewed"}
          </span>
          {/* {selectedBook?.viewedBy?.includes(userId) && ( */}
          <span
            className={
              "absolute -top-3 -right-3 px-1  border-2  text-xs  3xl:text-lg 3xl:px-3 3xl:-top-5 3xl:-right-8 bg-amber-500  text-white rounded-full"
            }
          >
            {selectedBook?.views || 0}
          </span>
          {/* )} */}
        </div>
      )}
    </div>
  );
};
