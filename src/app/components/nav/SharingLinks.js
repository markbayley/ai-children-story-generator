import React from "react";
import { FaFacebook, FaFacebookSquare, FaTwitterSquare } from "react-icons/fa";
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
} from "react-share";

const url = "www.inblockdesign.com";
const quote = "AiStorytime App";
const title = "AiStorytime App";
const hashtags = ["storybookApp", "readingIsFun"];

const SharingLinks = ({ media, description }) => {
  return (
    <div className="flex flex-col gap-8 m-0 p-0 w-8">
      <FacebookShareButton
        url={url}
        quote={quote}
        hashtag="#storybookApp"
        className="bg-sky-950 rounded p-1"
      >
        <FaFacebookSquare size={32} round />
      </FacebookShareButton>

      <TwitterShareButton
        url={url}
        title={title}
        hashtags={hashtags}
        className="bg-sky-950 rounded p-1"
      >
        <FaTwitterSquare size={32} round />
      </TwitterShareButton>

      <PinterestShareButton
        url={url}
        media={media}
        description={description}
        hashtags={["storybookApp", "readingIsFun"]}
        className=""
      >
        <PinterestIcon size={32} round />
      </PinterestShareButton>

      {/* Add more social share buttons as needed */}
    </div>
  );
};

export default SharingLinks;
