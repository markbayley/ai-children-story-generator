import Image from 'next/image'
import React from 'react'
import InfoIcon from "/public/InfoIcon.svg";
import CloseIcon from "/public/CloseIcon.svg";

export const MessageFeature = ({message, setMessage, selectedBook, audioRef, playing, audioPage, audioPages, page}) => {

    const messageColor = (type) => {
        switch (type) {
          case "save":
            return "fade-in bg-gradient-to-r from-rose-500/10 to-rose-500";
          case "delete":
            return "fade-in bg-gradient-to-r from-rose-500/10 to-rose-500";
          case "error":
            return "fade-in bg-gradient-to-r from-rose-500/10 to-rose-500";
          case "like":
            return "fade-in bg-gradient-to-r from-teal-500/10 to-teal-500";
          case "view":
            return "fade-in bg-gradient-to-r from-amber-500/10 via-amber-500/75 to-amber-500";
          case "share":
            return "fade-in bg-gradient-to-r from-indigo-500/10 to-indigo-500";
          case "create":
            return "fade-in bg-gradient-to-r from-amber-500/10 via-amber-500/75 to-amber-500";
          default:
            return "fade-in bg-gradient-to-r from-indigo-500/10 to-indigo-500"; // Default color
        }
      };

  return (
       
          <div className="absolute top-4 left-4 text-white flex justify-start md:w-1/3 h-11">
          {message && message.text != "" ? (
            <div
              onClick={() => setMessage({ text: "", type: "" })}
              className={`fade-in transition-all pr-8 flex relative items-center text-sm md:text-[16px] cursor-pointer  hover:bg-gray-700 ${messageColor(
                message.type
              )} rounded-full rounded-tl-lg shadow-lg `}
            >
              <Image
                src={InfoIcon}
                alt="info-icon"
                className="h-6 aspect-square mx-2 3xl:h-9 3xl:w-9"
              />{" "}
              <span className="text-sm font-semibold 3xl:text-xl 3xl:p-4">
                {message.text}
              </span>
              <Image
                src={CloseIcon}
                alt="close-icon"
                className="h-4 aspect-square absolute top-1 right-2 3xl:h-6 3xl:w-6 mr-1"
              />
            </div>
          ) : (selectedBook?.audioUrl || audio) && audioRef?.current?.duration > 0 && open ? (
            <div
              // onClick={() => setMessage({ text: "", type: "" })}
              className={`fade-in pr-8 flex relative items-center text-sm md:text-[16px] cursor-pointer bg-gradient-to-r from-sky-950 to-blue-600 text-white hover:bg-sky-900 rounded-full rounded-tl-lg `}
            >
              <Image
                src={InfoIcon}
                alt="info-icon"
                className="h-6 w-6 mx-2 3xl:h-9 3xl:w-9"
              />{" "}
              {/* //selectedBook?.audioUrl == undefined ? "No Audio" : */}
              <span className="text-sm font-semibold 3xl:text-xl 3xl:py-4 text-left ">
                {playing
                  ? "Playing Page " + audioPage
                  : page == audioPages + 1
                  ? "Story Finished!"
                  : "Audio Paused"}
              </span>
              <Image
                src={CloseIcon}
                alt="close-icon"
                className="h-4 w-4 absolute top-1 right-2 3xl:h-6 3xl:w-6 mr-1"
              />
            </div>
          ) : (
            ""
          )}
        </div>
  )
}

