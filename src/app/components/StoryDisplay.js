import React, { useEffect, useState } from "react";
import { BookIcons } from "./BookIcons";
import { BookImage } from "./BookImage";
import BookControls from "./BookControls";
import Image from "next/image";
import tree from "/public/trace1.svg";
import { MessageFeature } from "./MessageFeature";
import { PageControls } from "./PageControls";
import AudioControls from "./AudioControls";
import { BookText } from "./BookText";

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
  message,
  unsavedTitle,
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
  onLoadedMetadata,
  setLastPage,
  lastPage,
  setAudio,
  handleViewBook,
  handleAudio,
}) => {
  return (
    <>
      <div className="fade-in 2.5xl:pt-4 3xl:pt-12">
        <div className=" border-r sm:border-l-1 sm:rounded-xl bg-orange-200 xl:bg-gradient-to-r from-orange-200 from-20% via-stone-700 via-50% to-orange-200 to-80% ...">
          <div className="sm:border-r-2 sm:border-l-1 sm:rounded-xl sm:border-stone-800 mx-auto xl:flex border  ">
            <BookImage
              imagesSelected={imagesSelected}
              page={page}
              imagesUnsaved={imagesUnsaved}
              selectedBook={selectedBook}
              lastPage={lastPage}
              loading={loading}
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
              handleViewBook={handleViewBook}
              setAudioPage={setAudioPage}
              setOpen={setOpen}
            />
  
            <BookText
              setOpen={setOpen}
              setMessage={setMessage}
              setPlaying={setPlaying}
              setAudioPage={setAudioPage}
              setPage={setPage}
              setAudio={setAudio}
              storySelected={storySelected}
              storyUnsaved={storyUnsaved}
              loading={loading}
              page={page}
              extractTitleFromStory={extractTitleFromStory}
              setAudioPages={setAudioPages}
              audio={audio}
              audioRef={audioRef}
              lastPage={lastPage}
              audioPages={audioPages}
              selectedBook={selectedBook}
              setLastPage={setLastPage}
            />

            {/* <MessageFeature
              message={message}
              setMessage={setMessage}
              selectedBook={selectedBook}
              audioRef={audioRef}
              playing={playing}
              audioPage={audioPage}
              audioPages={audioPages}
              page={page}
            /> */}

            <AudioControls
              playing={playing}
              setPlaying={setPlaying}
              audio={audio}
              audioRef={audioRef}
              selectedBook={selectedBook}
              handleAudio={handleAudio}
              page={page}
              processing={processing}
              onLoadedMetadata={onLoadedMetadata}

              setAudioPage={setAudioPage}
              lastPage={lastPage}
              setMessage={setMessage}
              audioPage={audioPage}
              setPage={setPage}
            />

            <PageControls
              page={page}
              setPage={setPage}
              audioPages={audioPages}
              setAudioPage={setAudioPage}
              setPlaying={setPlaying}
              playing={playing}
              audioRef={audioRef}
              lastPage={lastPage}
              setMessage={setMessage}
              audioPage={audioPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};
