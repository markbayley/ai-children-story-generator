import Image from "next/image";
import mushrooms from "/public/mushrooms.jpg";
import flowers from "/public/flowers.jpg";
import forest from "/public/forest.jpg";
import fairys from "/public/fairys.jpg";
import fair from "/public/fair.jpg";
import pic7 from "/public/pic7round.png";
import { useEffect, useState } from "react";
import tree from "/public/trace1.svg";

export const BookImage = ({
  imagesSelected,
  page,
  imagesUnsaved,
  selectedBook,
}) => {
  // Helper function to get default image based on page
  const getDefaultImage = (page) => {
    const defaultImages = [
      forest,
      fair,
      mushrooms,
      fairys,
      flowers,
      pic7,
      pic7,
    ];
    return defaultImages[page] || defaultImages[0];
  };
  // Helper Component for Image Display
  const ImageDisplay = ({ imagesSelected, imagesUnsaved, page }) => {
    const imageSrc =
      imagesSelected?.length > 0
        ? imagesSelected[page] || getDefaultImage(page)
        : imagesUnsaved?.length > 0 && imagesUnsaved[page]
        ? `data:image/jpeg;base64,${imagesUnsaved[page]}` ||
          getDefaultImage(page)
        : getDefaultImage(page);

    return (
      <div className="flex justify-center items-center relative fade-in ">
        {<div className="spinner w-full h-full absolute"></div>}
        {imageSrc && !imageLoadError ? (
          <Image
          priority={true}
          loading="eager"
            alt="page-image"
            style={{ borderRadius: "5px 5px 5px 5px", opacity: "0.9" }}
            width={650}
            height={650}
            src={imageSrc}
            onError={handleImageError}
          />
        ) : (
          <div className="spinner w-full h-full absolute"></div>
        )}
      </div>
    );
  };

  const [imageLoadError, setImageLoadError] = useState(false);

  const handleImageError = () => {
    setImageLoadError(true);
  };

  useEffect(() => {
    setImageLoadError(false);
  }, [selectedBook]);

  return (
    <div
      className="w-full h-full
       xl:w-1/2
       flex-1 "
    >
      <div></div>
      <div className="m-4 xl:m-12 sm:rounded-tl-xl sm:rounded-bl-xl">
        {page == 6 ? (
          <div className="relative flex items-center justify-center font-antiqua glass-antiqua">
            <Image
              src={tree}
              alt="Follow us on Twitter"
              className="font-antiqua glass-antiqua opacity-70"
              style={{
                fontFamily: "Glass Antiqua",
                fontWeight: "400",
                fontStyle: "normal",
              }}
            />
          </div>
        ) : (
          <ImageDisplay
            imagesSelected={imagesSelected}
            page={page}
            imagesUnsaved={imagesUnsaved}
          />
        )}
      </div>
    </div>
  );
};
