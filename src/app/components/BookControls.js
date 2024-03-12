import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HandThumbUpIcon,
  PlayIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

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
  handleAudio,
  storyText,
  processing
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

  const [forceRerender, setForceRerender] = useState(false);

  useEffect(() => {
    if (audio) {
      // Audio blob is available, update UI to display audio controls
      // You can also auto-play the audio here if needed
      setForceRerender(prevState => !prevState); // Trigger re-render
      //setPlaying(true);
    }
  }, [audio, audioRef]);

  console.log("selectedBook.audioUrl", selectedBook?.audioUrl);
  console.log("audio", audio);
  console.log("audioRef", audioRef);
  // console.log("storyText", storyText)

  return (
    <div className="flex-1 flex items-center 3xl:p-8 3xl:mb-2">
      <div className=" w-full flex items-end justify-between">
        <div className="relative w-2/3 flex justify-start items-end mt-2 rounded-full">

      


          <>
            <div
              className="z-50 h-6 w-8 absolute left-3 bottom-2 cursor-pointer"
              onClick={() => {
                setPlaying(!playing);
                !playing
                  ? audioRef?.current?.play()
                  : audioRef?.current?.pause();
              }}
            ></div>
      
                <audio
              ref={audioRef}
              controls
              controlsList="nofullscreen nodownload noremoteplayback noplaybackrate"
              src={audio}
              className={audioRef?.current?.duration > 0 ? "fade-in w-full h-10 3xl:h-16" : "hidden"}
              style={{ height: "40px", border: "2px" }}
              key={forceRerender} // Add key to force re-render
              onLoadedMetadata={onLoadedMetadata}
              //className="shadow-md hover:shadow-lg hover:shadow-stone-500/50 shadow-stone-500/30 rounded-full"
            />
            {/* )} */}
            <div
              className="z-50 h-6 w-8 absolute right-3 bottom-2 cursor-pointer "
              onClick={() => {
                setPlaying(!playing);
                !playing
                  ? audioRef?.current?.play()
                  : audioRef?.current?.pause();
              }}
            ></div>
          </>
          <button
            onClick={() => handleAudio(storyText, selectedBook?.id)}
            className={
              audioRef?.current?.duration > 0 || page == 0
                ? "hidden"
                : "flex justify-evenly items-center font-medium transition ease-in-out cursor-pointer pb-[5px] w-44 h-10 3xl:h-16 3xl:w-48 p-1 bg-[#eac89e]    hover:text-stone-600 shadow-md hover:shadow-lg hover:shadow-stone-500/50 shadow-stone-500/30 rounded-full"
            }
          >
            <span className="">{ processing ? "Generating..." : "Generate Audio" } </span>{" "}
            <SpeakerWaveIcon className="max-w-xs h-7 w-7 pt-[2px] 2.5xl:h-12 2.5xl:w-12 3xl:h-14 3xl:w-14 3xl:p-2" />
          </button>

      
        </div>

        <div className={"fade-in flex justify-end gap-2"}>
    




          <button onClick={() => handlePage("down")}>
            <ChevronLeftIcon className="cursor-pointer h-10 w-9 3xl:h-14 3xl:w-14 p-1 rounded bg-[#eac89e]  hover:text-stone-600  shadow-md hover:shadow-lg hover:shadow-stone-500/50 shadow-stone-500/30 rounded-tl-full rounded-bl-full" />
          </button>
          <button
            type="submit"
            className="hidden sm:flex items-center justify-center font-bold transition ease-in-out cursor-pointer h-10 w-9 3xl:h-14 3xl:w-14  3xl:text-2xl p-1 bg-[#eac89e] rounded  shadow-md hover:shadow-lg hover:shadow-stone-500/50 shadow-stone-500/30"
          >
            {page}
          </button>

          <button onClick={() => handlePage("up")}>
            <ChevronRightIcon className="transition ease-in-out cursor-pointer h-10 w-9 3xl:h-14 3xl:w-14 p-1  rounded bg-[#eac89e] hover:text-stone-600  shadow-md hover:shadow-lg hover:shadow-stone-500/50 shadow-stone-500/30 rounded-tr-full rounded-br-full" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookControls;
