import React, { useState } from "react";
import { IoMaleSharp } from "react-icons/io5";
import { IoMdFemale } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const Onboardingthree = ({ handleCount, handleDataCollection }) => {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    handleDataCollection(gender);
  };

  return (
    <div
      className="p-10 md:px-24 md:pt-10 md:pb-16 rounded-md text-center relative border border-blue-500"
      style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
      data-aos="fade-left"
    >
      <h1 className="text-3xl font-semibold z-50">Gender</h1>
      <div className="flex items-center justify-between gap-10 mt-10">
        <button
          className={`flex flex-col items-center border border-blue-500 px-12 rounded-md text-5xl pt-4 pb-3 ${
            selectedGender === "Male" ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => handleGenderSelect("Male")}
        >
          <IoMaleSharp className="text-blue-600 text-5xl" />
          <h1 className="text-lg font-bold opacity-80">Male</h1>
        </button>
        <button
          className={`flex flex-col items-center border border-pink-500 px-10 rounded-md text-5xl pt-4 pb-3 ${
            selectedGender === "Female" ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => handleGenderSelect("Female")}
        >
          <IoMdFemale className="text-pink-600 text-5xl" />
          <h1 className="text-lg font-bold opacity-80">Female</h1>
        </button>
      </div>
      <div className="mt-10 flex items-center justify-end w-full">
        <button
          className="bg-[#1F2544] text-white py-2 font-semibold rounded-md w-6/12 mx-auto flex justify-center items-center gap-2"
          onClick={handleCount}
          disabled={!selectedGender}
        >
          Continue
          <FaArrowRightLong className="text-xs" />
        </button>
      </div>
    </div>
  );
};

export default Onboardingthree;
