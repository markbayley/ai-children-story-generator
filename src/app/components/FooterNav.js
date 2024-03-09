"use client";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import Profile from "../profile/page";
import pic7 from "/public/pic7.jpg";
import { AuthDisplay } from "../auth/page";
import {
  ArrowPathIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  EnvelopeIcon,
  InformationCircleIcon,
  MinusIcon,
  QuestionMarkCircleIcon,
  ShareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export const FooterNav = ({
  resetStory,
  message,
  setMyBooks,
  setUserId,
  setMyStoriesSelected,
  setMessage,
  show,
  setShow
}) => {
  const [user] = useAuthState(auth);
  const [userStatus, setUserStatus] = useState(false);



  return (
    <> 
    {/* Desktop Footer */}
    {/* <div className="rounded-tl-xl p- h-[42.5%] hidden bottom-0 left-0 absolute lg:flex flex-col justify-between gap-4 items-center  text-xs text-white  z-20  bg-sky-950 ">
     
      <div className="flex flex-col h-1/2 justify-between items-center w-full">
        <div className="flex items-center  hover:text-gray-300 cursor-pointer">
          <EnvelopeIcon className="h-9 w-9 p-1" />
        </div>
        <div className="flex items-center  hover:text-gray-300 cursor-pointer">
          <QuestionMarkCircleIcon className="h-9 w-9 p-1" />
        </div>
        <div className="flex items-center  hover:text-gray-300 cursor-pointer">
          <CreditCardIcon className="h-9 w-9 p-1" /> 
        </div>
      </div>

      <div className="flex flex-col   xl:justify-around justify-start leading-8 cursor-pointer">
        <div className="hover:text-gray-300"></div>
        <div className="hover:text-gray-300"></div>
        <div className="hover:text-gray-300"></div>
      </div>

      <div className="flex flex-col h-1/2 justify-between">
        <div className="flex  leading-8 justify-between items-start w-full p-1 lg:w-28  cursor-pointer">
          <div className="flex items-center  hover:text-gray-300 cursor-pointer">
            <FaFacebook className="h-8 w-8 p-1" />
          </div>
          <div className="flex items-center  hover:text-gray-300 cursor-pointer">
            <FaInstagram className="h-8 w-8 p-1" />
          </div>
          <div className="flex items-center  hover:text-gray-300 cursor-pointer">
            <FaTwitter className="h-8 w-8 p-1" />
          </div>
        </div>

        <div className="w-full p-1 mb-1 ">InblockDesign &#xa9;2024</div>
      </div>
    </div> */}

{/* Mobile footer */}
    <div className="mt-8 xl:mt-0 px-6 3xl:py-4 md:px-[10%]  bottom-0 2xl:py-1 flex justify-between  text-xs 3xl:text-lg text-gray-300 w-full z-20 lg:px-[12%] 2xl:p-[24%] bg-sky-950 xl:bg-transparent">
     
      <div className="flex flex-col lg:flex-row lg:w-1/3 lg:justify-around items-start leading-8">
        <div className="flex items-center  hover:text-gray-400 cursor-pointer">
          <EnvelopeIcon className="h-5 w-5 mr-2" /> Contact
        </div>
        <div className="flex items-center  hover:text-gray-400 cursor-pointer">
          <QuestionMarkCircleIcon className="h-5 w-5 mr-2" /> Help
        </div>
        <div className="flex items-center  hover:text-gray-400 cursor-pointer">
          <CreditCardIcon className="h-5 w-5 mr-2" /> Subscriptions
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:w-1/3  lg:justify-around justify-start leading-8">
        <div className="hover:text-gray-400 cursor-pointer">Privacy</div>
        <div className="hover:text-gray-400 cursor-pointer">About Us</div>
        <div className="hover:text-gray-400 cursor-pointer">Terms & Conditions</div>
      </div>

      <div className="flex flex-col lg:flex-row lg:w-1/5  justify-around">
        {/* <div className="flex  leading-8 justify-between items-start w-full p-1 lg:w-28  cursor-pointer"> */}
          <div className="flex items-center  hover:text-gray-400 cursor-pointer">
            <FaFacebook className="h-4 w-4" />
          </div>
          <div className="flex items-center  hover:text-gray-400 cursor-pointer">
            <FaInstagram className="h-4 w-4" />
          </div>
          <div className="flex items-center  hover:text-gray-400 cursor-pointer">
            <FaTwitter className="h-4 w-4" />
          </div>
        {/* </div> */}

        {/* <div className="w-full p-1 mb-1 ">InblockDesign &#xa9;2024</div> */}
      </div>
    </div>
    </>
  );
};
