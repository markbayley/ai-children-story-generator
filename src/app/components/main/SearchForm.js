import {
  ArrowPathIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export const SearchForm = ({
  setMessage,
  theme,
  setTheme,
  searchQuery,
  setSearchQuery,
  handleSearch,
  uniqueCreatorsArray,
  setShowCreators,
  showCreators,
  allBooks,
}) => {
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
            {theme} Theme
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

  // const getBookCount = (creatorName) => {
  //  let userBooks = allBooks.filter((book) => book?.creatorName == creatorName)
  //  return userBooks.length
  // }
   

  return (
    <div
      className={
       "flex justify-start w-full lg:w-[45vw] xl:w-[35vw] 2.5xl:w-[30vw] 3xl:text-2xl px-2 py-0 md:py-4"
      }
    >
      <form onSubmit={handleSearch} className="mt-4 lg:mt-0 rounded-xl w-full">
        <div className="text-orange-300 ">
          <h1 className="font-bold font-antiqua text-5xl 2.5xl:text-7xl 3xl:text-8xl">
            Search
          </h1>
        </div>
        <h3 className="py-2 text-md font-normal text-white">
          Search stories by title or by creator name.
           {/* Enter some text in the
          input field below to find your favourite stories! */}
        </h3>
        <div className="flex items-center justify-center">
          <hr className="h-px  bg-orange-300 border-0  w-full" />{" "}
          <SparklesIcon className=" w-10 aspect-square mx-2 text-orange-300" />{" "}
          {/* <Image src={SparklesIcon} alt="sparkles-icon"  /> */}
          <hr className="h-px  bg-orange-300 border-0  w-full" />
        </div>

        <div className="flex w-full justify-between items-center pb-2 text-sm font-semibold ">
          <label
            htmlFor="prompt"
            className="block text-orange-300 text-sm font-semibold py-2 3xl:text-2xl"
          >
            {"Find a story about..."}
          </label>

          {searchQuery ? (
            <label
              onClick={() => {
                setSearchQuery("");
                setMessage({ text: "Search Cleared", type: "like" });
              }}
              htmlFor="prompt"
              className="group   text-orange-300 bg-transparent cursor-pointer "
            >
              <p className="flex items-center text-sm font-semibold hover:text-orange-200 3xl:text-2xl">
                Clear search{" "}
                <span className="flex items-center justify-center bg-sky-950 h-8 w-8 ml-1 font-bold border-2 rounded-full border-orange-300 text-lg group-hover:bg-orange-300 group-hover:text-sky-900 transition-colors duration-200">
                  <ArrowPathIcon className="h-5 w-5" />
                </span>
              </p>
            </label>
          ) : (
            <label
              onClick={() => {
                setShowCreators(!showCreators);
                // setSearchQuery("");
                // setMessage({ text: "Search Cleared", type: "like" });
              }}
              htmlFor="prompt"
              className="group   text-orange-300 bg-transparent cursor-pointer "
            >
              <p className="flex items-center text-sm font-semibold hover:text-orange-200 3xl:text-2xl">
                {showCreators ? "Hide creators?" : "Top creators?"}
                <span className="flex items-center justify-center bg-sky-950 h-8 w-8 ml-1 font-bold border-2 rounded-full border-orange-300 text-lg group-hover:bg-orange-300 group-hover:text-sky-900 transition-colors duration-200">
                  <UsersIcon className="h-5 w-5" />
                </span>
              </p>
            </label>
          )}
        </div>

        {showCreators ? (
          <div className="fade-in  text-white flex w-full justify-between items-end text-center cursor-pointer text-xs  h-16 ">
            {uniqueCreatorsArray.map((creator, index) => (
              <div
                onClick={() => {
                  setSearchQuery(creator?.name);
                  //setShowCreators(false);
                  setMessage({
                    text: "Search " + '"' + creator?.name + '"?',
                    type: "like",
                  });
                }}
                key={index}
                className="relative 2xl:mx-1  hover:text-orange-300 w-full flex flex-col items-center justify-center"
              >
                <div className="absolute -top-2 left-1 md:left-6 lg:left-3 3xl:left-6 h-5 w-5  flex justify-center items-center group rounded-full  bg-amber-500  text-white ">
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
                  width={50}
                  height={50}
                  alt="profile-image"
                  //onError={handleImageError}
                  className={ searchQuery == creator?.name ? "max-w-xs h-8 w-8 xl:h-12 xl:w-12 rounded-full object-cover ring-2 ring-orange-300" : "max-w-xs h-8 w-8 xl:h-12 xl:w-12 rounded-full object-cover hover:border-2 hover:border-orange-300"}
                />
                <span className={ searchQuery == creator?.name ? "text-orange-300" : " hover:text-orange-300" }>
                  {" "}
                  {(creator?.name).length > 7
                    ? (creator?.name).substring(0, 6) + "..."
                    : creator?.name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <input
            id="prompt"
            type="text"
            autoComplete="true"
            placeholder="A cute pet dinosaur"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="fade-in w-full p-2 rounded outline-none text-black placeholder-gray-500 bg-white text-[16px] 3xl:text-xl 3xl:py-4"
          />
        )}
        <div className="flex items-center text-[15px] gap-4 pt-4 3xl:text-xl ">
          <button
            type="submit"
            className={
              "font-semibold w-full text-white py-2 rounded-md bg-indigo-500 hover:bg-indigo-400 flex justify-center border-stone-700 3xl:py-4"
            }
          >
            Search
            <MagnifyingGlassIcon className="h-6 w-6 mx-2" />
          </button>
        </div>
      </form>
    </div>
  );
};
