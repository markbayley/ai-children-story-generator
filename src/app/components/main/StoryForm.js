import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Menu } from "@headlessui/react";
import { SearchForm } from "./SearchForm";
import CreateForm from "./CreateForm";
import { FilterForm } from "./FilterForm";

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
  search,
  setSearch,
  setSearchQuery,
  searchQuery,
  handleSearch,
  setShowCreators,
  showCreators,
  allBooks,
  showWithAudio,
  setShowWithAudio,
  selectedTheme,
  setSelectedTheme,
  setTabSelected
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

  return (
    <>
      {search == "search" ? (
        <SearchForm
          setMessage={setMessage}
          theme={theme}
          setTheme={setTheme}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          setShowCreators={setShowCreators}
          showCreators={showCreators}
          allBooks={allBooks}
          search={search}
          setSearch={setSearch}
          setTabSelected={setTabSelected}
       
        />
      ) : search == "filter" ? (
        <FilterForm
        setMessage={setMessage}
        theme={theme}
        setTheme={setTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        setShowCreators={setShowCreators}
        showCreators={showCreators}
        allBooks={allBooks}
        showWithAudio={showWithAudio}
        setShowWithAudio={setShowWithAudio}
        selectedTheme={selectedTheme}
        setSelectedTheme={setSelectedTheme}
        search={search}
        setSearch={setSearch}
        setTabSelected={setTabSelected}
        />
      ) : (
        <CreateForm
          userPrompt={userPrompt}
          setUserPrompt={setUserPrompt}
          handleSubmit={handleSubmit}
          loading={loading}
          handleOpen={handleOpen}
          storyUnsaved={storyUnsaved}
          setMessage={setMessage}
        />
      )}
    </>
  );
};
