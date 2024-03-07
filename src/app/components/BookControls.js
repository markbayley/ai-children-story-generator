import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HandThumbUpIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const BookControls = ({
  selectedBook,
  userId,
  setPage,
  page,
  audio,
  audioRef,
  handleLikeBook,
  setPlaying,
  setAudioDuration,
  audioDuration,
  setMessage,
  audioPages,
  onLoadedMetadata,
  playing,
}) => {
  const handlePage = (direction) => {
    let max = 6;
    let min = 0;
    // const audio = audioRef?.current;

    if (direction === "down" && page > min) {
      setPage(page - 1);
      //audio.currentTime = page * 35;
    } else if (direction === "up" && page < max) {
      setPage(page + 1);
      // if (page == 0) {
      //   return;
      // } else {
      //   audio.currentTime = page * 35;
      // }
    }
  };

  // console.log("audioRefBC", audioRef);
  // console.log("audioRef.currentBC", audioRef?.current);
  // console.log("selectedBook.audioUrlBC", selectedBook?.audioUrl);
  // console.log("playingBC", playing);
  // console.log("audioBC", audio);

  // const audioPage = audioRef?.current?.currentTime/audioDuration*audioPages
  // const audioTime =  audioRef?.current?.currentTime/audioDuration*audioPages
  // const audioPage =  Math.round(
  //   (audioRef?.current?.currentTime /
  //     audioRef?.current?.duration) *
  //     audioPages
  // )

  console.log("selectedBook.audioUrl", selectedBook?.audioUrl);
  console.log("audio", audioRef);

  return (
    <div className="flex-1 flex items-center 3xl:p-8 3xl:mb-2">
      <div className=" w-full flex items-end justify-between">
        <div className="relative w-2/3 flex justify-start items-end mt-2 rounded-full">
          <div className="z-50 h-6 w-8 absolute left-3 bottom-2 cursor-pointer"  onClick={() => {
                setPlaying(!playing);
                !playing ? audioRef?.current?.play() : audioRef?.current?.pause();
              }}></div>
          {(selectedBook?.audioUrl || audio) && (
            <audio
              ref={audioRef}
              controls
              controlsList="nofullscreen nodownload noremoteplayback noplaybackrate"
              src={selectedBook?.audioUrl || audio}
              className="w-full h-10 3xl:h-16"
              //style={{ height: "40px", border: "2px" }}
              onLoadedMetadata={onLoadedMetadata}
            />
          )}
             <div className="z-50 h-6 w-8 absolute right-3 bottom-2 cursor-pointer"  onClick={() => {
                setPlaying(!playing);
                !playing ? audioRef?.current?.play() : audioRef?.current?.pause();
              }}></div>
        </div>

        <div className=" flex justify-end gap-2 ">
          <button onClick={() => handlePage("down")}>
            <ChevronLeftIcon className="cursor-pointer h-9 w-9 3xl:h-14 3xl:w-14 p-1 border-2 rounded  border-stone-700 hover:bg-stone-700 hover:text-white shadow-md hover:shadow-lg hover:shadow-stone-500/50 shadow-stone-500/30 rounded-tl-full rounded-bl-full" />
          </button>
          <button
            type="submit"
            className="hidden sm:flex items-center justify-center font-bold transition ease-in-out cursor-pointer h-9 w-9 3xl:h-14 3xl:w-14  3xl:text-2xl p-1 border-2 rounded border-stone-800 shadow-md hover:shadow-lg hover:shadow-stone-500/50 shadow-stone-500/30"
          >
            {page}
          </button>

          <button onClick={() => handlePage("up")}>
            <ChevronRightIcon className="transition ease-in-out cursor-pointer h-9 w-9 3xl:h-14 3xl:w-14 p-1 border-2 rounded border-stone-700  hover:bg-stone-700 hover:text-white shadow-md hover:shadow-lg hover:shadow-stone-500/50 shadow-stone-500/30 rounded-tr-full rounded-br-full" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookControls;
