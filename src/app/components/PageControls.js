import {
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShareIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";

export const PageControls = ({
  page,
  setPage,
  audioPages,
  setAudioPage,
  setPlaying,
  playing,
  audioRef,
  lastPage,
  setMessage,
  audioPage,
}) => {
  const handlePage = (direction) => {
    let max = audioPages + 1;
    let min = 0;

    if (direction === "down" && page > min) {
      setPage(page - 1);
    } else if (direction === "up" && page < max) {
      setPage(page + 1);
    }
  };
  return (
    <div className="bottom-0 flex justify-between  xl:items-center xl:absolute xl:flex-col xl:justify-center xl:h-[90vh] z-40   xl:bg-transparent xl:right-0 w-full xl:w-24 2xl:w-32 2.5xl:w-36 3xl:w-48  gap-6 p-2 xl:pb-3">
     
      <button
        onClick={() => handlePage("down")}
        className="border-2 rounded-tl-full rounded-bl-full transition ease-in-out cursor-pointer   border-amber-500 hover:cursor-pointer bg-amber-500 hover:bg-amber-400 text-white "
      >
        <ChevronLeftIcon className="icon  shadow-md hover:shadow-lg hover:shadow-stone-800/50 shadow-stone-800/30 rounded-tl-full rounded-bl-full " />
      </button>

      <div
        className={
          "group relative text-white  xl:text-amber-500 border-2 rounded border-amber-500 hover:cursor-pointer bg-amber-500 hover:bg-amber-400 hover:text-white xl:bg-sky-950 "
        }
      >
        <div className="icon flex items-center justify-center">{page}</div>
      </div>

      <button
        onClick={() => handlePage("up")}
        className="border-2 rounded-tr-full rounded-br-full  transition ease-in-out cursor-pointer rounded  border-amber-500 hover:cursor-pointer bg-amber-500 hover:bg-amber-400 text-white "
      >
        <ChevronRightIcon className="icon  shadow-md hover:shadow-lg hover:shadow-stone-800/50 shadow-stone-700/30 rounded-tr-full rounded-br-full" />
      </button>
      
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
      )}
    </div>
  );
};
