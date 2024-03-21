import {
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShareIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import IconModal from "./IconModal";
import { useState } from "react";

export const PageControls = ({
  page,
  setPage,
  audioPages,
  setAudioPage,
  setPlaying,
  playing,
  audioRef,
  lastPage,
  setMessage,
  audioPage,
  selectedBook,
  storyText,
  handleAudio,
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

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);

  }

  // const functionCall = handleAudio(storyText, selectedBook?.id)

  return (
    <div className="flex justify-between xl:items-center xl:absolute xl:flex-col xl:justify-center xl:h-[90vh] z-40 
      xl:right-0 gap-6 xl:gap-8 mx-2 md:mx-4 xl:mx-0 xl:w-28 2xl:w-32 2.5xl:w-40 3xl:w-52 pb-2 xl:pb-0
      ">
           <div
        onClick={() => {
          setPlaying(!playing);
          !playing ? audioRef?.current?.play() : audioRef?.current?.pause();
        }}
        className={
          isNaN(audioRef?.current?.duration)
            ? "group relative border-2 xl:border-4 ml-1 border-rose-600 hover:border-stone-500 hover:bg-stone-500 bg-rose-600 text-white rounded-full cursor-pointer shadow-xl hover:shadow-lg hover:shadow-stone-800/50 shadow-stone-950/30 "
            : !playing
            ? "group relative border-2 xl:border-4 ml-1 border-blue-500 hover:border-blue-400 hover:bg-blue-400 bg-blue-500 text-white rounded-full cursor-pointer"
            : "group relative border-2 xl:border-4 ml-1 bg-blue-600 border-blue-600 text-white rounded-full cursor-pointer"
        }
      >
        {isNaN(audioRef?.current?.duration) ? (
          <SpeakerWaveIcon
            className="icon"
            onClick={openModal}
          />
        ) : playing ? (
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
            className="icon "
            onClick={() => {
              setMessage({ text: "", type: "" });
              setPage(audioPage);
            }}
          />
        )}
        <span className="scale-0 group-hover:scale-100 transition-all text-xs 2.5xl:text-lg absolute -top-10 -left-1 xl:top-1 xl:-left-12 2.5xl:-left-16 2.5xl:top-3 bg-sky-950 p-1 rounded">
          {isNaN(audioRef?.current?.duration) ? "Audio" : playing ? "Mute" : "Play"}
        </span>
      </div>
     
     
     
      <button
        onClick={() => handlePage("down")}
        className={ page == 0 ? "border-2 rounded-tl-full rounded-bl-full transition ease-in-out cursor-pointer border-stone-600 hover:cursor-pointer bg-stone-600  text-white"
        : "border-2 rounded-tl-full rounded-bl-full transition ease-in-out cursor-pointer   border-amber-500 hover:cursor-pointer bg-amber-500 hover:bg-amber-400 text-white "}
      >
        <ChevronLeftIcon className="icon  shadow-md hover:shadow-lg hover:shadow-stone-800/50 shadow-stone-800/30 rounded-tl-full rounded-bl-full " />
      </button>

      <div
        className={
          "group relative text-white  border-2 rounded border-amber-500 hover:cursor-pointer bg-amber-500  "
        }
      >
        <div className="icon flex items-center justify-center  ">{page}</div>
        <span className="text-white scale-0 group-hover:scale-100 transition-all text-xs 2.5xl:text-lg absolute -top-10 -left-1 xl:top-1 xl:-left-12 2.5xl:-left-16 2.5xl:top-3 bg-sky-950 p-1 rounded">
          Page
        </span>
      </div>

      <button
        onClick={() => handlePage("up")}
        className={ page == lastPage ? "border-2 rounded-tr-full rounded-br-full  transition ease-in-out cursor-pointer rounded  border-stone-600 hover:cursor-pointer bg-stone-600  text-white"
       :  "border-2 rounded-tr-full rounded-br-full transition ease-in-out cursor-pointer rounded  border-amber-500 hover:cursor-pointer bg-amber-500 hover:bg-amber-400 text-white" }
      >
        <ChevronRightIcon className="icon  shadow-md hover:shadow-lg hover:shadow-stone-800/50 shadow-stone-700/30 rounded-tr-full rounded-br-full" />
      </button>


      <IconModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          closeModal={closeModal}
          heading={"Generate Audio?"}
          subheading={
            "Listen to you favourite stories while you read with a natural and expressive sounding AI generated voice narration."
          }
          button1={"Ok, Let's Go!"}
          button2={"Wait! Go back."}
          selectedBook={selectedBook}
          setPlaying={setPlaying}
          setAudioPage={setAudioPage}
          setPage={setPage}
          setMessage={setMessage}
          handleAudio={handleAudio}
          storyText={storyText}
          id="Audio"
         
        />
    </div>
  );
};
