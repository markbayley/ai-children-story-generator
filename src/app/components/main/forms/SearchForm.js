import {
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

export const SearchForm = ({
  setMessage,
  searchQuery,
  setSearchQuery,
  handleSearch,
  setShowWithAudio,
  setSelectedTheme,
  setSearchResults,
  setTabSelected,
  tabSelected,

  showForm,
  setShowForm
}) => {
  return (
    <div
      className={
        "fade-in flex justify-start w-full lg:w-[45vw] xl:w-[35vw] 2.5xl:w-[30vw] 3xl:text-2xl px-2 py-0 md:pt-4"
      }
    >
      <form onSubmit={handleSearch} className="mt-4 lg:mt-0 rounded-xl w-full">

      <div className="text-orange-300 md:flex w-full justify-between items-center ">
        <div className="text-orange-300 ">
          <h1 className="font-bold font-antiqua text-5xl 2.5xl:text-7xl 3xl:text-8xl">
            Search
          </h1>
        </div>


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

        {/* <div className="flex items-end justify-start  md:justify-between text-sm 3xl:text-xl bg-sky-950 py-2 px-3 rounded-md shadow-md shadow-slate-900 ">
          <div onChange={() => setTabSelected("Search")}  className="flex items-center">
    <input id="radio1" type="radio" name="radio" className="hidden" defaultChecked />
    <label htmlFor="radio1" className="flex items-center cursor-pointer font-semibold">
     <span className="w-5 h-5 inline-block mr-1 rounded-full border-2 border-amber-500"></span>
     Search</label>
   </div>

   <div onChange={() => setTabSelected("Filter")} className="flex items-center ml-6">
    <input id="radio2" type="radio" name="radio" className="hidden"  />
    <label htmlFor="radio2" className="flex items-center cursor-pointer font-semibold">
     <span className="w-5 h-5 inline-block mr-1 rounded-full border-2 border-amber-500"></span>
     Filter</label>
   </div>

   </div> */}

</div>


        <h3 className="py-2 text-md font-normal text-white">
          Enter a search prompt in the input field to find a book.
           {/* Filter stories by the creator name, story theme, or by audiobook content. */}
        </h3>
        <div className="flex items-center justify-center">
          <hr className="h-px  bg-orange-300 border-0  w-full" />{" "}
          <SparklesIcon className=" w-10 aspect-square mx-2 text-orange-300" />{" "}
          <hr className="h-px  bg-orange-300 border-0  w-full" />
        </div>

  { showForm &&   
<>
        <div className="flex w-full justify-between items-center pb-2 text-sm font-semibold ">
          <label
            htmlFor="prompt"
            className="block text-orange-300 text-sm font-semibold py-2 3xl:text-2xl"
          >
            Find a story about...
          </label>

          {/* Reset Button */}
          {searchQuery ? (
            <label
              onClick={() => {
                setSearchQuery("");
                setSearchResults([])
                setMessage({ text: "Search Cleared", type: "like" });
              }}
              htmlFor="prompt"
              className="group  fade-in text-orange-300 bg-transparent cursor-pointer "
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
              htmlFor="prompt"
              className="group   text-gray-500 bg-transparent cursor-pointer "
            >
              <p className="flex items-center text-sm font-semibold  3xl:text-2xl">
                <span className="flex items-center justify-center bg-sky-950 h-8 w-8 ml-1 font-bold border-2 rounded-full border-gray-500 text-lg transition-colors duration-200">
                  <ArrowPathIcon className="h-5 w-5" />
                </span>
              </p>
            </label>
          )}
        </div>

        {/* Search Input */}
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

        {/* Search Button */}
        <div className="fade-in flex items-center text-[15px] gap-4 pt-4 3xl:text-xl ">
          <button
            type="submit"
            className={
              "font-semibold w-full text-white py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 flex justify-center border-stone-700 3xl:py-4"
            }
          >
            Search
            <MagnifyingGlassIcon className="h-6 w-6 mx-2" />
          </button>
        </div>
        </>

        }
      </form>
    </div>
  );
};
