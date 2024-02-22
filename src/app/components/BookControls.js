import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HandThumbUpIcon,
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
  audioPages
}) => {
  console.log("audioBC", selectedBook, "audio", audio, "audioRef", audioRef);

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

  // const getAudioPage = () => {
  //   console.log("audioPage",audioDuration/audioRef.currentTime)
  // }

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setAudioDuration(audioRef.current.duration);
      // getAudioPage()
      //setMessage({ text: audioRef?.current?.currentTime/audioDuration*audioPages, type: "create" });
      console.log("audioDuration", audioDuration)
      
    }
  };

  console.log("audioPage",  audioRef?.current?.currentTime/audioDuration*audioPages)
  console.log("audioTime",  audioRef?.current?.currentTime/audioDuration*audioPages)
  // const [isPaused, setIsPaused] = useState(false);

  // const handlePause = () => {
  //   const synth = window.speechSynthesis;

  //   synth.pause();

  //   setIsPaused(true);
  // };


  return (
    <div className="flex-1 flex mt-4">
      <div className="w-full flex items-end justify-between">
        <div onClick={() =>setPlaying(!playing)} className="w-2/3 flex justify-start items-end  mt-1 shadow-md rounded-full "> 
          {(selectedBook?.audioUrl || audio) &&
          <audio
            ref={audioRef}
            controls
            src={selectedBook?.audioUrl || audio}
            className="w-full"
            style={{ height: "40px", border: "2px" }}
            onLoadedMetadata={onLoadedMetadata}
            
          />
}
        </div>

        <div className="w-1/2 flex justify-end items-end gap-2">
          <button onClick={() => handlePage("down")} className="">
            <ChevronLeftIcon className="cursor-pointer h-10 w-10 p-1 border-2 rounded  border-stone-700 hover:bg-stone-700 hover:text-white shadow-md hover:shadow-lg hover:shadow-stone-500/50 shadow-stone-500/30 rounded-tl-full rounded-bl-full" />
          </button>
          <button
            type="submit"
            className="flex items-center justify-center font-bold transition ease-in-out cursor-pointer h-10 w-10 p-1 border-2 rounded border-stone-800 shadow-md hover:shadow-lg hover:shadow-stone-500/50 shadow-stone-500/30"
          >
            {page}
          </button>
         
          <button onClick={() => handlePage("up")} type="submit">
            <ChevronRightIcon className="transition ease-in-out cursor-pointer h-10 w-10 p-1 border-2 rounded border-stone-700  hover:bg-stone-700 hover:text-white shadow-md hover:shadow-lg hover:shadow-stone-500/50 shadow-stone-500/30 rounded-tr-full rounded-br-full" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookControls;

{
  /* {selectedBook?.userId !== userId &&
            selectedBook?.userId != undefined && (
              <button
                onClick={() => handleLikeBook(selectedBook?.id, userId)}
                className={
                  "flex relative px-4 py-2 mx-3 text-stone-950 rounded-full hover:bg-orange-400 shadow-lg border-2 bg-transparent border-stone-500 transition ease-in-out hover:scale-110 duration-300"
                }
              >
                <HandThumbUpIcon className="h-6 w-6 " />
                <span
                  className={
                    selectedBook?.likedBy?.includes(userId)
                      ? "absolute -top-3 -right-3 px-2 font-sans  text-sm bg-teal-500 border-2 border-teal-500 rounded-bl-xl text-white rounded-full"
                      : "absolute -top-3 -right-3 px-2 font-sans  text-sm bg-slate-700 border-2 border-teal-500 rounded-bl-xl text-teal-500 rounded-full"
                  }
                >
                  {selectedBook?.likes || 0}
                </span>
              </button>
            )} */
}
