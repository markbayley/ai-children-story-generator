// "use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useEffect, useState } from "react";
import Profile from "../profile/page";
import Authy from "../auth/page";
import Image from "next/image";
import InfoIcon from "/public/InfoIcon.svg";
import CloseIcon from "/public/CloseIcon.svg";
import {
  ArrowPathIcon,
  InformationCircleIcon,
  MinusIcon,
  //ShareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaPinterest,
  FaReddit,
  FaYoutube,
  FaFacebookMessenger,
  FaSnapchat,
  FaLine,
  FaLinkedin,
} from "react-icons/fa";
import share from "/public/share.svg";
import SharingLinks from "./SharingLinks";

export const StatusBar = ({
  resetStory,
  message,
  setMyBooks,
  setUserId,
  setMyStoriesSelected,
  setMessage,
  show,
  setShow,
  setShared,
  handleShareBook,
  selectedBook,
  userId,
  loading,
  audio,
  audioPages,
  audioPage,
  playing,
  open,
  page,
  audioRef
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
        return "fade-in bg-gradient-to-r from-amber-500/10 via-amber-500/75 to-amber-500";
      case "share":
        return "fade-in bg-gradient-to-r from-indigo-500/10 to-indigo-500";
      case "create":
        return "fade-in bg-gradient-to-r from-amber-500/10 via-amber-500/75 to-amber-500";
      default:
        return "fade-in bg-gradient-to-r from-indigo-500/10 to-indigo-500"; // Default color
    }
  };

  return (
    <div className=" cursor-pointer text-white p-2 flex justify-between text-sm 2.5xl:p-4 3xl:p-6 fixed top-0 w-full z-20 lg:bg-transparent bg-sky-950">
      {/* Share Icons */}
      <div className="w-1/6 md:w-1/3 group flex items-center justify-start relative ">
        {show ? (
          <div>
            <MinusIcon
              className="max-w-xs h-12 w-12 3xl:h-16 3xl:w-16 p-3  rounded-full fade-in bg-sky-950 hover:bg-sky-900 lg:shadow-lg lg:shadow-slate-950"
              onClick={() => setShow(false)}
            />
            <span className="scale-0 group-hover:scale-100 transition-all absolute top-4 left-14">
              Close
            </span>
          </div>
        ) : (
          <div onClick={() => setShow(true)}>
            <span className="scale-0 group-hover:scale-100 transition-all absolute top-4 left-14">
              Open
            </span>
            <Image
              src={share}
              alt="share-icon"
              width={12}
              height={12}
              className="max-w-xs h-12 w-12 3xl:h-16 3xl:w-16 p-3 rounded-full fade-in hover:bg-sky-900 lg:shadow-lg lg:shadow-slate-950 bg-sky-950"
            />
          </div>
        )}
      </div>

      {show && (
        <div className="backdrop-blur-md bg-sky-950/30 md:bg-transparent  p-2 lg:p-1 fade-in z-10 left-1 lg:left-2 3xl:left-6 top-16 3xl:top-28 lg:pb-5 absolute flex flex-col justify-start xl:justify-end items-center  gap-8 3xl:gap-12 w-auto mt-2  ">
          {/* <SharingLinks media={selectedBook?.imageUrls[0]} description={selectedBook?.story[0-100]}/> */}
          <a
            href="https://www.instagram.com"
            target="_blank"
            onClick={() => handleShareBook(selectedBook?.id, userId)}
            className={
              selectedBook?.sharedBy?.includes(userId)
                ? "group max-w-xs text-sm bg-indigo-500 text-white rounded-md relative cursor-pointer"
                : "group max-w-xs text-sm bg-sky-950 hover:bg-indigo-500 hover:text-white rounded-md relative cursor-pointer"
            }
          >
            <FaInstagram className="h-9 w-9 p-2 3xl:h-12 3xl:w-12" />
            <span className="scale-0 group-hover:scale-100 transition-all absolute top-2 left-12">
              Instagram
            </span>
          </a>

          <a
            href="https://www.facebook.com"
            target="_blank"
            className="group max-w-xs  text-sm bg-sky-950 hover:bg-indigo-500 hover:text-white rounded-md relative cursor-pointer"
            role="alert"
            quote="testing"
            hashtag="#storybookApp"
          >
            <FaFacebook className="h-9 w-9 p-2 3xl:h-12 3xl:w-12" />
            <span className="scale-0 group-hover:scale-100 transition-all absolute top-2 left-12">
              Facebook
            </span>
          </a>

          <a
            href="https://www.twitter.com"
            target="_blank"
            url="www.inblockdesign.com"
            className="group  max-w-xs  text-sm bg-sky-950 hover:bg-indigo-500 hover:text-white rounded-md relative cursor-pointer"
            role="alert"
          >
            <FaTwitter className="h-9 w-9 p-2 3xl:h-12 3xl:w-12" />
            <span className="scale-0 group-hover:scale-100 transition-all absolute top-2 left-12">
              Twitter
            </span>
          </a>

          <div
            className="group  max-w-xs  text-sm bg-sky-950 hover:bg-indigo-500 hover:text-white rounded-md relative cursor-pointer"
            role="alert"
          >
            <FaYoutube className="h-9 w-9 p-2 3xl:h-12 3xl:w-12" />
            <span className="scale-0 group-hover:scale-100 transition-all absolute top-2 left-12">
              YouTube
            </span>
          </div>

          <div
            className="group  max-w-xs  text-sm bg-sky-950 hover:bg-indigo-500 hover:text-white rounded-md relative cursor-pointer"
            role="alert"
          >
            <FaFacebookMessenger className="h-9 w-9 p-2 3xl:h-12 3xl:w-12" />
            <span className="scale-0 group-hover:scale-100 transition-all absolute top-2 left-12">
              Messenger
            </span>
          </div>

          <div
            className="group  max-w-xs  text-sm bg-sky-950 hover:bg-indigo-500 hover:text-white rounded-md relative cursor-pointer"
            role="alert"
          >
            <FaPinterest className="h-9 w-9 p-2 3xl:h-12 3xl:w-12" />
            <span className="scale-0 group-hover:scale-100 transition-all absolute top-2 left-12">
              Pinterest
            </span>
          </div>

          <div
            className="group  max-w-xs  text-sm bg-sky-950 hover:bg-indigo-500 hover:text-white rounded-md relative cursor-pointer"
            role="alert"
          >
            <FaReddit className="h-9 w-9 p-2 3xl:h-12 3xl:w-12" />
            <span className="scale-0 group-hover:scale-100 transition-all absolute top-2 left-12">
              Reddit
            </span>
          </div>

          <div
            className="group  max-w-xs  text-sm bg-sky-950 hover:bg-indigo-500 hover:text-white rounded-md relative cursor-pointer"
            role="alert"
          >
            <FaSnapchat className="h-9 w-9 p-2 3xl:h-12 3xl:w-12" />
            <span className="scale-0 group-hover:scale-100 transition-all absolute top-2 left-12">
              SnapChat
            </span>
          </div>

          <div
            className="group  max-w-xs  text-sm bg-sky-950 hover:bg-indigo-500 hover:text-white rounded-md relative cursor-pointer"
            role="alert"
          >
            <FaLinkedin className="h-9 w-9 p-2 3xl:h-12 3xl:w-12" />
            <span className="scale-0 group-hover:scale-100 transition-all absolute top-2 left-12">
              Linkedin
            </span>
          </div>
          {/* <div
            onClick={resetStory}
            className="group  max-w-xs text-sm bg-sky-950 hover:bg-indigo-500 hover:text-white rounded-md relative cursor-pointer"
            role="alert"
          >
            <ArrowPathIcon className="h-9 w-9 p-2 3xl:h-12 3xl:w-12" />
            <span className="scale-0 group-hover:scale-100 transition-all absolute top-2 left-12">
              Reset
            </span>
          </div> */}
        </div>
      )}

      {/* Message Feature */}
      <div className="flex justify-center md:w-1/3 ">
        {message && message.text != "" ? (
          <div
            onClick={() => setMessage({ text: "", type: "" })}
            className={`fade-in transition-all pr-8 flex relative items-center text-sm md:text-[16px] cursor-pointer  hover:bg-gray-700 ${messageColor(
              message.type
            )} rounded-full rounded-tl-lg shadow-lg `}
          >
            <Image
              src={InfoIcon}
              alt="info-icon"
              className="h-6 aspect-square mx-2 3xl:h-9 3xl:w-9"
            />{" "}
            <span className="text-sm font-semibold 3xl:text-xl 3xl:p-4">
              {message.text}
            </span>
            <Image
              src={CloseIcon}
              alt="close-icon"
              className="h-4 aspect-square absolute top-1 right-2 3xl:h-6 3xl:w-6 mr-1"
            />
          </div>
        ) : (selectedBook?.audioUrl || audio) && audioRef?.current?.duration > 0 && open ? (
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
            <span className="text-sm font-semibold 3xl:text-xl 3xl:py-4 text-left ">
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
