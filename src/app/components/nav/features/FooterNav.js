import {
  CreditCardIcon,
  EnvelopeIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export const FooterNav = ({
}) => {

  return (
    <>
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
          <div className="hover:text-gray-400 cursor-pointer">
            Terms & Conditions
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:w-1/5  justify-around">
          <div className="flex items-center  hover:text-gray-400 cursor-pointer">
            <FaFacebook className="h-4 w-4" />
          </div>
          <div className="flex items-center  hover:text-gray-400 cursor-pointer">
            <FaInstagram className="h-4 w-4" />
          </div>
          <div className="flex items-center  hover:text-gray-400 cursor-pointer">
            <FaTwitter className="h-4 w-4" />
          </div>
          {/* <div className="w-full p-1 mb-1 ">InblockDesign &#xa9;2024</div> */}
        </div>
      </div>
    </>
  );
};
