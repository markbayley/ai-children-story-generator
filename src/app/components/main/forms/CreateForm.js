import {
  ArrowPathIcon,
  BookOpenIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  LightBulbIcon,
  PaintBrushIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Switch } from "@headlessui/react";

const CreateForm = ({
  userPrompt,
  setUserPrompt,
  handleSubmit,
  setMessage,
  handleOpen,
  storyUnsaved,
  unsavedTheme,
  setUnsavedTheme,
  createWithAudio,
  setCreateWithAudio,
  tabSelected,
  loading,
  showForm,
  setShowForm
}) => {
  const randomNouns = [
    "fairy",
    "witch",
    "wizard",
    "goblin",
    "troll",
    "gnome",
    "faeries",
    "princess",
    "prince",
    "king",
    "queen",
    "knight",
    "dinosaur",
    "mouse",
    "teddy",
    "dragon",
    "monster",
    "beast",
    "creature",
    "owl",
  ];

  const randomPlaces = [
    "forest",
    "village",
    "woods",
    "kingdom",
    "adventure",
    "pond",
    "castle",
    "oak tree",
    "spell",
    "wish",
    "dream",
    "picnic",
    "journey",
    "quest",
    "battle",
    "school",
    "land",
    "world",
  ];

  const randomAdjectives = [
    "enchanted",
    "amazing",
    "grumpy",
    "secret",
    "forgetful",
    "eerie",
    "lost",
    "scatterbrained",
    "mysterious",
    "fascinating",
    "curious",
    "peculiar",
    "hilarious",
    "astounding",
    "charming",
    "magic",
    "bumbling",
  ];

  const getRandomIdea = (nounsArray, adjectivesArray, placesArray) => {
    // Shuffle the array
    const shuffledNouns = [...nounsArray].sort(() => 0.5 - Math.random());
    const shuffledAdjectives = [...adjectivesArray].sort(
      () => 0.5 - Math.random()
    );
    const shuffledPlaces = [...placesArray].sort(() => 0.5 - Math.random());
    // Pick the first three elements and join them into a string
    return (
      shuffledAdjectives.slice(0, 1).join(" ") +
      " " +
      shuffledNouns.slice(0, 1).join(" ") +
      " " +
      shuffledPlaces.slice(0, 1).join(" ")
    );
  };

  function ThemeDropdown() {
    return (
      <div className="flex justify-between text-orange-300  text-sm 3xl:text-2xl font-semibold gap-2 ">
        <span className="hidden md:flex">Theme</span>
        {["Spooky", "Funny", "Sweet", "Weird", "Action"].map((item) => (
          <button
            key={item}
            onClick={() => handleSelectTheme(item)}
            className={
              unsavedTheme == item
                ? " text-white bg-amber-500 rounded-full py-1 px-2 font-normal text-xs shadow-md shadow-slate-900 w-1/6"
                : " text-white  rounded-full py-1 px-2 font-normal text-xs bg-slate-700 hover:bg-slate-600 shadow-md shadow-slate-900 w-1/6"
            }
          >
            {item}
          </button>
        ))}
      </div>
    );
  }

  const handleSelectTheme = (theme) => {
    setUnsavedTheme(theme);
  };

  function AudioSwitch() {
    return (
      <div className="hidden w-full md:w-auto text-orange-300 md:flex items-center justify-center pt-2 md:pt-0 text-sm 3xl:text-2xl font-semibold">
        Audio
        <Switch
          checked={createWithAudio}
          onChange={setCreateWithAudio}
          className={`${
            createWithAudio
              ? "bg-amber-500 hover:bg-amber-400 shadow-md shadow-slate-800"
              : "bg-slate-500 hover:bg-slate-400 shadow-md shadow-slate-800"
          }
        mx-2  relative inline-flex h-full w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${createWithAudio ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>
    );
  }

 

  return (
    <div className="fade-in flex justify-start w-full lg:w-2/3 xl:w-5/12 3xl:text-2xl px-2 py-0 md:pt-4">
      <form
        onSubmit={handleSubmit}
        className="  mt-4 lg:mt-0 rounded-xl w-full"
      >
        <div className="text-orange-300 flex w-full justify-between items-center">
          <h1 className="font-bold font-antiqua text-5xl 2.5xl:text-7xl 3xl:text-8xl">
           Create
          </h1>
          {/* {tabSelected == "Create" && ( */}
            <button
              onClick={() => setShowForm(!showForm)}
              className={
                showForm
                  ? "flex items-center font-semibold text-sm shadow-md shadow-slate-900 px-3 py-2 rounded-md   bg-sky-950 hover:bg-sky-900"
                  : "flex items-center font-semibold text-sm shadow-md shadow-slate-900 px-3 py-2 rounded-md  bg-sky-950 hover:bg-sky-900"
              }
            >
            
              {showForm ? (
               <>Close <ChevronUpIcon className=" w-4 ml-2 font-extrabold  aspect-square  cursor-pointer" /></>
              ) : (
               <>Open <ChevronDownIcon className=" w-4 ml-2 font-extrabold  aspect-square  cursor-pointer" /></>
              )}
            </button>
          {/* )} */}
        </div>

{ !showForm &&
        <>

        <h3 className="py-2 text-md font-normal text-white">
 
           Create original stories with AI! Your books will appear below.
        
          {/* Write your own prompt or generate one to get started. */}
        </h3>
        <div className="flex items-center justify-center">
          <hr className="h-px  bg-orange-300 border-0  w-full" />{" "}
          <SparklesIcon className=" w-10 aspect-square mx-2 text-orange-300" />{" "}
          <hr className="h-px  bg-orange-300 border-0  w-full" />
        </div>

        </>

}

        {showForm &&  (
          <>
            <div className="fade-in flex w-full justify-between items-center  text-sm font-semibold pb-2">
              <label
                htmlFor="prompt"
                className="block text-orange-300 text-sm font-semibold py-2 3xl:text-2xl"
              >
                {"Create a story about..."}
              </label>

              {userPrompt ? (
                <label
                  onClick={() => {
                    setUserPrompt("");
                    setMessage({ text: "Prompt Cleared", type: "like" });
                  }}
                  htmlFor="prompt"
                  className="group   text-orange-300 bg-transparent cursor-pointer "
                >
                  <p className="flex items-center text-sm font-semibold hover:text-orange-200 3xl:text-2xl">
                    Clear prompt{" "}
                    <span className="flex items-center justify-center bg-sky-950 h-8 w-8 ml-1 font-bold border-2 rounded-full border-orange-300 text-lg group-hover:bg-orange-300 group-hover:text-sky-900 transition-colors duration-200">
                      <ArrowPathIcon className="h-5 w-5" />
                    </span>
                  </p>
                </label>
              ) : (
                <label
                  onClick={() => {
                    setUserPrompt(
                      getRandomIdea(randomNouns, randomAdjectives, randomPlaces)
                    );
                    setMessage({ text: "Prompt Created", type: "info" });
                  }}
                  htmlFor="prompt"
                  className="group   text-orange-300 bg-transparent cursor-pointer "
                >
                  <p className="flex items-center text-sm font-semibold hover:text-orange-200 3xl:text-2xl">
                    Generate idea?{" "}
                    <span className="flex items-center justify-center bg-sky-950 h-8 w-8 ml-1 font-bold border-2 rounded-full border-orange-300 text-lg group-hover:bg-orange-300 group-hover:text-sky-900 transition-colors duration-200">
                      <LightBulbIcon className="h-5 w-5" />
                    </span>
                  </p>
                </label>
              )}
            </div>

            <input
              id="prompt"
              type="text"
              autoComplete="true"
              placeholder="A magical castle in the sky"
              value={userPrompt}
              onChange={(e) => {
                setUserPrompt(e.target.value), setMessage("");
              }}
              className="fade-in w-full p-2 rounded outline-none text-black placeholder-gray-500 bg-white text-[16px] 3xl:text-xl 3xl:py-4"
            />
            {/* Theme & Audio Filter */}

            <div className="fade-in xl:flex md:justify-between w-full items-center pt-5 pb-[3px]">
              <ThemeDropdown />
              <AudioSwitch />
            </div>

            <div className="fade-in flex items-center text-[15px] gap-4 pt-4 3xl:text-xl pb-3">
              <button
                type="submit"
                className={
                  "font-semibold w-full text-white py-2 rounded-md bg-amber-500 hover:bg-amber-400 flex justify-center border-stone-700 3xl:py-4"
                }
              >
                {loading ? (
                  <span className="flex animate-pulse">
                    Creating... <PaintBrushIcon className="h-6 w-6 mx-2" />
                  </span>
                ) : (
                  <>
                    {" "}
                    Create
                    <PaintBrushIcon className="h-6 w-6 mx-2" />
                  </>
                )}
              </button>

              {storyUnsaved && (
                <button
                  onClick={handleOpen}
                  className={
                    "font-semibold w-full text-white py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 flex justify-center border-stone-700 3xl:py-4"
                  }
                >
                  View
                  <BookOpenIcon className="h-6 w-6 mx-2" />
                </button>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default CreateForm;
