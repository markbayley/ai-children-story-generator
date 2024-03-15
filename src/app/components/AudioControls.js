import React, { useEffect, useState } from "react";
import IconModal from "./IconModal";
import {
  ArrowPathIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";

const AudioControls = ({
  playing,
  setPlaying,
  audio,
  audioRef,
  selectedBook,
  handleAudio,
  page,
  processing,
  onLoadedMetadata,
  unsaved,
  setAudioPage,
  lastPage,
  setMessage,
  audioPage,
  setPage,
}) => {
  const [forceRerender, setForceRerender] = useState(false);

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (audio) {
      setForceRerender((prevState) => !prevState); // Trigger re-render
      //setPlaying(true);
    }
  }, [audio, audioRef]);

  return (
    <div className="w-full px-2 xl:px-[40%] xl:absolute bottom-1 left-2 xl:left-0  xl:bottom-2 xl:h-12 z-50  flex xl:justify-center">
      {/* <div className=" h-9 "> */}
      {/* { playing && */}
      <>
        <div
          className="z-50 h-6 w-8 absolute left-3 bottom-2 cursor-pointer"
          onClick={() => {
            setPlaying(!playing);
            !playing ? audioRef?.current?.play() : audioRef?.current?.pause();
          }}
        ></div>

        <audio
          ref={audioRef}
         // controls
          controlsList="nofullscreen nodownload noremoteplayback noplaybackrate"
          src={audio}
          className={
            audio || (selectedBook?.audioUrl && audioRef?.current?.duration > 0 && playing)
              ? "w-full h-8   bg-blue-500 fade-in shadow-md hover:shadow-lg hover:shadow-stone-800/50 shadow-stone-700/30 rounded-full"
              : "hidden"
          }
          key={forceRerender} // Add key to force re-render
          onLoadedMetadata={onLoadedMetadata}
          //className=" h-9 2xl:h-10 2.5xl:h-14 3xl:h-16 3xl:border-4 3xl:border-[] shadow-md hover:shadow-lg hover:shadow-stone-500/50 shadow-stone-500/30 rounded-full"
        />

        {/* )} */}
        <div
          className="z-50 h-6 w-8 absolute right-3 bottom-2 cursor-pointer "
          onClick={() => {
            setPlaying(!playing);
            !playing ? audioRef?.current?.play() : audioRef?.current?.pause();
          }}
        ></div>
        </>
{/* } */}

        {/* Generate audio button */}
        {/* <button
        //onClick={() => handleAudio(storyText, selectedBook?.id)}
          onClick={openModal}
          className={
            audio || (selectedBook?.audioUrl && audioRef?.current?.duration > 0)
              ? "hidden"
              : "p-1 2.5xl:px-1 3xl:pb-2 w-48  h-9 2xl:h-10 2.5xl:h-12 2.5xl:w-64 3xl:h-16 3xl:w-80 text-lg 2.5xl:text-2xl 3xl:text-3xl  flex justify-evenly items-center  transition ease-in-out cursor-pointer bg-[#eac89e] hover:text-stone-600 shadow-md hover:shadow-lg hover:shadow-stone-800/50 shadow-stone-700/30 rounded-full"
          }
        >
          <span className="h-full flex items-center">
            {processing ? "Generating..." : "Generate Audio"}{" "}
            <SpeakerWaveIcon className="icon p-2" />
          </span>{" "}
        </button> */}


               {/* <button
       // onClick={() => handleAudio(storyText, selectedBook?.id)}
          onClick={openModal}
          className={
            audio || (selectedBook?.audioUrl && audioRef?.current?.duration > 0) || unsaved
              ? "hidden"
              : "z-50 group relative bg-blue-500 border-2 xl:border-4 border-blue-500 hover:bg-blue-400 hover:border-blue-400 text-white rounded-full cursor-pointer"
          }
        >
          <span className="h-full flex items-center px-2">
            {processing ? "Generating..." : "Generate Audio"}{" "}
         
            <SpeakerWaveIcon className="icon" />
          </span>{" "}
        </button> */}

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
        />
      {/* </div> */}
{/* 
      {audioRef?.current?.duration > 0 && (
        <div
          onClick={() => {
            setPlaying(!playing);
            !playing ? audioRef?.current?.play() : audioRef?.current?.pause();
          }}
          className={
            !playing
              ? "group relative border-4 border-blue-500 hover:border-blue-400 hover:bg-blue-400 bg-blue-500 text-white rounded-full cursor-pointer"
              : "group relative bg-blue-600 border-2 border-blue-600 text-white rounded-full cursor-pointer"
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
              className="icon "
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
      )} */}
    </div>
  );
};

export default AudioControls;
