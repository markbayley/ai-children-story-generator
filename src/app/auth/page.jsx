"use client";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { UserIcon } from "@heroicons/react/24/outline";
import dynamic from 'next/dynamic';

const SignIn = dynamic(() => import('@/app/auth/sign-in'), {
  ssr: false, // This prevents server-side rendering for the component
});

const SignUp = dynamic(() => import('@/app/auth/sign-up'), {
  ssr: false,
});


const Authy = ({ userStatus, setUserStatus, setMessage }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className=" inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-3 text-sm font-semibold text-white hover:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 ">
          <UserIcon className="h-6 w-6  " />
          Login
          <ChevronDownIcon className="-mr-1 h-5 w-5 " aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-24 md:right-40 z-10 mt-2 w-56 origin-top-right rounded-md  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {!userStatus ? (
              <SignIn userStatus={userStatus} setUserStatus={setUserStatus} setMessage={setMessage} />
            ) : (
              <SignUp userStatus={userStatus} setUserStatus={setUserStatus} setMessage={setMessage} />
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Authy