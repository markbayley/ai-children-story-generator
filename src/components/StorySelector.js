import Image from "next/image";
import pic7 from "/public/pic7.jpg";
import { TrashIcon } from "@heroicons/react/24/solid";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export const StorySelector = ({
  myBooks,
  allBooks,
  extractTitleFromStory,
  handlePreviewMine,
  handlePreviewAll,
  myStoriesSelected,
  setMyStoriesSelected,
  handleLikeBook,
  userId,
  handleDeleteBook,
  setMessage
}) => {
  const PreviewContent = ({ book }) => {
    return (
      <>
        {/* User Icon */}
        <div className={ userId != book.userId ? "z-10 left-1 top-1 absolute rounded-tl-lg text-white border-2 border-amber-500 rounded-full bg-slate-700"
        : "z-10 left-1 top-1 absolute bg-amber-500 rounded-tl-lg text-white border-2 border-amber-500 rounded-full"
     } >
          {/* {userId == book.userId && */}
          <div className="flex items-center pr-1">
              
              <UserCircleIcon className="h-10 w-10 lg:h-6 lg:w-6" />
              {book?.displayName} {" "}
              </div>
         {/* } */}
       
        </div>
        {/* Likes Icon */}
        <button
          // onClick={(event) => {
          //   event.stopPropagation();
          //   handleDeleteBook(book.id);
          // }}
          className={ book?.likedBy?.includes(userId)  ? "z-10 right-1 top-1 absolute bg-teal-500 rounded-tl-full rounded-full rounded-br   text-white  border-2 border-teal-500 "
          :  "z-10 right-1 top-1 absolute hover:bg-teal-500 rounded-tl-full rounded-full rounded-br   hover:text-white text-teal-500 border-2 border-teal-500 bg-slate-700"
            }
        >
          <div className="relative h-10 w-10 lg:h-5 lg:w-5 rounded-full text-lg md:text-md lg:text-xs flex justify-center items-center text-center p-3 shadow-xl">
            <span className="absolute  left-0 top-0 text-white"></span>
            {book.likes}
          </div>
        </button>
        {/* Delete Icon */}
        <div
             onClick={(event) => {
            event.stopPropagation();
            handleDeleteBook(book.id);
          }}
          className="z-10 right-1 bottom-1 absolute hover:bg-pink-500 rounded text-pink-500 border-2 border-pink-500  bg-slate-700 hover:text-slate-700"
        >
          {userId == book.userId && (
            <TrashIcon className="h-10 w-10 lg:h-6 lg:w-6 p-1" />
          ) }
        </div>
        {/* Image */}
        <div className="bg-cover relative w-[100vw] aspect-square border-2  border-[#15161b] hover:border-2 transition ease-in-out hover:border-amber-500 duration-200 rounded-tr-xl flex items-end">
          {/* Title */}
          <h5 className="p-1 pr-2 absolute text-white tracking-wide font-light  z-10 bg-gradient-to-r from-sky-950 from-0% to-[#3c3232] to-100%  rounded-tr-full rounded-br-full px-1 border-b-2 border-gray-900 opacity-90 drop-shadow-2xl">
            {extractTitleFromStory(book.story) || "Untitled"}
          </h5>

          <Image
            src={pic7}
            // book.imageUrls && book.imageUrls.length > 0
            //   ? book.imageUrls[0]
            //   :
            alt="preview"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            cover="true"
            className={"rounded-tr-xl z-5"}
          />
        </div>
      </>
    );
  };




  return (
    <>
      <div className="mt-5 lg:mt-12 text-2xl px-5">
        {/* Stories Sorted By Likes */}
        <div className="font-antiqua   w-64  rounded-t-lg flex justify-center gap-2">
          <button
            className={
              !myStoriesSelected
                ? "text-teal-500 bg-slate-800  rounded-t-lg px-3 pb-1  border-x-2 border-t-2 border-teal-500"
                : "text-gray-500 hover:text-teal-500 bg-slate-800  rounded-t-lg px-3 pb-1 border-x border-t border-gray-500"
            }
            onClick={() => setMyStoriesSelected(false)}
          >
            Most Liked
          </button>
          {/* User Stories */}
          {/* {myBooks.length > 0 && ( */}
            <button
              className={
                myStoriesSelected
                  ? "text-amber-500 bg-slate-800  rounded-t-lg px-3  py-1 border-x-2 border-t-2 border-amber-500"
                  : "text-gray-500  hover:text-amber-500 bg-slate-800  rounded-t-lg px-3  py-1 border-x border-t border-gray-500"
              }
              onClick={myBooks.length > 0 ? () => setMyStoriesSelected(true) : () => setMessage("No Stories Created")}
            >
              My Stories
            </button>
          {/* )} */}
          {/* <button
            className={
              !myStoriesSelected
                ? "text-orange-300"
                : "text-white hover:text-orange-300"
            }
            onClick={() => setMyStoriesSelected(false)}
          >
            Favourites
          </button> */}
        </div>
        <div className="flex justify-start text-orange-300 ">
          {/* Map User Stories */}
          {myStoriesSelected ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6  gap-2 text-sm mb-3">
              {myBooks.map((book) => (
                <div
                  onClick={() => handlePreviewMine(book.id)}
                  key={book.id}
                  className="rounded relative flex items-end justify-center cursor-pointer ease-in duration-100 fade-in"
                >
                  <PreviewContent book={book} />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6  gap-2 text-sm mb-3">
              {/* Map All Stories */}
              {allBooks
                .slice()
                .sort((a, b) => (b.likes || 0) - (a.likes || 0))
                .slice(0, 6)
                .map((book) => (
                  <div
                    onClick={() => handlePreviewAll(book.id)}
                    key={book.id}
                    className="rounded relative flex items-end justify-center cursor-pointer  ease-in duration-100 fade-in"
                  >
                    <PreviewContent book={book} />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
