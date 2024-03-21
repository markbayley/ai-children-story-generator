import { Switch } from "@headlessui/react";
import { ArrowPathIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export const FilterForm = ({
  setMessage,
 // searchQuery,
  //setSearchQuery,
  //handleSearch,
  //handleFilter,
  allBooks,
  showWithAudio,
  setShowWithAudio,
  selectedTheme,
  setSelectedTheme,
  selectedCreator,
  setSelectedCreator
}) => {
  function ThemeDropdown() {
    return (
      <div className="flex justify-between text-orange-300  text-sm  font-semibold gap-2">
        <span className="hidden md:flex">Theme</span>
        {["Spooky", "Funny", "Cute", "Weird", "Adventure"].map((theme) => (
          <button
            key={theme}
            onClick={() => handleSelectTheme(theme)}
            className={
              selectedTheme?.includes(theme)
                ? " text-white bg-amber-500 rounded-full py-1 px-2 font-normal text-xs shadow-md shadow-slate-900"
                : " text-white  rounded-full py-1 px-2 font-normal text-xs bg-slate-700 hover:bg-slate-600 shadow-md shadow-slate-900"
            }
          >
            {theme}
          </button>
        ))}
      </div>
    );
  }

  const handleSelectTheme = (theme) => {
    setSelectedTheme(prevThemes => {
      if (prevThemes?.includes(theme)) {
        // Remove the theme if it's already selected
        return prevThemes?.filter(t => t !== theme);
      } else {
        // Add the theme if it's not already selected
        return [...prevThemes, theme];
      }
    });
  };


  const handleSelectCreator = (name) => {
    setSelectedCreator(prevCreators => {
      if (prevCreators?.includes(name)) {
        // Remove the theme if it's already selected
        return prevCreators?.filter(t => t !== name);
      } else {
        // Add the theme if it's not already selected
        return [...prevCreators, name];
      }
    });
  };
  

  function AudioSwitch() {
    return (
      <div className="w-full md:w-auto text-orange-300 flex items-center justify-center pt-2 md:pt-0 text-sm font-semibold">
        Audio
        <Switch
          checked={showWithAudio}
          onChange={setShowWithAudio}
          className={`${
            showWithAudio
              ? "bg-amber-500 hover:bg-amber-400 shadow-md shadow-slate-800"
              : "bg-slate-500 hover:bg-slate-400 shadow-md shadow-slate-800"
          }
        mx-2  relative inline-flex h-[24px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${showWithAudio ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>
    );
  }

  // Step 1: Create an empty object to store the unique creator names, their corresponding photo URLs, and the count of their books
  const uniqueCreators = {};
  // Step 2: Iterate over the allBooks array
  allBooks.forEach((book) => {
    // Check if the creator name and photo URL are both not null
    if (book.creatorName !== null && book.creatorPhotoURL !== null) {
      // Check if the creator name already exists in the uniqueCreators object
      if (!uniqueCreators.hasOwnProperty(book.creatorName)) {
        // If not, add it to the uniqueCreators object with its corresponding photo URL and initialize the count of books to 1
        uniqueCreators[book.creatorName] = {
          name: book.creatorName,
          photoURL: book.creatorPhotoURL,
          bookCount: 1,
        };
      } else {
        // If the creator already exists, increment the count of books
        uniqueCreators[book.creatorName].bookCount++;
      }
    }
  });

  // Step 3: Convert the uniqueCreators object into an array of objects
  const uniqueCreatorsArr = Object.values(uniqueCreators);
  // Step 4: Sort the uniqueCreatorsArray based on the book count in descending order
  const uniqueCreatorsArray = uniqueCreatorsArr
    .sort((a, b) => b.bookCount - a.bookCount)
    .slice(0, 7);
  // Step 5: Use uniqueCreatorsArray as needed
  console.log(uniqueCreatorsArray[0]);




  return (
    <div
      className={
        "flex justify-start w-full lg:w-[45vw] xl:w-[35vw] 2.5xl:w-[30vw] 3xl:text-2xl px-2 py-0 md:py-4"
      }
    >
      {/* onSubmit={handleFilter}  */}
      <div className="mt-4 lg:mt-0 rounded-xl w-full">
        <div className="text-orange-300 ">
          <h1 className="font-bold font-antiqua text-5xl 2.5xl:text-7xl 3xl:text-8xl">
            Filter
          </h1>
        </div>
        <h3 className="py-2 text-md font-normal text-white">
          Filter stories by our top creators. Enter a search prompt in the input
          field below to find your favourite story titles.
        </h3>
        <div className="flex items-center justify-center">
          <hr className="h-px  bg-orange-300 border-0  w-full" />{" "}
          <SparklesIcon className=" w-10 aspect-square mx-2 text-orange-300" />{" "}
          <hr className="h-px  bg-orange-300 border-0  w-full" />
        </div>

        <div className="backdrop-blur-md bg-sky-950/30 lg:bg-transparent  rounded-lg">
          <div className="flex w-full justify-between items-center pb-2 text-sm font-semibold ">
            <label
              htmlFor="prompt"
              className="block text-orange-300 text-sm font-semibold py-2 3xl:text-2xl"
            >
              Top Creators
            </label>

            {/* Reset Button */}
            {selectedCreator || selectedTheme || showWithAudio ? (
              <button
                onClick={() => {
                  setSelectedCreator([]);
                  setShowWithAudio(false);
                  setSelectedTheme([]);
                  setMessage({ text: "Filter Cleared", type: "create" });
                }}
                htmlFor="prompt"
                className="group fade-in  text-orange-300 bg-transparent cursor-pointer "
              >
                <p className="flex items-center text-sm font-semibold  3xl:text-2xl">
                  Clear filter{" "}
                  <span className="flex items-center justify-center bg-sky-950 h-8 w-8 ml-2 font-bold border-2 rounded-full border-orange-300 text-lg group-hover:bg-orange-300 group-hover:text-sky-900 transition-colors duration-200">
                    <ArrowPathIcon className="h-5 w-5" />
                  </span>
                </p>
              </button>
            ) : (
              <button
                htmlFor="prompt"
                className="group   text-gray-500 bg-transparent cursor-pointer "
              >
                <p className="flex items-center text-sm font-semibold  3xl:text-2xl">
                  <span className="flex items-center justify-center bg-sky-950 h-8 w-8 ml-2 font-bold border-2 rounded-full border-gray-500 text-lg  transition-colors duration-200">
                    <ArrowPathIcon className="h-5 w-5" />
                  </span>
                </p>
              </button>
            )}
          </div>

          {/* Creator Filter */}

          <button
           // type="submit"
            className="fade-in  text-white flex w-full justify-between items-start text-center cursor-pointer text-xs  h-16 "
          >
            {uniqueCreatorsArray.map((creator, index) => (
              <div
                onClick={() => {
                  handleSelectCreator(creator?.name);
                  //setShowCreators(false);
                  setMessage({
                    text: "Search " + '"' + creator?.name + '" ?',
                    type: "create",
                  });
                }}
                key={index}
                className="relative 2xl:mx-1 group  hover:text-orange-300 w-full flex flex-col items-center justify-center "
              >
                <div className="absolute bottom-0 left-1 md:left-6 lg:left-2 3xl:left-6 h-5 w-5  flex justify-center items-center group rounded-full  bg-amber-500  text-white ">
                  <div className="rounded-full text-center shadow-xl">
                    {creator?.bookCount}
                  </div>
                </div>
                <Image
                  src={creator?.photoURL}
                  // sizes="(max-width: 768px) 5vw,
                  // (max-width: 1200px) 5vw,
                  // 5vw"
                  // fill
                  width={100}
                  height={100}
                  alt="profile-image"
                  //onError={handleImageError}
                  className={
                    selectedCreator?.includes(creator?.name)
                      ? " max-w-xs h-10 w-10 rounded-full object-cover ring-4 ring-amber-500 shadow-lg shadow-slate-900"
                      : " max-w-xs h-10 w-10 rounded-full object-cover hover:ring-2 hover:ring-amber-500 shadow-lg shadow-slate-900"
                  }
                />
                <span className={ "scale-0 group-hover:scale-100 transition-all whitespace-nowrap  absolute -top-4 right-8 bg-slate-700 px-1 rounded text-white" }>
                    {" "}
                    {(creator?.name).length > 12
                      ? (creator?.name).substring(0, 10) + "..."
                      : creator?.name}
                  </span>
              </div>
            ))}
          </button>

          {/* Theme & Audio Filter */}

          <div className="md:flex md:justify-between w-full items-center pb-2 ">
            <ThemeDropdown />
            <AudioSwitch />
          </div>
        </div>
      </div>
    </div>
  );
};
