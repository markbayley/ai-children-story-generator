import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { useState } from "react";
import Profile from "./profile/page";
import Authy from "../../auth/page";
import Image from "next/image";
import InfoIcon from "/public/InfoIcon.svg";
import CloseIcon from "/public/CloseIcon.svg";
import {
  FunnelIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";

export const NavIndex = ({
  message,
  setMyBooks,
  setUserId,
  setMyStoriesSelected,
  setMessage,
  show,
  setShow,
  selectedBook,
  audio,
  audioPages,
  audioPage,
  playing,
  open,
  page,
  audioRef,
 // setSearch,
 // search,
  setTabSelected,
  tabSelected,
  loading
}) => {
  const [user] = useAuthState(auth);
  const [userStatus, setUserStatus] = useState(false);

  const messageColor = (type) => {
    switch (type) {
      case "save":
        return "fade-in bg-gradient-to-r from-rose-500/10 to-rose-500";
      case "delete":
        return "fade-in bg-gradient-to-r from-rose-500/10 to-rose-500";
      case "error":
        return "fade-in bg-gradient-to-r from-rose-500/10 to-rose-500";
      case "like":
        return "fade-in bg-gradient-to-r from-teal-500/10 to-teal-500";
      case "view":
        return "fade-in bg-gradient-to-r from-fuchsia-500/10 to-fuchsia-500";
      case "share":
        return "fade-in bg-gradient-to-r from-indigo-500/10 to-indigo-500";
        case "audio":
          return "fade-in bg-gradient-to-r from-blue-500/10 to-blue-500";
      case "create":
        return "fade-in bg-gradient-to-r from-amber-500/10 via-amber-500/75 to-amber-500";
      default:
        return "fade-in bg-gradient-to-r from-indigo-500/10 to-indigo-500"; // Default color
    }
  };

  return (
    <div className=" cursor-pointer text-white p-2 flex justify-between text-sm fixed top-0 w-full z-20 md:bg-transparent bg-sky-950">
      {/* Share Icons */}
      <div className="w-1/6 md:w-1/3 group flex items-center justify-start relative ">
        {show ? (
          <div className="fade-in border-4 2.5xl:border-8 hover:border-sky-900 border-sky-950 bg-sky-950 rounded-full hover:bg-sky-900 lg:shadow-lg lg:shadow-slate-950">
            <MinusIcon className="icon" onClick={() => setShow(false)} />
          </div>
        ) : (
          <div
            onClick={() => setShow(true)}
            className="fade-in border-4 2.5xl:border-8 hover:border-sky-900 border-sky-950 bg-sky-950 rounded-full hover:bg-sky-900 lg:shadow-lg lg:shadow-slate-950"
          >
            {tabSelected == "Search" ? (
              <MagnifyingGlassIcon className="icon" />
            ) : tabSelected == "Filter" ? (
              <FunnelIcon className="icon" />
            ) : (
              <HomeIcon className="icon" />
            )}
          </div>
        )}
      </div>

      {show && (
        <div className="backdrop-blur-md bg-sky-950/30 md:bg-transparent  p-2 lg:p-1  fade-in z-10 left-1 top-14 lg:left-2 2.5xl:top-20 2.5xl:left-3  3xl:top-28 lg:pb-5 absolute flex flex-col justify-start xl:justify-end items-center  gap-6 3xl:gap-12 w-auto mt-2  ">
          <a
            onClick={() => {
             // setSearch("off");
              setTabSelected("Explore");
              setShow(false);
              setMessage({ text: "Explore Selected", type: "create" });
            }}
            className={
              tabSelected == "Explore"
                ? "group  max-w-xs   bg-sky-900 hover:bg-sky-900 hover:text-white rounded-md relative cursor-pointer"
                : "group  max-w-xs   bg-sky-950 hover:bg-sky-900   hover:text-white rounded-md relative cursor-pointer"
            }
          >
            <HomeIcon className="icon p-2 2.5xl:p-3" />
            <span className="scale-0  text-xs 2.5xl:text-md 3xl:text-lg group-hover:scale-100 transition-all absolute top-2 left-12 2.5xl:left-14 2.5xl:top-3 3xl:left-20 3xl:top-4 bg-sky-950 p-1 rounded">
              Home
            </span>
          </a>

          <a
            onClick={() => {
             // setSearch("search");
              setTabSelected("Search");
              setShow(false);
              setMessage({ text: "Search Selected", type: "share" });
            }}
            className={
              tabSelected == "Search"
                ? "group  max-w-xs   bg-sky-900 hover:bg-sky-900 hover:text-white rounded-md relative cursor-pointer"
                : "group  max-w-xs   bg-sky-950 hover:bg-sky-900   hover:text-white rounded-md relative cursor-pointer"
            }
          >
            <MagnifyingGlassIcon className="icon p-2 2.5xl:p-3" />
            <span className="scale-0  text-xs 2.5xl:text-md 3xl:text-lg group-hover:scale-100 transition-all absolute top-2 left-12 2.5xl:left-14 3xl:left-20 2.5xl:top-3 3xl:top-4 bg-sky-950 p-1 rounded">
              Search
            </span>
          </a>

          <a
            onClick={() => {
              setTabSelected("Filter");
              setShow(false);
              setMessage({ text: "Filter Selected", type: "share" });
            }}
            className={
              tabSelected == "Filter"
                ? "group  max-w-xs  bg-sky-900 hover:bg-sky-900 hover:text-white rounded-md relative cursor-pointer"
                : "group  max-w-xs  bg-sky-950 hover:bg-sky-900  hover:text-white rounded-md relative cursor-pointer"
            }
          >
            <FunnelIcon className="icon p-2 2.5xl:p-3" />
            <span className="scale-0  text-xs 2.5xl:text-md 3xl:text-lg group-hover:scale-100 transition-all absolute top-2 left-12 2.5xl:left-14  3xl:left-20 2.5xl:top-3 3xl:top-4 bg-sky-950 p-1 rounded">
              Filter
            </span>
          </a>
        </div>
      )}

      {/* Message Feature */}
      <div className="flex justify-center md:w-1/3 ">
   
        {message && message.text != "" ? (
          <div
            onClick={() => setMessage({ text: "", type: "" })}
            className={`fade-in transition-all pr-8 flex relative items-center cursor-pointer hover:bg-gray-700 ${messageColor(
              message.type
            )} rounded-full rounded-tl-lg shadow-lg `}
          >
            <Image
              src={InfoIcon}
              alt="info-icon"
              className="h-6 aspect-square mx-2 2.5xl:h-9 2.5xl:w-9"
            />{" "}
            <span className="text-sm font-semibold 2.5xl:text-lg 3xl:text-xl 2.5xl:pr-2">
              {message.text}
             
            </span>
            <Image
              src={CloseIcon}
              alt="close-icon"
              className="h-4 w-4 absolute top-1 right-2 2.5xl:h-6 2.5xl:w-6 mr-1"
            />
          
          </div>
        ) : (selectedBook?.audioUrl || audio) &&
          audioRef?.current?.duration > 0 &&
          open ? (
          <div
            // onClick={() => setMessage({ text: "", type: "" })}
            className={`fade-in pr-8 flex relative items-center text-sm md:text-[16px] cursor-pointer bg-gradient-to-r from-sky-950 to-blue-600 text-white hover:bg-sky-900 rounded-full rounded-tl-lg `}
          >
            <Image
              src={InfoIcon}
              alt="info-icon"
              className="h-6 w-6 mx-2 3xl:h-9 3xl:w-9"
            />{" "}
            {/* //selectedBook?.audioUrl == undefined ? "No Audio" : */}
            <span className="text-sm font-semibold 2.5xl:text-lg 3xl:text-xl 3xl:py-4 text-left ">
              {playing
                ? "Playing Page " + audioPage
                : page == audioPages + 1
                ? "Story Finished!"
                : "Audio Paused"}
            </span>
            <Image
              src={CloseIcon}
              alt="close-icon"
              className="h-4 w-4 absolute top-1 right-2 3xl:h-6 3xl:w-6 mr-1"
            />
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Account Status */}
      <div className="md:w-1/3 md:flex md:justify-end">
        {user ? (
          <Profile
            user={user}
            setMyBooks={setMyBooks}
            setUserId={setUserId}
            setMyStoriesSelected={setMyStoriesSelected}
            setMessage={setMessage}
          />
        ) : (
          <Authy
            userStatus={userStatus}
            setUserStatus={setUserStatus}
            setMessage={setMessage}
          />
        )}
      </div>
    </div>
  );
};
