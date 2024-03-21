import React, { useEffect, useState } from "react";
import IconModal from "./IconModal";

const AudioControls = ({
  playing,
  setPlaying,
  audio,
  audioRef,
  selectedBook,
  onLoadedMetadata,
  setAudioPage,
  setMessage,
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
      setForceRerender((prevState) => !prevState);
    }
  }, [audio, audioRef]);

  return (
    <div className="w-full px-2 xl:px-[40%] xl:absolute bottom-1 left-2 xl:left-0  xl:bottom-2 xl:h-12 z-50  flex xl:justify-center">
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
            audio ||
            (selectedBook?.audioUrl &&
              audioRef?.current?.duration > 0 &&
              playing)
              ? "w-full h-8   bg-blue-500 fade-in shadow-md hover:shadow-lg hover:shadow-stone-800/50 shadow-stone-700/30 rounded-full"
              : "hidden"
          }
          key={forceRerender}
          onLoadedMetadata={onLoadedMetadata}
        />
        <div
          className="z-50 h-6 w-8 absolute right-3 bottom-2 cursor-pointer "
          onClick={() => {
            setPlaying(!playing);
            !playing ? audioRef?.current?.play() : audioRef?.current?.pause();
          }}
        ></div>
      </>

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
    </div>
  );
};

export default AudioControls;
