import React, { useEffect, useState } from "react";
import { BookIcons } from "./BookIcons";
import { BookImage } from "./BookImage";
import BookControls from "./BookControls";
import {
  PauseIcon,
  PlayIcon,
  StopIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

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
  audioPage,
  setAudioPages,
  setAudioPage,
  audioDuration,
  setAudioDuration,
  onLoadedMetadata,
  setLastPage,
  lastPage,
  setAudio,
  
}) => {
  const storyText = storySelected || storyUnsaved;

  const paragraphsPerPage = 3;

  // Function to prepare the text by splitting it into paragraphs
  const prepareText = (text) => {
    const titleEndIndex = text.indexOf("Once upon a time");
    const withoutTitle = text.substring(titleEndIndex);
    return withoutTitle.split("\n\n");
  };

  // Function to calculate the number of words in a given array of paragraphs
  const countWords = (currentPageParagraphs) => {
    // console.log("CPP", currentPageParagraphs)
    return currentPageParagraphs.reduce((totalWords, paragraph) => {
      const words = paragraph.split(" ");
      return totalWords + words.length;
    }, 0);
  };

  // Initialize audioPages and lastPage based on storyText
  useEffect(() => {
    console.log("storyText", storyText)
    if (!storyText) {
      setAudioPages(0);
      //setLastPage(0);
      return;
    }
    
    const paragraphs = prepareText(storyText);
    // console.log("paragraphs", paragraphs, "paragraphs.length", paragraphs.length);
    const lastAudioPage = Math.ceil(paragraphs.length / paragraphsPerPage);
    console.log(
      "lastAudioPage",
      lastAudioPage,
      "Math paralength/paraperpage",
      Math.ceil(paragraphs.length / paragraphsPerPage)
    );
    setAudioPages(lastAudioPage);
    console.log("AUDIOPAGES", audioPages);
    setLastPage(lastAudioPage + 1);
    console.log("lastPage", lastPage);
  }, [storyText, playing, audioPage]);



  // Handle audio play and page turn logic
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let lastTimeChecked = 0;

    const handleTimeUpdate = () => {
      if (audio.currentTime - lastTimeChecked < 5) {
        // Skip if less than 1 second has passed since last check
        return;
      }
      lastTimeChecked = audio.currentTime;

      const paragraphs = prepareText(storyText);
      const startIndex = (page - 1) * paragraphsPerPage;
      const endIndex = Math.min(
        startIndex + paragraphsPerPage,
        paragraphs.length
      );
      const currentPageParagraphs = paragraphs.slice(startIndex, endIndex);

      const totalWords = countWords(paragraphs);
      const currentPageWords = countWords(currentPageParagraphs);
      const estimatedPageDuration =
        audio.duration * (currentPageWords / totalWords);

      setAudioDuration(audioDuration + estimatedPageDuration)
      console.log("audioDURATION", audioDuration)
      // setAudioDuration(timeLeft)
      // console.log("audioDuration", audioDuration)

      console.log(
        `Total time: ${audio.duration}, 
         Current time: ${audio.currentTime},
         Estimated duration page ${page}: ${estimatedPageDuration},
         audioPages: ${audioPages}
         lastPage: ${lastPage}
         currentPageWords" ${currentPageWords}
         totalWords: ${totalWords}
         startIndex: ${startIndex}
         endIndex: ${endIndex}
         page: ${page}`
      );
      // Logic to determine if it's time to turn the page
      if (audio.currentTime >= audio.duration -2.5 ) {
        setPage(lastPage);
        setAudioPage(lastPage);
        console.log("SPECIAL FINAL TURN")
      }
      // if (
      //   page == lastPage-1) {
      //   setPage((prevPage) => prevPage);
      //   setAudioPage((prevPage) => prevPage);
      //   console.log("pagePAUSE");
      // }
      else if (
        audio.currentTime >= estimatedPageDuration * page &&
        page < lastPage - 1
      ) {
        setPage((prevPage) => prevPage + 1);
        setAudioPage((prevPage) => prevPage + 1);
        console.log(
          "CALCULATION",
          audio.currentTime,
          ">=",
          estimatedPageDuration * page,
          "AND",
          page,
          ",",
          lastPage
        );
        console.log("pageTURN");
      } 
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    // Clean up
    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, [storyText, page, lastPage, audioRef, playing]);

  const getStoryText = (storyText, page) => {
    if (!storyText) return null;

    const paragraphs = prepareText(storyText);
    // console.log("paragraphs", paragraphs)
    const startIndex = (page - 1) * paragraphsPerPage;
    // console.log("startIndex", startIndex)
    const endIndex = startIndex + paragraphsPerPage;
    // console.log("endIndex", endIndex)
    const currentPageParagraphs = paragraphs.slice(startIndex, endIndex);
    // console.log("currentPageParagraphs", currentPageParagraphs)

    if (page == lastPage) {
      return (
        <div className="h-full flex items-center justify-center text-center mx-0 md:mx-6 px-6 pb-20 ">
          <div className="text-2xl 3xl:text-4xl  font-antiqua">
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
                "a mysterious author"}
              .
            </p>
            <br />
            <p className={"text-2xl 3xl:text-4xl font-antiqua"}>
              If you enjoyed reading their story, please let them know by giving
              it a like!{" "}
            </p>
            <br />
            <p className={"text-2xl 3xl:text-4xl font-antiqua"}>
              The story has been read 3 times today.{" "}
            </p>
            ~
          </div>
        </div>
      );
    }

    if (page == 0) {
      return (
        <div className="flex flex-col justify-center items-center h-full px-6 pb-20">
          <h5 className={"text-2xl 3xl:text-4xl font-bold font-antiqua"}>
            {" "}
            The story of
          </h5>
          ~
          <h1 className="text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-7xl font-bold capitalize font-antiqua pt-2 text-center">
            {storySelected
              ? extractTitleFromStory(storySelected)
              : storyUnsaved
              ? extractTitleFromStory(storyUnsaved)
              : "Once Upon A Time..."}
            <p
              className={
                "text-center xl:text-right text-xl  3xl:text-3xl font-bold font-antiqua lowercase"
              }
            >
              {" "}
              as told by{" "}
              <span className="capitalize">
                {selectedBook?.creatorName || selectedBook?.displayName || (
                  <span className="lowercase"> a mysterious author</span>
                )}
              </span>
              .
            </p>
          </h1>
        </div>
      );
    }

    // Render each paragraph separately
    return (
      <div className="font-antiqua fade-in">
        {currentPageParagraphs.map((paragraph, index) => (
          <p key={index} style={{ textAlign: "justify", marginBottom: "1em" }}>
            {paragraph}
          </p>
        ))}
      </div>
    );
  };

  return (
    <>
  

      <div className="fade-in 3xl:pt-12">
        <div className=" border-r sm:border-l-1 sm:rounded-xl bg-orange-200 xl:bg-gradient-to-r from-orange-200 from-20% via-stone-700 via-50% to-orange-200 to-80% ...">
          <div className="sm:border-r-2 sm:border-l-1 sm:rounded-xl sm:border-stone-800 mx-auto xl:flex border xl:h-[87vh] 3xl:h-[80vh]">
            <BookImage
              imagesSelected={imagesSelected}
              page={page}
              imagesUnsaved={imagesUnsaved}
              selectedBook={selectedBook}
            />

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
        audioPage={audioPage}
        lastPage={lastPage}
      />
            {/* Text Section */}
            <div
              className="flex flex-col w-full xl:w-1/2 p-4 xl:px-10 xl:pt-11 xl:pb-4 xl:bg-gradient-to-r from-stone-700 from-0% via-orange-200 via-15%  to-orange-200 to-100% ...
                sm:rounded xl:rounded-xl xl:border xl:rounded-tr-lg xl:rounded-br-lg xl:border-l-4 xl:border-stone-700  text-stone-900"
            >
              <div className="relative flex justify-end items-start text-stone-900">
                <button
                  onClick={() => {
                    setOpen(false);
                    setMessage("");
                    setPlaying(false);
                    //setAudio("");
                    setAudioPage(0);
                    setPage(0);
                  }}
                  className="xl:absolute xl:-top-8 xl:-right-8  hover:text-orange-500 text-center z-10"
                >
                  <XMarkIcon className="h-6 w-6 3xl:h-9 3xl:w-12 mb-2" />
                </button>
              </div>

              <div className="h-full text-stone-900  text-2xl xl:text-xl 2xl:text-2xl 3xl:text-4xl  3xl:p-10 w-full no-scrollbar overflow-y-auto">
                {!storySelected && !storyUnsaved && !loading ? (
                  <div className="flex justify-center items-center h-full italic text-[20px] text-center font-antiqua">
                    Please click on a story or create a new story to start
                    reading here.
                  </div>
                ) : (
                  getStoryText(storySelected || storyUnsaved, page)
                )}
              </div>
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
                onLoadedMetadata={onLoadedMetadata}
                setAudioPage={setAudioPage}
                playing={playing}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
