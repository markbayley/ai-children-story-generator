import { SpeakerWaveIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react'

const AudioControls = ({playing, setPlaying, audio, audioRef, selectedBook, handleAudio, storyText, page, processing, onLoadedMetadata}) => {

    const [forceRerender, setForceRerender] = useState(false);

  useEffect(() => {
    if (audio) {
      setForceRerender((prevState) => !prevState); // Trigger re-render
      //setPlaying(true);
    }
  }, [audio, audioRef]);


  return (
    <div className="absolute bottom-2 z-50 w-[85vw] flex justify-center">
        <div className="w-1/4 h-14">
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
       // controls
        controlsList="nofullscreen nodownload noremoteplayback noplaybackrate"
        src={audio}
        className={
          audio ||
          (selectedBook?.audioUrl && audioRef?.current?.duration > 0)
            ? "w-full h-9 2xl:h-12 2.5xl:h-14 3xl:h-16 border-2 border-white  bg-blue-500 fade-in shadow-md hover:shadow-lg hover:shadow-stone-800/50 shadow-stone-700/30 rounded-full"
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
        !playing
          ? audioRef?.current?.play()
          : audioRef?.current?.pause();
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
  </div>
  )
}

export default AudioControls