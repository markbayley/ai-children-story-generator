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
  lastPage,
  loading,
}) => {
  console.log("loading", loading);
  // Helper function to get default image based on page
  const getDefaultImage = (page) => {
    const defaultImages = [
      // forest,
      // fair,
      mushrooms,
      // fairys,
      // flowers,
      // pic7,
      // pic7,
      //tree
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
      <div className="flex justify-center items-center relative fade-in rounded-md  font-antiqua ">
        {loading ? (
          <>
          <div className="spinner w-full h-full absolute"></div>
          <Image
          alt="page-image"
          style={{
            borderRadius: "5px 5px 5px 5px",
            fontFamily: "Glass Antiqua",
          }}
          width={950}
          height={950}
          src={tree}
          onError={handleImageError}
          className="font-antiqua"
        />
        </>
        ) : (
          <Image
            // priority={true}
            // loading="eager"
            alt="page-image"
            style={{
              borderRadius: "5px 5px 5px 5px",
              fontFamily: "Glass Antiqua",
            }}
            width={950}
            height={950}
            // src={imageSrc}
            src={imageLoadError ? tree : imageSrc}
            onError={handleImageError}
            className="font-antiqua border-2 border-stone-700 rounded-md "
          />
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
      className="w-full h-full xl:w-1/2 flex-1 justify-center"
    >
      <div className="m-2 md:m-4 xl:m-12 3xl:m-20 sm:rounded-tl-xl sm:rounded-bl-xl">
        {page == lastPage ? (
          <div className="relative flex justify-center">
            <Image src={tree} alt="last-page" className="" />
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
