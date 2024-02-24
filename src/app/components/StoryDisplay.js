"use client";
import {
  PauseIcon,
  PlayIcon,
  StopIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { BookIcons } from "./BookIcons";
import { BookImage } from "./BookImage";
import BookControls from "./BookControls";

import { useTts } from "tts-react";
//import { TTSHookProps } from "tts-react";
import React from "react";

import TextToSpeech from "./TextToSpeech";

export const StoryDisplay = ({
  storySelected,
  imagesSelected,
  page,
  setPage,
  audio,
  audioRef,
  storyUnsaved,
  imagesUnsaved,
  setOpen,
  handleSaveBook,
  dismiss,
  handleLikeBook,
  handleShareBook,
  selectedBook,
  userId,
  setMessage,
  extractTitleFromStory,
  loading,
  handleDeleteBook,
  unsaved,
  shared,
  setShared,
  show,
  setShow,
  theme,
  processing,
  deleting,
  playing,
  setPlaying,
  audioPages,
  setAudioPages,
  audioDuration,
  setAudioDuration,
}) => {
  const prepareText = (storyText) => {
    // Remove the title (assuming it's the first three words followed by two newlines)
    const titleEndIndex = storyText.indexOf("Once upon a time");
    const withoutTitle = storyText.substring(titleEndIndex);

   // const storyEndIndex = storyText.indexOf("~The End~");
    //const withoutEndTitle = storyText.substring(titleEndIndex, storyEndIndex);
    // Split into paragraphs
    return withoutTitle.split("\n\n");
  };

  const getStoryText = (storyText, currentPage) => {
    if (!storyText) return null;

    // Split the story into paragraphs
    const paragraphs = prepareText(storyText);

    //let paragraphLengths = paragraphs.forEach(paragraph => console.log(paragraph.length));

  //console.log(paragraphLengths)

    const lastPage = Math.round(paragraphs.length/3)+1
    //console.log("lastPage", lastPage)
    setAudioPages(lastPage-1)

    // Calculate the number of paragraphs per page 
    const paragraphsPerPage = 3;
    const startIndex = (currentPage - 1) * paragraphsPerPage;
    const endIndex = startIndex + paragraphsPerPage;

    // Slice the paragraphs for the current page
    const currentPageParagraphs = paragraphs.slice(startIndex, endIndex);

    if (currentPage == lastPage) {
      return (
        <div className="h-full flex items-center justify-center text-center mx-6 px-6 pb-20 ">
          <div className="text-2xl 2xl:text-3xl  font-antiqua">
            {selectedBook?.creatorPhotoURL && (
              <div className="w-full flex justify-center">
                <img
                  src={selectedBook?.creatorPhotoURL}
                  alt="profile-mini"
                  className="h-24 w-24 object-cover border-4 border-stone-700 m-[2px] rounded-full"
                />
                  
              </div>
            )}
            ~
            <p className={"text-2xl 3xl:text-4xl font-antiqua"}>
            

              {" "}
              This{" "}
              <span className="lowercase">
                {imagesUnsaved ? theme : selectedBook?.theme}
              </span>{" "}
              tale was created by&nbsp;
              {selectedBook?.creatorName ||
                selectedBook?.displayName ||
                "a mystery author"}
              .
            </p>
            <br />
            <p className={"text-2xl 3xl:text-4xl font-antiqua"}>
              If you enjoyed reading their story please give it a like now!{" "}
            </p>
            <br />
            <p className={"text-2xl 3xl:text-4xl font-antiqua"}>
             This story has been read 3 times today.{" "}
            </p>
          </div>
        </div>
      );
    }

    if (currentPage == 0) {
      return (
        <div className="flex flex-col justify-center items-center h-full px-6 pb-20">
          <h5 className={"text-2xl 3xl:text-4xl font-bold font-antiqua"}> The story of</h5>~
          <h1 className="text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-7xl font-bold capitalize font-antiqua pt-2 text-center">
            {storySelected
              ? extractTitleFromStory(storySelected)
              : storyUnsaved
              ? extractTitleFromStory(storyUnsaved)
              : // : story
                // ? extractTitleFromStory(story)
                "Once Upon A Time..."}
            <p
              className={
                "text-center xl:text-right text-xl 3xl:text-3xl font-bold font-antiqua lowercase"
              }
            >
              {" "}
              as told by{" "}
              <span className="capitalize">
                {selectedBook?.creatorName ||
                  selectedBook?.displayName ||
                 <span className="lowercase"> a mysterious author</span>}
              </span>
              .
            </p>
          </h1>
        </div>
      );
    }

    // Render each paragraph separately
    return (
      <div className="font-antiqua">
      
          {currentPageParagraphs.map((paragraph, index) => (
              <p
                key={index}
                style={{ textAlign: "justify", marginBottom: "1em" }}
              >
                {paragraph}
              </p>
            ))
          }
      </div>
    );
  };

  const Speak = ({ children, highlight = false }) => {
    const { ttsChildren, state, play, stop, pause } = useTts({
      children,
      markTextAsSpoken: highlight,
      markBackgroundColor: "rgb(254,215,170,0)",
      markColor: "orange",
      size: "large",
     //autoPlay: true
    });

    return (
      <div>
        {ttsChildren}
        {/* <div className="flex gap-2 fixed z-20">
          <button disabled={state.isPlaying} onClick={play}>
            {" "}
            <PlayIcon className="cursor-pointer h-12 w-12 border-2 rounded p-3 border-stone-800 shadow-md hover:shadow-lg hover:shadow-indigo-500/50 shadow-indigo-500/30" />
          </button>
          <button disabled={!state.isPlaying} onClick={pause}>
            {" "}
            <PauseIcon className="cursor-pointer h-12 w-12 border-2 rounded p-3 border-stone-800 shadow-md hover:shadow-lg hover:shadow-indigo-500/50 shadow-indigo-500/30" />
          </button>
          <button onClick={stop}>
            {" "}
            <StopIcon className="cursor-pointer h-12 w-12 border-2 rounded p-3 border-stone-800 shadow-md hover:shadow-lg hover:shadow-indigo-500/50 shadow-indigo-500/30 " />
          </button>
        </div> */}
      </div>
    );
  };

  const text = getStoryText(storySelected || storyUnsaved, page);
  // console.log("text", text.props.children[0].props.children);

  return (
    <>
      <BookIcons
        handleDeleteBook={handleDeleteBook}
        handleSaveBook={handleSaveBook}
        handleLikeBook={handleLikeBook}
        dismiss={dismiss}
        unsaved={unsaved}
        selectedBook={selectedBook}
        page={page}
        setPage={setPage}
        setMessage={setMessage}
        setShow={setShow}
        userId={userId}
        show={show}
        audio={audio}
        audioRef={audioRef}
        processing={processing}
        deleting={deleting}
        playing={playing}
        setPlaying={setPlaying}
        audioPages={audioPages}
        handleShareBook={handleShareBook}
      />

      <div className="fade-in 3xl:pt-12">
        <div className=" border-r sm:border-l-1 sm:rounded-xl bg-orange-200 xl:bg-gradient-to-r from-orange-200 from-20% via-stone-700 via-50% to-orange-200 to-80% ...">
          <div className="sm:border-r-2 sm:border-l-1 sm:rounded-xl sm:border-stone-800 mx-auto xl:flex border xl:h-[87vh] 3xl:h-[80vh]">
            <BookImage
              imagesSelected={imagesSelected}
              page={page}
              imagesUnsaved={imagesUnsaved}
              selectedBook={selectedBook}
            />
            {/* Text Section */}
            <div
              //overflow-y-hidden
              className="flex flex-col w-full xl:w-1/2 p-4 xl:px-10 xl:pt-11 xl:pb-4 xl:bg-gradient-to-r from-stone-700 from-0% via-orange-200 via-15%  to-orange-200 to-100% ...
                sm:rounded xl:rounded-xl xl:border xl:rounded-tr-lg xl:rounded-br-lg xl:border-l-4 xl:border-stone-700  text-stone-900"
            >
              <div className="relative flex justify-end items-start text-stone-900">
                <button
                  onClick={() => {
                    setOpen(false);
                    setMessage("");
                    setPlaying(false)
                  }}
                  className="absolute -top-8 xl:-right-8 w-12 hover:text-orange-500 text-center z-10"
                >
                  <XMarkIcon className="h-6 w-12 3xl:h-9 3xl:w-12" />
                </button>
              </div>

              <div className="h-full text-stone-900  text-2xl xl:text-xl 2xl:text-2xl 3xl:text-4xl  3xl:p-10 w-full no-scrollbar overflow-y-auto">
                {!storySelected && !storyUnsaved && !loading ? (
                  <div className="flex justify-center items-center h-full italic text-[20px] text-center font-antiqua">
                    Please click on a story or create a new story to start
                    reading here.
                  </div>
                ) : (
                  // <Speak highlight>
                  
                  //   <>{getStoryText(storySelected || storyUnsaved, page) }</>
                  // </Speak>
                  getStoryText(storySelected || storyUnsaved, page)
                 
                )}
              </div>
              {/* <TextToSpeech text={text.props.children[0].props.children} /> */}
              <BookControls
                selectedBook={selectedBook}
                userId={userId}
                setPage={setPage}
                audio={audio}
                audioRef={audioRef}
                page={page}
                handleLikeBook={handleLikeBook}
                setPlaying={setPlaying}
                setAudioDuration={setAudioDuration}
                audioDuration={audioDuration}
                setMessage={setMessage}
                audioPages={audioPages}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
