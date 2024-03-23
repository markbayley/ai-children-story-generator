import { SearchForm } from "./SearchForm";
import CreateForm from "./CreateForm";
import { FilterForm } from "./FilterForm";

export const FormIndex = ({
  userPrompt,
  setUserPrompt,
  handleSubmit,
  setMessage,
  loading,
  handleOpen,
  storyUnsaved,
  unsavedTheme,
  setUnsavedTheme,
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
  setTabSelected,
  selectedCreator,
  setSelectedCreator,
  setSearchResults,
  //handleFilter,
  createWithAudio,
  setCreateWithAudio,
  tabSelected
  
}) => {

  return (
    <>
      {search == "search" ? (
        <SearchForm
          setMessage={setMessage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          setShowCreators={setShowCreators}
          showCreators={showCreators}
          allBooks={allBooks}
          search={search}
          setSearch={setSearch}
          setTabSelected={setTabSelected}
          setShowWithAudio={setShowWithAudio}
          setSelectedTheme={setSelectedTheme}
          setSearchResults={setSearchResults}
          tabSelected={tabSelected}
        />
      ) : search == "filter" ? (
        <FilterForm
          setMessage={setMessage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          // handleSearch={handleSearch}
          //handleFilter={handleFilter}
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
          selectedCreator={selectedCreator}
          setSelectedCreator={setSelectedCreator}
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
          unsavedTheme={unsavedTheme}
          setUnsavedTheme={setUnsavedTheme}
          createWithAudio={createWithAudio}
          setCreateWithAudio={setCreateWithAudio}
          tabSelected={tabSelected}
        />
      )}
    </>
  );
};
