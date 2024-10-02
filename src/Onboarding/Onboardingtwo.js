import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const Onboardingtwo = ({ handleCount, handleDataCollection }) => {
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleContinue = () => {
    handleDataCollection(name);
    handleCount();
  };

  return (
    <div
      className="p-10 md:px-20 md:py-16 rounded-md text-center relative border border-blue-500"
      style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
      data-aos="fade-left"
    >
      <h1 className="text-4xl font-semibold z-50">
        Hi There!
        <br />
        What do we call you...?
      </h1>
      <div className="flex flex-col pt-2">
        <label className="flex items-center gap-2 opacity-70 text-sm mt-5">
          Name
        </label>
        <input
          type="text"
          className="border-b w-96 py-2 outline-none px-1"
          value={name}
          onChange={handleInputChange}
        />
      </div>
      <button
        className="bg-[#1F2544] text-white py-2 font-semibold rounded-md mt-10 w-6/12 mx-auto flex justify-center items-center gap-2"
        onClick={handleContinue}
      >
        Continue
        <FaArrowRightLong className="text-xs" />
      </button>
    </div>
  );
};

export default Onboardingtwo;
