import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useEffect } from "react";

export const BookText = ({
  setOpen,
  setMessage,
  playing,
  setPlaying,
  setAudioPage,
  setPage,
  setAudio,
  storySelected,
  storyUnsaved,
  loading,
  page,
  extractTitleFromStory,
  setAudioPages,
  audio,
  audioRef,
  lastPage,
  audioPages,
  selectedBook,
  setLastPage,
  unsavedTitle,
  storyText,
  unsavedTheme,
  user
}) => {
  const selectedTitle = extractTitleFromStory(storyText);

  const paragraphsPerPage = 2.5;

  // Function to prepare the text by splitting it into paragraphs
  const prepareText = (text) => {
    const titleEndIndex = text.indexOf("Once upon a time");
    const withoutTitle = text.substring(titleEndIndex);
    return withoutTitle.split("\n\n");
  };

  // Function to calculate the number of words in a given array of paragraphs
  const countWords = (currentPageParagraphs) => {
    return currentPageParagraphs.reduce((totalWords, paragraph) => {
      const words = paragraph.split(" ");
      return totalWords + words?.length;
    }, 0);
  };

  // Initialize audioPages and lastPage based on storyText
  useEffect(() => {
    if (!storyText) {
      setAudioPages(0);
      return;
    }

    const paragraphs = prepareText(storyText);

    const lastAudioPage = Math.ceil(paragraphs?.length / paragraphsPerPage);

    setAudioPages(lastAudioPage);

    setLastPage(lastAudioPage + 1);
  }, [storyText, audio]);

  // Handle audio play and page turn logic
  useEffect(() => {
    const audioCurrent = audioRef?.current;
    if (!audioCurrent) return;

    let lastTimeChecked = 0;

    const handleTimeUpdate = () => {
      if (audioCurrent?.currentTime - lastTimeChecked < 1) {
        // Skip if less than 1 second has passed since last check
        return;
      }
      lastTimeChecked = audioCurrent?.currentTime;

      const paragraphs = prepareText(storyText);
      const startIndex = (page - 1) * paragraphsPerPage;
      const endIndex = Math.min(
        startIndex + paragraphsPerPage,
        paragraphs?.length
      );
      const currentPageParagraphs = paragraphs.slice(startIndex, endIndex);

      const totalWords = countWords(paragraphs);
      const averagePageWords = 70;
      const averagePageDuration =
        audioCurrent?.duration * (averagePageWords / totalWords);
      const currentPageWords = countWords(currentPageParagraphs);
      const estimatedPageDuration =
        audioCurrent?.duration * (currentPageWords / totalWords);

      console.log(
        `Total time: ${audioCurrent?.duration}, 
         Current time: ${audioCurrent?.currentTime},
         Estimated duration page ${page}: ${estimatedPageDuration},
         audioPages: ${audioPages}
         lastPage: ${lastPage}
         currentPageWords" ${currentPageWords}
         totalWords: ${totalWords}
         startIndex: ${startIndex}
         endIndex: ${endIndex}
         page: ${page}`
      );
      console.log(
        "CALCULATION",
        audioCurrent?.currentTime,
        ">=",
        estimatedPageDuration * page,
        "AND",
        page,
        ",",
        lastPage,
        "OR >=",
        audioCurrent?.duration
      );

      if (
        audioCurrent.currentTime >= audioCurrent.duration - 2 &&
        page == audioPages
      ) {
        console.log("TO LAST PAGE");
        setPage(lastPage);
        setAudioPage(lastPage);
        setPlaying(false);
        // handleViewBook(selectedBook.id, userId)
        // return
      } else if (
        audioCurrent.currentTime >=
          estimatedPageDuration + averagePageDuration * (page - 1) &&
        page < audioPages
      ) {
        setPage((prevPage) => prevPage + 1);
        setAudioPage((prevPage) => prevPage + 1);
        console.log(
          "CALCULATION",
          audioCurrent.currentTime,
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

    if (playing && page == 0 && audioCurrent.currentTime > 5) {
      setPage(1);
      setAudioPage(1);
    }

    audioCurrent.addEventListener("timeupdate", handleTimeUpdate);

    // Clean up
    return () =>
      audioCurrent.removeEventListener("timeupdate", handleTimeUpdate);
  }, [storyText, page, audioRef]);

  const getStoryText = (storyText, page) => {
    if (!storyText) return null;

    const paragraphs = prepareText(storyText);

    const startIndex = (page - 1) * paragraphsPerPage;

    const endIndex = startIndex + paragraphsPerPage;

    const currentPageParagraphs = paragraphs.slice(startIndex, endIndex);

    if (page == lastPage) {
      return (
        <div className="h-full w-full flex items-center justify-center text-center p-8">
          <div className="text-2xl 3xl:text-4xl font-antiqua">
            {selectedBook?.creatorPhotoURL  && (
              <div className="w-full flex justify-center">
                <div className="relative rounded-full w-24 2.5xl:w-32 3xl:w-40 aspect-square border-4 border-stone-600">
                  <Image
                    src={selectedBook?.creatorPhotoURL }
                    alt="profile-mini"
                    fill
                    sizes="(max-width: 768px) 100vw,
                   (max-width: 1200px) 50vw,
                   33vw"
                    // width={30}
                    // height={30}
                    cover="true"
                    className="rounded-full object-cover"
                    //onError={handleImageError}
                  />
                </div>
              </div>
            )}

            <div
              className={
                "text-xl xl:text-xl 2xl:text-2xl 2.5xl:text-3xl 3xl:text-4xl italics font-semibold"
              }
            >
              <p className="">
                {" "}
                Created by&nbsp;
                {selectedBook?.creatorName ||
                  selectedBook?.displayName ||
                  user?.displayName ||
                  "a mysterious author"}
                .
              </p>
              ~
              <p>
                {" "}
                We hope you enjoyed reading this <span className="lowercase">{selectedBook?.theme || unsavedTheme }</span>{" tale. "}
                <span><br/>
                  <em>{selectedBook?.title || unsavedTitle}</em>
                </span>{" "}
                {/* <span className="lowercase">
                    {imagesUnsaved ? theme : selectedBook?.theme}
                  </span>{" "} */}
              </p>
              <p className={""}></p>~
              <p
                className={
                  "text-lg xl:text-xl 2xl:text-2xl 2.5xl:text-3xl 3xl:text-4xl italics font-semibold"
                }
              >
                {!loading
                  ? `Viewed ${selectedBook?.views || 0} times.`
                  : "The story is loading... please wait."}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (page == 0) {
      return (
        <div className="flex flex-col justify-center items-center h-full pt-28 pb-32 px-20">
          <h5
            className={
              "text-xl xl:text-2xl xl:leading-7 2xl:text-3xl 2.5xl:text-4xl 3xl:text-5xl  font-semibold font-antiqua"
            }
          >
            {" "}
            The story of
          </h5>
          ~
          <h1 className="text-4xl 2xl:text-5xl 3xl:text-7xl font-bold capitalize font-antiqua pt-2 text-center">
            {storySelected
              ? selectedBook?.title || selectedTitle
              : storyUnsaved
              ? unsavedTitle
              : "Once Upon A Time..."}
            <p
              className={
                selectedBook?.title?.length < 20
                  ? "text-center xl:text-right text-xl xl:text-xl 2xl:text-2xl 2.5xl:text-3xl 3xl:text-4xl font-antiqua lowercase"
                  : "text-center text-xl xl:text-xl 2xl:text-2xl 2.5xl:text-3xl 3xl:text-4xl font-antiqua lowercase"
              }
            >
              {" "}
              as told by{" "}
              <span className="capitalize">
                {selectedBook?.creatorName || selectedBook?.displayName || user?.displayName || (
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
      <div className="font-antiqua fade-in ">
        {currentPageParagraphs.map((paragraph, index) => (
          <div key={index} className="ml-1 ">
            {index == 0 ? (
              <p
                style={{ textAlign: "justify", marginBottom: "1em" }}
                className={
                  paragraph == "The End"
                    ? "flex justify-center h-full items-center py-24 w-full text-center "
                    : "first-letter:text-6xl first-letter:2xl:text-[8rem] first-letter:3xl:text-9xl  first-letter:2xl:px-10 first-letter:px-4  first-letter:mr-4 first-letter:py-0 first-letter:ring-2 first-letter:ring-stone-800 first-letter:rounded-sm  first-letter:bg-cover first-letter:float-left first-letter:mt-2 first-letter:border-double"
                }
              >
                {paragraph}
              </p>
            ) : (
              <p
                key={index}
                style={{ textAlign: "justify", marginBottom: "1em" }}
                className={
                  paragraph == "The End"
                    ? "flex justify-center h-full items-center py-24 w-full text-center "
                    : "first-letter:text-3xl first-letter:2xl:text-5xl first-letter:3xl:text-6xl   "
                }
              >
                {paragraph}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="flex flex-col w-full xl:w-1/2 p-2 md:p-4 xl:px-12 xl:py-12 xl:bg-gradient-to-r from-stone-700 from-0% via-orange-200 via-15%  to-orange-200 to-100%
      sm:rounded xl:rounded-xl xl:border xl:rounded-tr-lg xl:rounded-br-lg xl:border-l-4 xl:border-stone-700  text-stone-900"
    >
      <div className="relative flex justify-end items-start text-stone-900 mt-2 md:mt-0">
        <div
          onClick={() => {
            setOpen(false);
            setMessage("");
            setPlaying(false);
            setAudioPage(0);
            setPage(0);
            setAudio("");
          }}
          className="cursor-pointer absolute bottom-4 xl:-top-10 xl:-right-9    text-center z-10 text-stone-700 hover:text-white xl:hover:text-stone-500  rounded"
        >
          <XMarkIcon className="icon " />
        </div>
      </div>

      <div className="xl:aspect-square cursor-grab h-full text-stone-900 text-2xl xl:text-2xl xl:leading-7 2xl:text-3xl 2.5xl:text-4xl 3xl:text-5xl 3xl:p-10 w-full no-scrollbar overflow-y-auto">
        {!storySelected && !storyUnsaved && !loading ? (
          <div className="flex justify-center items-center h-full italic text-center font-antiqua">
            Please click on a story or create a new story to start reading here.
          </div>
        ) : (
          getStoryText(storySelected || storyUnsaved, page)
        )}
      </div>
    </div>
  );
};
