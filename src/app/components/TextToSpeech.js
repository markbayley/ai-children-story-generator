import { PauseIcon, PlayIcon, StopIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();

    setUtterance(u);
    setVoice(voices[1]);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    } else {
      utterance.voice = voice;
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = volume;
      synth.speak(utterance);
    }

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  return (
    <div className="flex items-center">
      <div className="flex gap-2 fixed z-20">

        
        <button onClick={handlePlay} className="hover:bg-stone-800 hover:text-white rounded ">
          {" "}
          <PlayIcon className="cursor-pointer h-12 w-12 p-3 border-2 rounded border-stone-800 shadow-md hover:shadow-lg hover:shadow-indigo-500/50 shadow-indigo-500/30" />
        </button>
        <button onClick={handlePause}>
          {" "}
          <PauseIcon className="cursor-pointer h-12 w-12 border-2 rounded p-3 border-stone-800 shadow-md hover:shadow-lg hover:shadow-indigo-500/50 shadow-indigo-500/30" />
        </button>
        <button onClick={handleStop}>
          {" "}
          <StopIcon className="cursor-pointer h-12 w-12 border-2 rounded p-3 border-stone-800 shadow-md hover:shadow-lg hover:shadow-indigo-500/50 shadow-indigo-500/30 " />
        </button>
      </div>
    </div>
  );
};

export default TextToSpeech;


//STORYDISPLAY
// import { useTts } from "tts-react";
// import { TTSHookProps } from "tts-react";
// import React from "react";

// import TextToSpeech from "./TextToSpeech";



{/* <div className="h-full text-stone-900 pr-4 lg:pr-0 text-2xl xl:text-xl 2xl:text-3xl pt-3  w-full  no-scrollbar overflow-y-auto">
{!storySelected && !storyUnsaved && !loading ? (
  <div className="flex justify-center items-center h-full italic text-center font-antiqua">
    Please click on a story or create a new story to start
    reading here.
  </div>
) : (
  <Speak highlight>
    <div className="rounded-full">{text}</div>
  </Speak>
)}
</div>
<TextToSpeech text={text.props.children[0].props.children} /> */}

// const Speak = ({ children, highlight = false }) => {
//     const { ttsChildren, state, play, stop, pause } = useTts({
//       children,
//       markTextAsSpoken: highlight,
//       markBackgroundColor: "rgb(254,215,170,0)",
//       markColor: "orange",
//       size: "large",
//     });

//     return (
//       <div>
//         {ttsChildren}
//         <div className="flex gap-2 fixed z-20">
//           <button disabled={state.isPlaying} onClick={play}>
//             {" "}
//             <PlayIcon className="cursor-pointer h-12 w-12 border-2 rounded p-3 border-stone-800 shadow-md hover:shadow-lg hover:shadow-indigo-500/50 shadow-indigo-500/30" />
//           </button>
//           <button disabled={!state.isPlaying} onClick={pause}>
//             {" "}
//             <PauseIcon className="cursor-pointer h-12 w-12 border-2 rounded p-3 border-stone-800 shadow-md hover:shadow-lg hover:shadow-indigo-500/50 shadow-indigo-500/30" />
//           </button>
//           <button onClick={stop}>
//             {" "}
//             <StopIcon className="cursor-pointer h-12 w-12 border-2 rounded p-3 border-stone-800 shadow-md hover:shadow-lg hover:shadow-indigo-500/50 shadow-indigo-500/30 " />
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const text = getStoryText(storySelected || storyUnsaved, page);
//   console.log("text", text.props.children[0].props.children);


//BOOKCONTROLS
// const handlePage = (direction) => {
//     let max = 6;
//     let min = 0;
//     const audio = audioRef?.current;
    
//     if (direction === "down" && page > min) {
//       setPage(page - 1);
//       audio.currentTime = page * 35;
//     } else if (direction === "up" && page < max) {
//       setPage(page + 1);
//       if (page == 0){
//         return
//       } else {
//         audio.currentTime = page * 35;
//       }
      
//     }
//   };

// const onLoadedMetadata = () => {
//     if (audioRef.current) {
//         console.log(audioRef.current.duration);
//     }
// };

{/* <div className="flex gap-2 fixed z-20">
<button
  onClick={() => handlePage("down")}
  className=""
>
  <ChevronLeftIcon className="cursor-pointer h-12 w-12 border-2 rounded p-3 border-stone-800 shadow-md hover:shadow-lg hover:shadow-indigo-500/50 shadow-indigo-500/30" />
</button>

<button
  type="submit"
  className="transition ease-in-out cursor-pointer h-12 w-12 border-2 rounded p-3 border-stone-800 shadow-md hover:shadow-lg hover:shadow-indigo-500/50 shadow-indigo-500/30"
>
  {page}
</button>
<button
  onClick={() => handlePage("up")}
  type="submit"
 
>
  <ChevronRightIcon  className="transition ease-in-out cursor-pointer h-12 w-12 border-2 rounded p-3 border-stone-800 shadow-md hover:shadow-lg hover:shadow-indigo-500/50 shadow-indigo-500/30 rounded-tr-full rounded-br-full" />
</button>
</div> */}
