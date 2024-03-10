import React from 'react'

export const Stars = () => {

    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
      }
      const stars = document.querySelectorAll(".star");
    
      stars.forEach((star, index) => {
        const top = getRandom(0, 30) + "vh";
        const left = getRandom(2, 98) + "vw";
        const delay = getRandom(0, 15) + "s";
    
        star.style.top = top;
        star.style.left = left;
        star.style.animationDelay = delay;
      });

  return (
    <div className="absolute top-0 w-screen h-[30vh] z-0">
        {/* <div id="foglayer_01" class="fog">
  <div class="image01"></div>
  <div class="image02"></div>
</div>
<div id="foglayer_02" class="fog">
  <div class="image01"></div>
  <div class="image02"></div>
</div>
<div id="foglayer_03" class="fog">
  <div class="image01"></div>
  <div class="image02"></div>
</div> */}
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

