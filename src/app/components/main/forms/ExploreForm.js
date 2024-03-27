import { SparklesIcon } from "@heroicons/react/24/outline";
import React from "react";

export const ExploreForm = ({setTabSelected, tabSelected}) => {

  return (
    <div className="fade-in flex justify-start w-full lg:w-2/3 xl:w-5/12 3xl:text-2xl px-2 py-0 md:pt-4">
      <form className="  mt-4 lg:mt-0 rounded-xl w-full">
        <div className="text-orange-300 md:flex w-full justify-between items-center">
          <h1 className="font-bold font-antiqua text-5xl 2.5xl:text-7xl 3xl:text-8xl">
            Explore
          </h1>

<div className="flex items-end justify-start  md:justify-between text-sm 3xl:text-xl bg-sky-950 py-2 px-3 rounded-md shadow-md shadow-slate-900 ">
          <div onChange={() => setTabSelected("Explore")}  className="flex items-center">
    <input id="radio1" type="radio" name="radio" className="hidden" defaultChecked />
    <label htmlFor="radio1" className="flex items-center cursor-pointer font-semibold">
     <span className="w-5 h-5 inline-block mr-1 rounded-full border-2 border-amber-500"></span>
     Recent</label>
   </div>

   <div onChange={() => setTabSelected("Popular")} className="flex items-center ml-6">
    <input id="radio2" type="radio" name="radio" className="hidden" />
    <label htmlFor="radio2" className="flex items-center cursor-pointer font-semibold">
     <span className="w-5 h-5 inline-block mr-1 rounded-full border-2 border-amber-500"></span>
     Popular</label>
   </div>

   <div onChange={() => setTabSelected("Liked")} className="flex items-center ml-6">
    <input id="radio3" type="radio" name="radio" className="hidden" />
    <label htmlFor="radio3" className="flex items-center cursor-pointer font-semibold">
     <span className="w-5 h-5 inline-block mr-1 rounded-full border-2 border-amber-500"></span>
     Liked</label>
   </div>

   </div>

        </div>
        <h3 className="py-2 text-md font-normal text-white">
          Find stories created by others with AI and bring your imagination to life!
        </h3>
        <div className="flex items-center justify-center">
          <hr className="h-px  bg-orange-300 border-0  w-full" />{" "}
          <SparklesIcon className=" w-10 aspect-square mx-2 text-orange-300" />{" "}
          <hr className="h-px  bg-orange-300 border-0  w-full" />
        </div>
      </form>
    </div>
  );
};
