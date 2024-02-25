// "use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useEffect, useState } from "react";
import Profile from "../profile/page";
import Authy from "../auth/page";
import {
  ArrowPathIcon,
  InformationCircleIcon,
  MinusIcon,
  ShareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
// import { InstagramEmbed } from 'react-social-media-embed';
import SharingLinks from "./SharingLinks"

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
  page
}) => {
  const [user] = useAuthState(auth);
  const [userStatus, setUserStatus] = useState(false);

  const messageColor = (type) => {
    switch (type) {
      case "save":
        return "bg-rose-500 hover:bg-rose-400";
      case "like":
        return "bg-teal-500 hover:bg-teal-400";
      case "delete":
        return "bg-rose-500 hover:bg-rose-400";
      case "error":
        return "bg-rose-500 hover:bg-rose-400";
      case "info":
        return "bg-amber-500 hover:bg-amber-400";
      case "share":
        return "bg-indigo-500 hover:bg-indigo-400";
      case "create":
        return "bg-amber-500 hover:bg-amber-400";
      // default:
      //   return "text-amber-500"; // Default color
    }
  };

  // const [counting, setCounting] = useState(false);

  // useEffect(() => {

  //   let timer = setInterval(() => {
  //     setTime((time) => {
  //       if (time === 0) {
  //         clearInterval(timer);

  //         return 0;
  //       } else return time - 1;
  //     });
  //   }, 1000);
  // }, []);

  // ) : loading ? (
  //   <span className="flex items-center justify-center px-4  text-lg border-2  rounded-full">
  //     {`${time % 60}`}
  //   </span>
  {
    /* <Image src={pic7} alt="logo" className="rounded-full h-12 w-12 " /> */
  }

  /////

  // console.log("audioRef", audioRef);

  // const audioPage =  Math.round(
  //   (audioRef?.current?.currentTime /
  //     audioRef?.current?.duration) *
  //     audioPages
  // )

  return (
    <div className=" cursor-pointer text-white p-2 flex justify-between text-sm 3xl:p-6 fixed top-0 w-full z-20 md:bg-transparent bg-sky-950">
      {/* Share Icons */}
      <div className="w-1/6 md:w-1/3 group flex items-center justify-start relative ">
        <div>
          {show ? (
            <div>
              <MinusIcon
                className="max-w-xs h-12 w-12 3xl:h-16 3xl:w-16 p-3 ring-1 ring-inset ring-gray-300 rounded-full fade-in bg-sky-950 hover:bg-sky-900"
                onClick={() => setShow(false)}
              />
              <span className="scale-0 group-hover:scale-100 transition-all absolute top-4 left-14">
                Close
              </span>
            </div>
          ) : (
            <div>
              <span className="scale-0 group-hover:scale-100 transition-all absolute top-4 left-14">
                Open
              </span>
              <ShareIcon
                className="h-12 w-12 3xl:h-16 3xl:w-16 p-3 ring-1 ring-inset ring-gray-300 rounded-full fade-in shadow-md hover:shadow-lg hover:bg-sky-900 hover:shadow-indigo-500/50 shadow-indigo-500/30 bg-sky-950"
                onClick={() => setShow(true)}
              />
            </div>
          )}
        </div>
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
            <FaInstagram className="h-9 w-9 p-1 3xl:h-12 3xl:w-12" />
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
            url='www.inblockdesign.com'
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
            <ShareIcon className="h-9 w-9 p-1 3xl:h-12 3xl:w-12" />
            <span className="scale-0 group-hover:scale-100 transition-all absolute top-2 left-12">
              Share
            </span>
          </div>
          <div
            onClick={resetStory}
            className="group  max-w-xs text-sm bg-sky-950 hover:bg-indigo-500 hover:text-white rounded-md relative cursor-pointer"
            role="alert"
          >
            <ArrowPathIcon className="h-9 w-9 p-1 3xl:h-12 3xl:w-12" />
            <span className="scale-0 group-hover:scale-100 transition-all absolute top-2 left-12">
              Reset
            </span>
          </div>
        
        </div>
      )}

      {/* Message Feature */}
      <div className="flex justify-center md:w-1/3 ">


        {message && message.text != "" ? (
          <div
            onClick={() => setMessage({ text: "", type: "" })}
            className={` pr-8 flex relative items-center text-sm md:text-[16px] cursor-pointer ${messageColor(
              message.type
            )} rounded-full rounded-bl-lg shadow-lg `}
          >
            <InformationCircleIcon className="h-6 w-6 mx-2 3xl:h-9 3xl:w-9" />{" "}
            <span className="text-sm font-semibold 3xl:text-xl 3xl:p-4">
              {message.text}
            </span>
            <XMarkIcon className="h-4 w-4 absolute top-1 right-2  3xl:h-6 3xl:w-6 mr-1" />
          </div>
        ) :  (audio && audio != null && open) ? (
          <div
           // onClick={() => setMessage({ text: "", type: "" })}
            className={` pr-8 flex relative items-center text-sm md:text-[16px] cursor-pointer bg-sky-950 text-white hover:bg-sky-900 rounded-full rounded-bl-lg shadow-lg `}
          >
            <InformationCircleIcon className="h-6 w-6 mx-2  3xl:h-9 3xl:w-9" />{" "}
            <span className="text-sm font-semibold 3xl:text-xl 3xl:py-4 text-left ">
              {/* //selectedBook?.audioUrl == undefined ? "No Audio" : */}
              { playing 
                ? "Playing Page " + audioPage
                  // Math.round(
                  //   (audioRef?.current?.currentTime /
                  //     audioRef?.current?.duration) *
                  //     audioPages
                  // )
                  : page == audioPages+1 ? "Story Finished!"
                 : "Audio Paused"}
            </span>
            <XMarkIcon className="h-4 w-4 absolute top-1 right-2 3xl:h-6 3xl:w-6 mr-1" />
          </div>
        ) : ( "" )}


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
