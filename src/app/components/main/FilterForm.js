import { useState } from "react";
import { Switch } from "@headlessui/react";
import {
  ArrowPathIcon,
  ChevronDownIcon,
  FunnelIcon,
  KeyIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { Menu } from "@headlessui/react";

export const FilterForm = ({
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
  //audioQuery,
  //setAudioQuery,
  showWithAudio,
  setShowWithAudio,
  selectedTheme,
  setSelectedTheme
}) => {
  function ThemeDropdown() {
    return (
      <div className="text-sm  font-semibold ">

     {/* Filter by theme */}
     <div className="flex justify-between text-orange-300 hover:text-amber-500 text-sm  font-semibold gap-2">
      Theme
        {['Spooky', 'Funny', 'Cute', 'Weird', 'Adventure'].map(theme => (
          <button
            key={theme}
            // style={{ fontWeight: theme === selectedTheme ? 'bold' : 'normal' }}
            onClick={() => handleSelectTheme(theme)}
            className={ theme == selectedTheme ? " text-white bg-amber-500 rounded-full py-1 px-2 font-normal text-xs " : " text-white  rounded-full py-1 px-2 font-normal text-xs bg-slate-700"}
          >
            {theme}
          </button>
        ))}
      </div>



        {/* <Menu>
          <Menu.Button
            className={
              "flex justify-between text-orange-300 hover:text-amber-500  "
            }
          >
            <div className="flex relative"> </div>
            <ChevronDownIcon className="h-5 w-5 mr-2 text-orange-300" />
            {selectedTheme} Theme
          </Menu.Button>
      
          <Menu.Items
            className={
              "flex  text-white justify-between  z-30 ml-5 -mt-6 absolute  bg-sky-950 rounded  leading-loose"
            }
          >
            <div className="flex justify-between ">
              <Menu.Item>
                <button
                  onClick={() => setSelectedTheme("Spooky")}
                  className={"mx-2 hover:text-orange-300"}
                >
                  Spooky
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={() => setSelectedTheme("Pretty")}
                  className={"mx-2 hover:text-orange-300"}
                >
                  Pretty
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={() => setSelectedTheme("Funny")}
                  className={"mx-2 hover:text-orange-300"}
                >
                  Funny
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={() => setSelectedTheme("Cute")}
                  className={"mx-2 hover:text-orange-300"}
                >
                  Cute
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={() => setSelectedTheme("Weird")}
                  className={"mx-2 hover:text-orange-300"}
                >
                  Weird
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu> */}
      </div>
    );
  }

  // const handleToggleAudio = () => {
  //     setShowWithAudio(!showWithAudio);
  //   };

  const handleSelectTheme = (theme) => {
    setSelectedTheme(theme === selectedTheme ? null : theme);
  };


  function AudioSwitch() {
    //const [enabled, setEnabled] = useState(false)

    return (
      <div className=" text-orange-300 flex items-center text-sm font-semibold">
        Audio
        <Switch
          checked={showWithAudio}
          onChange={setShowWithAudio}
          className={`${showWithAudio ? "bg-amber-500" : "bg-slate-600"}
        mx-2  relative inline-flex h-[24px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${showWithAudio ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
        {/* { enabled ?   <button onClick={() => setAudioQuery("")}  type="submit">No Audio</button>
    :  <button onClick={() => setAudioQuery("audio")}  type="submit">Audio</button>} */}
      </div>
    );
  }

  return (
    <div
      className={
        "flex justify-start w-full lg:w-[45vw] xl:w-[35vw] 2.5xl:w-[30vw] 3xl:text-2xl px-2 py-0 md:py-4"
      }
    >
      <form onSubmit={handleSearch} className="mt-4 lg:mt-0 rounded-xl w-full">
        <div className="text-orange-300 ">
          <h1 className="font-bold font-antiqua text-5xl 2.5xl:text-7xl 3xl:text-8xl">
            Filter
          </h1>
        </div>
        <h3 className="py-2 text-md font-normal text-white">
          Filter stories by our top creators. Enter a search prompt in the input
          field below to find your favourite story titles.
          {/*  */}
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
            Top Creators
          </label>

          {searchQuery ? (
            <button
              type="submit"
              onClick={() => {
                setSearchQuery("");
                setMessage({ text: "Search Cleared", type: "like" });
              }}
              htmlFor="prompt"
              className="group   text-orange-300 bg-transparent cursor-pointer "
            >
              <p className="flex items-center text-sm font-semibold hover:text-orange-200 3xl:text-2xl">
                Clear filter{" "}
                <span className="flex items-center justify-center bg-sky-950 h-8 w-8 ml-1 font-bold border-2 rounded-full border-orange-300 text-lg group-hover:bg-orange-300 group-hover:text-sky-900 transition-colors duration-200">
                  <ArrowPathIcon className="h-5 w-5" />
                </span>
              </p>
            </button>
          ) : (
            <button
              type="submit"
              onClick={() => {
                setShowCreators(!showCreators);
                // setSearchQuery("");
                // setMessage({ text: "Search Cleared", type: "like" });
              }}
              htmlFor="prompt"
              className="group   text-orange-300 bg-transparent cursor-pointer "
            >
              <p className="flex items-center text-sm font-semibold hover:text-orange-200 3xl:text-2xl">
                {showCreators ? "Search by keyword" : "Search by creator"}
                <span className="flex items-center justify-center bg-sky-950 h-8 w-8 ml-1 font-bold border-2 rounded-full border-orange-300 text-lg group-hover:bg-orange-300 group-hover:text-sky-900 transition-colors duration-200">
                  {showCreators ? (
                    <KeyIcon className="h-5 w-5" />
                  ) : (
                    <UsersIcon className="h-5 w-5" />
                  )}
                </span>
              </p>
            </button>
          )}
        </div>

        <button
          type="submit"
          className="fade-in  text-white flex w-full justify-between items-start text-center cursor-pointer text-xs  h-16 "
        >
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
                  searchQuery == creator?.name
                    ? "max-w-xs h-12 w-12 rounded-full object-cover ring-4 ring-amber-500"
                    : "max-w-xs h-8 w-8 xl:h-12 xl:w-12 rounded-full object-cover hover:border-2 hover:border-orange-300"
                }
              />
              {/* <span className={ searchQuery == creator?.name ? "text-orange-300" : " hover:text-orange-300" }>
                    {" "}
                    {(creator?.name).length > 7
                      ? (creator?.name).substring(0, 6) + "..."
                      : creator?.name}
                  </span> */}
            </div>
          ))}
        </button>

        <div className="flex justify-between w-full items-center pb-2">
          <ThemeDropdown />
          <AudioSwitch />
        </div>

        {/* Toggle switch for audio availability */}
        {/* <label className="pt-4 text-orange-300 flex items-center text-sm font-semibold">
       Audio
        <input
          type="checkbox"
          checked={showWithAudio}
          onChange={handleToggleAudio}
          className="m-2 h-5 w-5"
        />
      </label> */}
        {/* <div className="flex items-center text-[15px] gap-4 pt-4 3xl:text-xl ">
            <button
              type="submit"
              className={
                "font-semibold w-full text-white py-2 rounded-md bg-blue-500 hover:bg-blue-400 flex justify-center border-stone-700 3xl:py-4"
              }
            >
              Filter
              <FunnelIcon className="h-6 w-6 mx-2" />
            </button>
          </div> */}
      </form>
    </div>
  );
};
