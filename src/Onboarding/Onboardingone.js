import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const Onboardingone = ({ handleCount }) => {
  return (
    <div
      className="px-10 md:px-16 py-10 md:py-20 rounded-md text-center relative border border-blue-500"
      style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
      data-aos="fade-left"
    >
      <h1 className="text-4xl font-semibold z-50 poppins">
        Welcome to Zenfocus
      </h1>
      <h1 className="text-md opacity-70 mt-3">
        Balance your mind. Elevate your productivity
      </h1>
      <button
        className="bg-[#1F2544] text-white py-2 font-semibold rounded-md mt-10 w-6/12 mx-auto flex justify-center items-center gap-2"
        onClick={handleCount}
      >
        Continue
        <FaArrowRightLong className="text-xs" />
      </button>
    </div>
  );
};

export default Onboardingone;
