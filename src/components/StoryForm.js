import SignIn from "@/app/auth/sign-in";
import {
  ArrowUturnDownIcon,
  ArrowUturnLeftIcon,
  BookOpenIcon,
  LightBulbIcon,
  PaintBrushIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";


export const StoryForm = ({
  prompt,
  setPrompt,
  handleSubmit,
  setMessage,
  loading,
  handleOpen,
  storyUnsaved,
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
    "owl"
  ]

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
    "kingdom"
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
    "bumbling"
  ]

  const getRandomIdea = (nounsArray, adjectivesArray, placesArray) => {
    const shuffledNouns = [...nounsArray].sort(() => 0.5 - Math.random()); // Shuffle the array
    const shuffledAdjectives = [...adjectivesArray].sort(() => 0.5 - Math.random()); 
    const shuffledPlaces = [...placesArray].sort(() => 0.5 - Math.random()); 
    return shuffledAdjectives.slice(0, 1).join(" ") + " " + shuffledNouns.slice(0, 1).join(" ") + " " + shuffledPlaces.slice(0, 1).join(" "); // Pick the first three elements and join them into a string
  };

  return (
    <div className="flex justify-start font-inter w-full sm:w-[60vw] lg:w-[36vw]">
      <form onSubmit={handleSubmit} className="mt-2 rounded-xl">
        <div className=" text-orange-300 px-4 pb-4">
          <h1 className="font-bold font-antiqua text-5xl ">Storyteller AI</h1>
        </div>
        <h3 className=" px-4 text-gray-300 text-md font-light">
          Create stories with AI. What do you want to read about?
          {/* <a onClick={() => setPrompt("A boy with a nervous pet dinosaur")}>
            {" "}
            A boy with a nervous pet dinosaur?{" "}
          </a> */}
          <a onClick={() => setPrompt("A lonely princess and a frog prince")}>
            {" "}
            A lonely princess and a wise frog prince?{" "}
          </a>
          <a onClick={() => setPrompt("A castle in the clouds")}>
            {" "}
            A castle in the clouds?{" "}
          </a>
        </h3>
        <div className="flex items-center justify-center ">
          <hr className="h-px my-4 bg-yellow-600 border-0  w-2/5" />{" "}
          <SparklesIcon className="h-6 w-6 mx-4 text-yellow-600" />{" "}
          <hr className="h-px my-4 bg-yellow-600 border-0  w-2/5" />
        </div>
        <div className="mx-4 rounded-xl">
          <label
            htmlFor="prompt"
            className="block text-md py-2  text-orange-300"
          >
            {"Create a story about..."}
          </label>
          <input
            id="prompt"
            type="text"
            autoComplete="true"
            placeholder="A magical castle in the sky"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value), setMessage("");
            }}
            className="w-full  p-2   rounded outline-none text-black placeholder-gray-500 bg-white text-[16px]"
          />
          <label
            onClick={() => setPrompt(getRandomIdea(randomNouns, randomAdjectives, randomPlaces))}
            htmlFor="prompt"
            className="flex w-full justify-end text-md py-2 text-orange-300 cursor-pointer"
          >
            <p className="flex items-end text-xs hover:text-orange-400">
              Generate random ideas? <LightBulbIcon className="h-5 w-5 ml-1" />
            </p>
          </label>
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
                "w-full text-white px-4 py-2 m-4 font-sans rounded-md bg-indigo-600 hover:bg-indigo-500 flex justify-center  border-stone-700"
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
      {/* <SignIn /> */}
    </div>
  );
};
