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
  setTabSelected,
  selectedCreator,
  setSelectedCreator,
  setSearchResults,
  //handleFilter
  
}) => {

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
          setShowWithAudio={setShowWithAudio}
          setSelectedTheme={setSelectedTheme}
          setSearchResults={setSearchResults}
        />
      ) : search == "filter" ? (
        <FilterForm
          setMessage={setMessage}
          theme={theme}
          setTheme={setTheme}
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
        />
      )}
    </>
  );
};
