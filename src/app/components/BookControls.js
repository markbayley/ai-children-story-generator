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
  processing,
}) => {
  const handlePage = (direction) => {
    let max = audioPages+1;
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
      setForceRerender((prevState) => !prevState); // Trigger re-render
      //setPlaying(true);
    }
  }, [audio, audioRef]);

  console.log("selectedBook.audioUrl", selectedBook?.audioUrl);
  console.log("audio", audio);
  console.log("audioRef", audioRef);
  // console.log("storyText", storyText)

  return (
    <div className="flex-1 flex items-center xl:py-4 2xl:py-6 2.5xl:py-8 3xl:p-8 ">
      <div className=" w-full flex items-end justify-between">
        <div className="relative w-1/2 flex justify-start items-end  rounded-full">
          {/* Audio player */}
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
         <div className="fade-in ">
            <audio
              ref={audioRef}
              controls
              controlsList="nofullscreen nodownload noremoteplayback noplaybackrate"
              src={audio}
              className={
                audio || selectedBook?.audioUrl && audioRef?.current?.duration > 0 
                  ? "h-9 2xl:h-10 2.5xl:h-14 3xl:h-16 w-52 md:w-80 2xl:w-96 2.5xl:w-[500px] shadow-md hover:shadow-lg hover:shadow-stone-800/50 shadow-stone-700/30 rounded-full"
                  : "hidden"
              }
             //style={{ height: "80px", border: "2px" }}
              key={forceRerender} // Add key to force re-render
              onLoadedMetadata={onLoadedMetadata}
              //className=" h-9 2xl:h-10 2.5xl:h-14 3xl:h-16 w-52 md:w-80 2xl:w-96 2.5xl:w-[500px] shadow-md hover:shadow-lg hover:shadow-stone-500/50 shadow-stone-500/30 rounded-full"
            />
            </div>
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
          {/* Generate audio button */}
          <button
            onClick={() => handleAudio(storyText, selectedBook?.id)}
            className={
              audio || selectedBook?.audioUrl && audioRef?.current?.duration > 0 || page == 0
                ? "hidden"
                : "p-1 2.5xl:px-1 3xl:pb-2 w-48  h-9 2xl:h-10 2.5xl:h-12 2.5xl:w-64 3xl:h-16 3xl:w-80 text-lg 2.5xl:text-2xl 3xl:text-3xl flex justify-evenly items-center  transition ease-in-out cursor-pointer bg-[#eac89e] hover:text-stone-600 shadow-md hover:shadow-lg hover:shadow-stone-800/50 shadow-stone-700/30 rounded-full"
            }
          >
            <span className="h-full flex items-center">
              {processing ? "Generating..." : "Generate Audio"}{" "}
              <SpeakerWaveIcon className="icon p-2" />
            </span>{" "}
           
          </button>
        </div>

        {/* Page turning controls */}
        <div className={"fade-in flex justify-end gap-2"}>
          <button onClick={() => handlePage("down")}>
            <ChevronLeftIcon className="icon  cursor-pointer rounded bg-[#eac89e] hover:text-stone-600  shadow-md hover:shadow-lg hover:shadow-stone-800/50 shadow-stone-800/30 rounded-tl-full rounded-bl-full" />
          </button>
          <button
            type="submit"
            className="icon   hidden sm:flex items-center justify-center font-semibold transition ease-in-out cursor-pointer bg-[#eac89e] rounded  shadow-md hover:shadow-lg hover:shadow-stone-800/50 shadow-stone-700/30"
          >
            {page}
          </button>

          <button onClick={() => handlePage("up")}>
            <ChevronRightIcon className="icon transition ease-in-out cursor-pointer rounded bg-[#eac89e] hover:text-stone-600  shadow-md hover:shadow-lg hover:shadow-stone-800/50 shadow-stone-700/30 rounded-tr-full rounded-br-full" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookControls;
