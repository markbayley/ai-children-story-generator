import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const BookControls = ({
  selectedBook,
  setPage,
  page,
  audio,
  audioRef,
  setPlaying,
  audioPages,
  onLoadedMetadata,
  playing,
  handleAudio,
  storyText,
  processing,
}) => {
  const handlePage = (direction) => {
    let max = audioPages + 1;
    let min = 0;

    if (direction === "down" && page > min) {
      setPage(page - 1);
    } else if (direction === "up" && page < max) {
      setPage(page + 1);
    }
  };

  const [forceRerender, setForceRerender] = useState(false);

  useEffect(() => {
    if (audio) {
      setForceRerender((prevState) => !prevState); // Trigger re-render
    }
  }, [audio, audioRef]);

  return (
    <div className="flex-1 xl:pt-6 2.5xl:pb-6 3xl:px-8">
      <div className=" w-full flex justify-between">
        {/* Audio player */}
        <div className="w-2/3">
          <div
            className="z-50 h-6 w-8 absolute left-3 bottom-2 cursor-pointer"
            onClick={() => {
              setPlaying(!playing);
              !playing ? audioRef?.current?.play() : audioRef?.current?.pause();
            }}
          ></div>

          <audio
            ref={audioRef}
            controls
            controlsList="nofullscreen nodownload noremoteplayback noplaybackrate"
            src={audio}
            className={
              audio ||
              (selectedBook?.audioUrl && audioRef?.current?.duration > 0)
                ? "w-full h-9 2xl:h-10 2.5xl:h-14 3xl:h-16 3xl:border-4 3xl:border-[#eac89e]  bg-[#eac89e] fade-in shadow-md hover:shadow-lg hover:shadow-stone-800/50 shadow-stone-700/30 rounded-full"
                : "hidden"
            }
            key={forceRerender} // Add key to force re-render
            onLoadedMetadata={onLoadedMetadata}
          />

          <div
            className="z-50 h-6 w-8 absolute right-3 bottom-2 cursor-pointer "
            onClick={() => {
              setPlaying(!playing);
              !playing ? audioRef?.current?.play() : audioRef?.current?.pause();
            }}
          ></div>

          {/* Generate audio button */}
          <button
            onClick={() => handleAudio(storyText, selectedBook?.id)}
            className={
              audio ||
              (selectedBook?.audioUrl && audioRef?.current?.duration > 0) ||
              page == 0
                ? "hidden"
                : "p-1 2.5xl:px-1 3xl:pb-2 w-48  h-9 2xl:h-10 2.5xl:h-12 2.5xl:w-64 3xl:h-16 3xl:w-80 text-lg 2.5xl:text-2xl 3xl:text-3xl  flex justify-evenly items-center  transition ease-in-out cursor-pointer bg-[#eac89e] hover:text-stone-600 shadow-md hover:shadow-lg hover:shadow-stone-800/50 shadow-stone-700/30 rounded-full"
            }
          >
            <span className="h-full flex items-center">
              {processing ? "Generating..." : "Generate Audio"}{" "}
              <SpeakerWaveIcon className="icon p-2" />
            </span>{" "}
          </button>
        </div>

        {/* Page turning controls */}
        <div className={"fade-in flex justify-end gap-2 w-1/3"}>
          <button onClick={() => handlePage("down")}>
            <ChevronLeftIcon className="icon  cursor-pointer rounded bg-[#eac89e] hover:text-stone-600  shadow-md hover:shadow-lg hover:shadow-stone-800/50 shadow-stone-800/30 rounded-tl-full rounded-bl-full" />
          </button>
          <button
            type="submit"
            className="icon hidden sm:flex items-center justify-center font-semibold transition ease-in-out cursor-pointer bg-[#eac89e]   shadow-md hover:shadow-lg hover:shadow-stone-800/50 shadow-stone-700/30"
          >
            {page}
          </button>

          <button onClick={() => handlePage("up")}>
            <ChevronRightIcon className="icon  transition ease-in-out cursor-pointer rounded bg-[#eac89e] hover:text-stone-600  shadow-md hover:shadow-lg hover:shadow-stone-800/50 shadow-stone-700/30 rounded-tr-full rounded-br-full" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookControls;
