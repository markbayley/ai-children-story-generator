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
}) => {
  const [user] = useAuthState(auth);
  const [userStatus, setUserStatus] = useState(false);

  const messageColor = (type) => {
    switch (type) {
      case "save":
        return "text-rose-500";
      case "like":
        return "text-teal-500";
      case "delete":
        return "text-rose-500";
      case "error":
        return "text-rose-500";
      case "info":
        return "text-teal-500";
      case "share":
        return "text-indigo-500";
      case "create":
        return "text-amber-500";
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

  return (
    <div className=" cursor-pointer text-white p-2 flex justify-between text-sm fixed top-0 w-full z-20 md:bg-transparent bg-sky-950">
      {/* Share Icons */}
      <div className="w-1/3 group relative">
        <div>
          {show ? (
            <div>
              <MinusIcon
                className="h-12 w-12 border-2 rounded-full p-3 fade-in"
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
                className="h-12 w-12 border-2 rounded-full p-3 fade-in  shadow-md  hover:shadow-lg hover:shadow-indigo-500/50 shadow-indigo-500/30 "
                onClick={() => setShow(true)}
              />
            </div>
          )}
        </div>
      </div>

      {show && (
        <div className="backdrop-blur-md bg-sky-950/30 md:bg-transparent l p-2 lg:p-1 fade-in z-10 left-1 lg:left-2 top-16 lg:pb-5 absolute flex flex-col justify-start xl:justify-end items-center  gap-8 w-auto mt-2  ">
          <a
            onClick={() => handleShareBook(selectedBook?.id, userId)}
            className={
              selectedBook?.sharedBy?.includes(userId)
                ? "group max-w-xs text-sm bg-indigo-500 text-white rounded-md relative cursor-pointer"
                : "group max-w-xs text-sm bg-sky-950 hover:bg-indigo-500 hover:text-white rounded-md relative cursor-pointer"
            }
          >
            <FaInstagram className="h-9 w-9 p-2" />
            <span className="scale-0 group-hover:scale-100 transition-all absolute top-2 left-12">
              Instagram
            </span>
          </a>

          <a
            href="https://www.facebook.com"
            target="_blank"
            className="group max-w-xs  text-sm bg-sky-950 hover:bg-indigo-500 hover:text-white rounded-md relative cursor-pointer"
            role="alert"
          >
            <FaFacebook className="h-9 w-9 p-2" />
            <span className="scale-0 group-hover:scale-100 transition-all absolute top-2 left-12">
              Facebook
            </span>
          </a>

          <a
            href="https://www.twitter.com"
            target="_blank"
            className="group  max-w-xs  text-sm bg-sky-950 hover:bg-indigo-500 hover:text-white rounded-md relative cursor-pointer"
            role="alert"
          >
            <FaTwitter className="h-9 w-9 p-2" />
            <span className="scale-0 group-hover:scale-100 transition-all absolute top-2 left-12">
              Twitter
            </span>
          </a>

          <div
            className="group  max-w-xs  text-sm bg-sky-950 hover:bg-indigo-500 hover:text-white rounded-md relative cursor-pointer"
            role="alert"
          >
            <ShareIcon className="h-9 w-9 p-2" />
            <span className="scale-0 group-hover:scale-100 transition-all absolute top-2 left-12">
              Share
            </span>
          </div>
          <div
            onClick={resetStory}
            className="group  max-w-xs text-sm bg-sky-950 hover:bg-indigo-500 hover:text-white rounded-md relative cursor-pointer"
            role="alert"
          >
            <ArrowPathIcon className="h-9 w-9 p-2" />
            <span className="scale-0 group-hover:scale-100 transition-all absolute top-2 left-12">
              Reset
            </span>
          </div>
        </div>
      )}

      {/* Message Feature */}
      <div className="flex w-1/3 justify-center">
        {message && message.text != "" && (
          <div
            onClick={() => setMessage({ text: "", type: "" })}
            className={` pr-7 flex relative items-center text-sm md:text-[16px] cursor-pointer  hover:text-gray-500 hover:border-gray-500 ${messageColor(
              message.type
            )} rounded-full rounded-bl-lg  bg-gray-800 shadow-lg `}
          >
            <InformationCircleIcon className="h-6 w-6 mx-2" /> {message.text}
            <XMarkIcon className="h-4 w-4 absolute top-1 right-2  " />
          </div>
        )}
      </div>

      {/* Account Status */}
      <div className="flex justify-end w-1/3">
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
