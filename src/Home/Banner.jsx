import React from "react";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/bnner3.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";


const Banner = () => {
  return (
    <div className="banner">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        transitionTime={800}
      >
        {/* Slide 1 */}
        <div className="relative">
          <img
            src={banner1}
            alt="Revolutionizing Technology"
            className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-40 px-4">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
              Revolutionizing Technology
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl">
              Join us at K-Tech to shape the future with cutting-edge solutions that drive innovation and excellence.
            </p>
          </div>
        </div>


        {/* Slide 2 */}
        <div className="relative">
          <img
            src={banner2}
            alt="Empowering Your Vision"
            className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-40 px-4">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
              Empowering Your Vision
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl">
              Discover tools and technologies that transform ideas into reality with K-Tech's trusted solutions.
            </p>
          </div>
        </div>


        {/* Slide 3 */}
        <div className="relative">
          <img
            src={banner3}
            alt="Driving Innovation Together"
            className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-40 px-4">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
              Driving Innovation Together
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl">
              Partner with K-Tech and be a part of the journey to create smarter, better, and faster solutions.
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
