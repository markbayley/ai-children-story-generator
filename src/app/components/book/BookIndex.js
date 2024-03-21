import { BookIcons } from "./controls/BookIcons";
import { BookImage } from "./display/BookImage";
import { PageControls } from "./controls/PageControls";
import AudioControls from "./controls/AudioControls";
import { BookText } from "./display/BookText";

export const BookIndex = ({
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
  unsavedTitle,
  extractTitleFromStory,
  loading,
  handleDeleteBook,
  unsaved,
  show,
  setShow,
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
  const storyText = storySelected || storyUnsaved;

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
              unsavedTitle={unsavedTitle}
              storyText={storyText}
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
              unsaved={unsaved}
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
              storyText={storyText}
              handleAudio={handleAudio}
              selectedBook={selectedBook}
            />
          </div>
        </div>
      </div>
    </>
  );
};
