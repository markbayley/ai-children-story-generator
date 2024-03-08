"use client";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import {
  Cog6ToothIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
  UserMinusIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import Settings from "./settings";
import Image from "next/image";
import Contact from "./contact";
import { CgProfile } from "react-icons/cg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Profile = ({ user, setMessage }) => {
  const [settings, setSettings] = useState(false);
  const [contact, setContact] = useState(false);

  // Inside your component
  const [imageLoadError, setImageLoadError] = useState(false);

  const handleImageError = () => {
    setImageLoadError(true); // Set the error state to true
  };

  useEffect(() => {
    // Reset the image load error state whenever the user changes
    setImageLoadError(false);
  }, [user]);

 

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        {/* <div className="hover:text-gray-300 bg-sky-950  text-white"> */}
          <Menu.Button className="fade-in transition-all 3xl:text-xl 3xl:py-4 max-w-8 hover:bg-gradient-to-r bg-sky-950  hover:bg-sky-900 shadow-md hover:shadow-md hover:shadow-indigo-500/50  text-white fade-in inline-flex w-full justify-center items-center gap-x-1.5 rounded-md px-2 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300">
            {user && user?.photoURL && !imageLoadError ? (
               <div className="relative aspect-square rounded-full h-8 w-8 mx-[2px] overflow-hidden">
              <Image
                src={user?.photoURL}
                sizes="(max-width: 768px) 5vw,
                (max-width: 1200px) 5vw,
                5vw"
                 fill
                //width={100}
                //height={100}
                alt="profile-image"
                onError={handleImageError}
                className="max-w-xs rounded-full object-cover"
              />
              </div>
            ) : (
            <UserCircleIcon className="max-w-xs h-8 w-8" />
            )}
            <>
            <span className="hidden xl:flex">{user?.displayName ? user?.displayName : "Profile"}</span>
            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </>
          </Menu.Button>
        {/* </div> */}
     

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-3 md:w-96 origin-top-right rounded-lg bg-sky-950 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                <div className="flex justify-between w-full">
                  <a
                    href="#"
                    className={
                      "flex items-center bg-sky-950 text-white  px-4 py-2 text-sm"
                    }
                  >
                    <div>
                      {" "}
                      Signed in as
                      <span className="flex  font-semibold"> {user?.email}</span>
                    </div>
                  </a>

                  <button
                    type="submit"
                    onClick={() => {
                      signOut(auth);
                      sessionStorage.removeItem("user");
                      setMessage({text: "Signed Out", type: "create"});
                    }}
                    className="flex items-center whitespace-nowrap text-white px-4 py-2 m-4 rounded-md bg-indigo-600 hover:bg-indigo-500  justify-center border-b-2 border-stone-700"
                  >
                   Sign Out
                  </button>
                </div>
              </Menu.Item>
              <hr className="h-px my-1 bg-gray-700 border-0" />
              <Menu.Item>
                {({ active }) => (
                  <>
                    <a
                      onClick={() => {
                        setSettings(!settings);
                        setContact(false);
                      }}
                      href="#"
                      className={classNames(
                        active
                          ? "flex items-center bg-sky-900 text-white"
                          : "flex items-center bg-sky-950 text-white",
                        "block px-4 py-2 text-sm hover:text-gray-300"
                      )}
                    >
                      <Cog6ToothIcon className="h-6 w-6 mr-2" /> Settings{" "}
                      <ChevronDownIcon
                        className="-mr-1 h-5 w-5  "
                        aria-hidden="true"
                      />
                    </a>

                    <div>
                      {" "}
                      {settings && <Settings setMessage={setMessage} user={user}/>}
                    </div>
                  </>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <>
                    <a
                      onClick={() => {
                        setContact(!contact);
                        setSettings(false);
                      }}
                      href="#"
                      className={classNames(
                        active
                          ? "flex items-center bg-sky-900 text-white"
                          : "flex items-center bg-sky-950 text-white",
                        "block px-4 py-2 text-sm hover:text-gray-300"
                      )}
                    >
                      <EnvelopeIcon className="h-6 w-6 mr-2" /> Contact{" "}
                      <ChevronDownIcon
                        className="-mr-1 h-5 w-5  "
                        aria-hidden="true"
                      />
                    </a>

                    <div> {contact && <Contact setMessage={setMessage} />}</div>
                  </>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active
                        ? "flex items-center bg-sky-900 text-white"
                        : "flex items-center bg-sky-950 text-white",
                      "block px-4 py-2 text-sm mb-2"
                    )}
                  >
                    <CurrencyDollarIcon className="h-6 w-6 mr-2" /> Credits
                  </a>
                )}
              </Menu.Item>
              {/* <hr className="h-px my-1  bg-gray-700 border-0" />
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    onClick={() => {
                      signOut(auth);
                      sessionStorage.removeItem("user");
                    }}
                    className={classNames(
                      active
                        ? "flex items-center bg-sky-900 text-white"
                        : "flex items-center bg-sky-950 text-white",
                      "flex w-full px-4 py-4 text-sm"
                    )}
                  >
                    <UserMinusIcon className="h-6 w-6 mr-2 " /> Sign out
                  </button>
                )}
              </Menu.Item> */}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default Profile;
