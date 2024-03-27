import {
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import IconModal from "./IconModal";
import { useEffect, useState } from "react";

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
  userId,
  handleViewBook
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

  // useEffect(() => {
  //   if (page == audioPages + 1) {
  //     console.log("lastPage", selectedBook?.id, userId)
  //      handleViewBook(selectedBook?.id, userId)
  //   }
  // }, [page]);


  return (
    <div
      className="flex justify-between xl:items-center xl:absolute xl:flex-col xl:justify-center xl:h-[90vh] z-20 
      xl:right-0 gap-6 xl:gap-8 mx-2 md:mx-4 xl:mx-0 xl:w-28 2xl:w-32 2.5xl:w-40 3xl:w-52 pb-2 xl:pb-0
      "
    >
      <div
        onClick={() => {
          setPlaying(!playing);
          !playing ? audioRef?.current?.play() : audioRef?.current?.pause();
        }}
        className={
          isNaN(audioRef?.current?.duration)
            ? "group relative border-2 xl:p-1 ml-1 border-rose-500 hover:border-rose-500 hover:bg-rose-500 bg-sky-950 hover:text-white text-rose-500 rounded-full cursor-pointer shadow-xl hover:shadow-lg hover:shadow-stone-800/50 shadow-stone-950/30 "
            : !playing
            ? "group relative border-2 xl:p-1 ml-1 bg-sky-950 border-lime-500 hover:border-lime-500 hover:bg-lime-600  text-lime-500 hover:text-white rounded-full cursor-pointer"
            : "group relative border-2 xl:p-1 ml-1 bg-lime-600 border-lime-600 text-white rounded-full cursor-pointer"
        }
      >
        {isNaN(audioRef?.current?.duration) ? (
          <SpeakerWaveIcon className="icon" onClick={openModal} />
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
        <span className="scale-0 group-hover:scale-100 transition-all text-xs 2.5xl:text-md 3xl:text-lg absolute -top-10  xl:top-2 xl:-left-10 2.5xl:-left-10 3xl:-left-14 2.5xl:top-3 bg-sky-950 p-1 rounded">
          {isNaN(audioRef?.current?.duration)
            ? "Audio"
            : playing
            ? "Mute"
            : "Play"}
        </span>
      </div>

      <button
        onClick={() => handlePage("down")}
        className={
          page == 0
            ? "rounded-tl-full rounded-bl-full transition ease-in-out cursor-pointer border-2 border-sky-900 hover:border-sky-800 hover:cursor-pointer bg-sky-900 hover:bg-sky-800 text-white "
            : "border-2 rounded-tl-full rounded-bl-full transition ease-in-out cursor-pointer   border-amber-500 hover:cursor-pointer bg-amber-500 hover:bg-amber-400 text-white "
        }
      >
        <ChevronLeftIcon className="icon  shadow-md hover:shadow-lg hover:shadow-stone-800/50 shadow-stone-800/30 rounded-tl-full rounded-bl-full " />
      </button>

      <div
        className={
          "group relative text-white  border-2 rounded border-amber-500 hover:cursor-pointer bg-amber-500  "
        }
      >
        <div className="icon flex items-center justify-center  ">{page}</div>
        <span className="scale-0 group-hover:scale-100 transition-all text-xs 2.5xl:text-md 3xl:text-lg absolute -top-10  xl:top-2 xl:-left-12 2.5xl:-left-10 3xl:-left-14 2.5xl:top-3 bg-sky-950 p-1 rounded">
          Page
        </span>
      </div>

      <button
        onClick={() => handlePage("up")}
        className={
          page == lastPage
            ? "rounded-tr-full rounded-br-full transition ease-in-out cursor-pointer border-2 border-sky-900 hover:border-sky-800 hover:cursor-pointer bg-sky-900 hover:bg-sky-800 text-white"
            : "border-2 rounded-tr-full rounded-br-full transition ease-in-out cursor-pointer rounded  border-amber-500 hover:cursor-pointer bg-amber-500 hover:bg-amber-400 text-white"
        }
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
