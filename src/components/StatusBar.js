// "use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useState } from "react";
import Profile from "@/app/profile/page";
import  Authy from "@/app/auth/page";
import {
  ArrowPathIcon,
  InformationCircleIcon,
  MinusIcon,
  PlusIcon,
  ShareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FaInstagram, FaFacebook, FaTwitter  } from "react-icons/fa";
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
  userId
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
        return "text-rose-600";
      case "error":
        return "text-red-600";
      case "info":
        return "text-indigo-500";
        case "share":
          return "text-indigo-500";
      case "create":
        return "text-amber-500";
      // default:
      //   return "text-amber-500"; // Default color
    }
  };



/////
 

  return (
    <div className="text-white p-2 flex justify-between text-sm fixed top-0 w-full z-20 md:bg-transparent bg-sky-950">
      <div
        // 
        className="flex cursor-pointer group relative shadow-md  hover:shadow-lg hover:shadow-indigo-500/100 shadow-indigo-500/70 rounded-full "
      >
        {/* <Image src={pic7} alt="logo" className="rounded-full h-12 w-12 " /> */}
        {!show ? (
          <>
          <ShareIcon className="h-12 w-12 border-2 rounded-full p-3 fade-in" onClick={() => setShow(true)}/>
          <span className="scale-0 group-hover:scale-100 transition-all absolute top-4 left-14">Open</span >
            </>
        ) : (
          <>
          <MinusIcon className="h-12 w-12 border-2 rounded-full p-3 fade-in" onClick={() => setShow(false)}/>
          <span className="scale-0 group-hover:scale-100 transition-all absolute top-4 left-14">Close</span >
          </>
        )}
      </div>

      {show && (
        <div className="backdrop-blur-md bg-sky-950/30 md:bg-transparent l p-2 lg:p-1 fade-in z-10 left-1 lg:left-2 top-16 lg:pb-5 absolute flex flex-col justify-start xl:justify-end items-center  gap-8 w-auto mt-2  ">
          {/* {unsaved && selectedBook?.id == undefined && !dismiss && ( */}
          <a
            // onClick={resetStory}
          // onClick={() => setShared(true)}
          onClick={() => handleShareBook(selectedBook?.id, userId)}
           // href="https://www.instagram.com/explore/search/keyword/?q=faeries"
           // target="_blank"
            className={ selectedBook?.sharedBy?.includes(userId) ? "group max-w-xs text-sm bg-indigo-500 text-white rounded-md relative cursor-pointer"
           : "group max-w-xs text-sm bg-sky-950 hover:bg-indigo-500 hover:text-white rounded-md relative cursor-pointer" }
          >
         
            <FaInstagram className="h-9 w-9 p-2"/>
            <span className="scale-0 group-hover:scale-100 transition-all absolute top-2 left-12">
              Instagram
            </span>
          </a>

          {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
  <InstagramEmbed url="https://www.instagram.com/p/CUbHfhpswxt/" width={328} />
</div> */}

          <a href="https://www.facebook.com"
          target="_blank"
            // onClick={handleSaveBook}
            className="group max-w-xs  text-sm bg-sky-950 hover:bg-indigo-500 hover:text-white rounded-md relative cursor-pointer"
            role="alert"
          >
         
            < FaFacebook  className="h-9 w-9 p-2"/>
            <span className="scale-0 group-hover:scale-100 transition-all absolute top-2 left-12">
              Facebook
            </span>
          </a>

          <a href="https://www.twitter.com"
          target="_blank"
            // onClick={() => setPage(5)}
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

          {/* {selectedBook?.userId != undefined && userId != selectedBook?.userId && ( */}
          <div
            // onClick={() => handleLikeBook(selectedBook?.id, userId)}
            onClick={resetStory}
            className="group  max-w-xs text-sm bg-sky-950 hover:bg-indigo-500 hover:text-white rounded-md relative cursor-pointer"
            role="alert"
          >
            <ArrowPathIcon className="h-9 w-9 p-2" />
            <span className="scale-0 group-hover:scale-100 transition-all absolute top-2 left-12">
              Reset
            </span>
          </div>
          {/* )} */}

          {/* {userId == selectedBook?.userId && ( */}
          {/* <div
             onClick={() => handleDeleteBook(selectedBook?.id)}
            className="group  max-w-xs  text-sm  hover:bg-indigo-500 hover:text-white rounded-lg shadow-lg relative cursor-pointer"
            role="alert"
          >
            <InformationCircleIcon className="h-9 w-9 p-1" />
            <span className="scale-0 group-hover:scale-100 transition-all absolute top-2 left-12">
              Delete
            </span>
          </div> */}
          {/* )} */}
        </div>
      )}

      {message && message.text != "" && (
        <div
          onClick={() => setMessage({ text: "", type: "" })}
          className={` pr-7 flex relative items-center lg:ml-40 text-sm md:text-[16px] cursor-pointer  hover:text-gray-500 hover:border-gray-500 ${messageColor(
            message.type
          )} rounded-full rounded-bl-lg  bg-gray-800 shadow-lg `}
        >
          <InformationCircleIcon className="h-6 w-6 mx-2" /> {message.text}
          <XMarkIcon className="h-4 w-4 absolute top-1 right-2  " />
        </div>
      )}
      {user  ? (
        <div>
          <Profile
            user={user}
            setMyBooks={setMyBooks}
            setUserId={setUserId}
            setMyStoriesSelected={setMyStoriesSelected}
            setMessage={setMessage}
          />
        </div>
      ) : (
       <Authy userStatus={userStatus} setUserStatus={setUserStatus} setMessage={setMessage}/>
        
      )}
    </div>
  );
};
