import React from 'react'

const Stars = () => {

    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
      }
      const stars = document.querySelectorAll(".star");
    
      stars.forEach((star, index) => {
        const top = getRandom(0, 30) + "vh";
        const left = getRandom(0, 100) + "vw";
        const delay = getRandom(0, 15) + "s";
    
        star.style.top = top;
        star.style.left = left;
        star.style.animationDelay = delay;
      });
      
  return (
    <div className="absolute w-full  h-[30vh]">
    <span className="star "></span>
    <span className="star "></span>
    <span className="star text-gray-300">.</span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star text-gray-300"></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star text-gray-300"></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star ">.</span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star text-gray-300"></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star ">.</span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star text-gray-300"></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star ">.</span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star text-gray-300"></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star text-gray-300"></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star ">.</span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star text-gray-300"></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star text-gray-300"></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star ">.</span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star text-gray-300"></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star text-gray-300"></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star ">.</span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star text-gray-300"></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star text-gray-300"></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star "></span>
    <span className="star text-gray-300"></span>
    <span className="star "></span>
    <span className="star "></span>
  </div>
  )
}

export default Stars