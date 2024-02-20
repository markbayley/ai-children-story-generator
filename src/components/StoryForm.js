import {
  BookOpenIcon,
  ChevronDownIcon,
  LightBulbIcon,
  PaintBrushIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Menu } from "@headlessui/react";

export const StoryForm = ({
  userPrompt,
  setUserPrompt,
  handleSubmit,
  setMessage,
  loading,
  handleOpen,
  storyUnsaved,
  theme,
  setTheme,
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
    "clouds",
    "forest",
    "village",
    "pond",
    "woods",
    "castle",
    "oak tree",
    "spell",
    "wish",
    "dream",
    "picnic",
    "adventure",
    "journey",
    "quest",
    "battle",
    "school",
    "land",
    "world",
    "villain",
    "kingdom",
  ];

  const randomAdjectives = [
    "enchanted",
    "amazing",
    "grumpy",
    "forgetful",
    "eerie",
    "lost",
    "scatterbrained",
    "mysterious",
    "fascinating",
    "curious",
    "peculiar",
    "funny",
    "hilarious",
    "astounding",
    "spooky",
    "weird",
    "charming",
    "magic",
    "secret",
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
      <div className="text-sm ">
        <Menu>
          <Menu.Button
            className={
              "flex justify-between mt-2 text-orange-300 hover:text-amber-500  "
            }
          >
            <div className="flex relative"> </div>
            <ChevronDownIcon className="h-5 w-5 mr-2 text-orange-300" />
            {theme}{" "}Theme
          </Menu.Button>
          {/* <span className="text-[10px] text-orange-300 absolute -top-3 ">STYLE</span> */}
          <Menu.Items
            className={
              "flex  text-white justify-between  z-30 ml-5 -mt-6 absolute  bg-sky-950 rounded  leading-loose"
            }
          >
            <div className="flex justify-between ">
              <Menu.Item>
             
                  <button
                    onClick={() => setTheme("Spooky")}
                    className={"mx-2 hover:text-orange-300"}
                  >
                    Spooky
                  </button>
                
              </Menu.Item>
              <Menu.Item>
               
                  <button
                    onClick={() => setTheme("Pretty")}
                    className={"mx-2 hover:text-orange-300"}
                  >
                    Pretty
                  </button>
              
              </Menu.Item>
              <Menu.Item>
             
                  <button
                    onClick={() => setTheme("Funny")}
                    className={"mx-2 hover:text-orange-300"}
                  >
                    Funny
                  </button>
              
              </Menu.Item>
              <Menu.Item>
           
                  <button
                    onClick={() => setTheme("Cute")}
                    className={"mx-2 hover:text-orange-300"}
                  >
                    Cute
                  </button>
            
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={() => setTheme("Weird")}
                  className={"mx-2 hover:text-orange-300"}
                >
                  Weird
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>
    );
  }

  return (
    <div className="flex justify-start font-inter w-full sm:w-[60vw] lg:w-[36vw]">
      <form onSubmit={handleSubmit} className="mt-4 lg:mt-0 rounded-xl w-full">
        <div className=" text-orange-300 px-4 ">
          <h1 className="font-bold font-antiqua text-5xl ">Storytime AI</h1>
        </div>
        <h3 className=" px-4  text-md font-light">
          Create stories with AI. What do you want to read about?
          <a onClick={() => setUserPrompt("A lonely princess and a frog prince")}>
            {" "}
            A lonely princess and a wise frog prince?{" "}
          </a>
          <a onClick={() => setUserPrompt("A castle in the clouds")}>
            {" "}
            A castle in the clouds?{" "}Bring your imagination to life!
          </a>
        </h3>
        <div className="flex items-center justify-center px-4">
          <hr className="h-px my-4 bg-yellow-600 border-0  w-full" />{" "}
          <SparklesIcon className="h-6 w-6 mx-4 text-yellow-600" />{" "}
          <hr className="h-px my-4 bg-yellow-600 border-0  w-full" />
        </div>
        <div className="mx-4 rounded-xl">
          <label
            htmlFor="prompt"
            className="block text-sm py-2"
          >
            {"Create a story about..."}
          </label>
          <input
            id="prompt"
            type="text"
            autoComplete="true"
            placeholder="A magical castle in the sky"
            value={userPrompt}
            onChange={(e) => {
              setUserPrompt(e.target.value), setMessage("");
            }}
            className="w-full  p-2   rounded outline-none text-black placeholder-gray-500 bg-white text-[16px]"
          />
          <div className="flex w-full justify-between items-center ">
            <ThemeDropdown />

            <label
              onClick={() =>
                setUserPrompt(
                  getRandomIdea(randomNouns, randomAdjectives, randomPlaces)
                )
              }
              htmlFor="prompt"
              className="  text-md pt-2 text-orange-300 "
            >
              <p className="flex items-center text-sm cursor-pointer hover:text-amber-500">
                Generate idea?{" "}
                <span className="flex items-center justify-center hover:text-sky-900  hover:bg-orange-300 bg-sky-900  h-8 w-8 ml-1 font-bold border rounded-full border-orange-300 text-lg ">
                  <LightBulbIcon className="h-5 w-5  " />
                </span>
              </p>
            </label>
          </div>
        </div>

        <div className="flex text-[15px]">
          {loading ? (
            <button
              type="submit"
              className={
                "w-full text-white px-4 py-2 m-4  rounded-md bg-indigo-600 hover:bg-indigo-500 flex justify-center  border-stone-700"
              }
            >
              Creating...
              <PaintBrushIcon className="h-6 w-6 mx-2" />
            </button>
          ) : (
            <button
              type="submit"
              className={
                "w-full text-white px-4 py-2 mx-4 my-2 font-sans rounded-md bg-indigo-600 hover:bg-indigo-500 flex justify-center  border-stone-700"
              }
            >
              Create
              <PaintBrushIcon className="h-6 w-6 mx-2" />
            </button>
          )}
          {storyUnsaved && (
            <button
              onClick={handleOpen}
              className={
                "w-full text-white px-4 py-2 m-4 font-inter rounded-md bg-indigo-600 hover:bg-indigo-500 flex justify-center  border-stone-700"
              }
            >
              View
              <BookOpenIcon className="h-6 w-6 mx-2" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
