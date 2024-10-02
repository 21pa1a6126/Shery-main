import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const Onboardingfour = ({ handleCount, handleDataCollection }) => {
  const [selectedTime, setSelectedTime] = useState(null); // State to store selected screen time

  const handleTimeSelect = (time) => {
    setSelectedTime(time); // Update state with selected screen time
    handleDataCollection(time); // Handle data collection when time is selected
  };

  return (
    <div
      className="flex flex-col md:flex-row items-center gap-8"
      data-aos="fade-left"
    >
      <div
        className="py-16 md:px-20 md:pt-16 md:pb-16 rounded-md text-center relative border border-blue-500"
        style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
      >
        <h1 className="text-4xl font-bold z-50 tracking-wide mb-10">
          Estimated Screen Time
        </h1>
        <div className="flex flex-col gap-7 items-center justify-center mt-12">
          <div className="flex gap-7">
            <button
              className="flex flex-col items-center border border-blue-500 px-12 rounded-md text-5xl py-5"
              style={{
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                opacity: selectedTime === "0-2" ? 1 : selectedTime ? 0.5 : 1, // Change opacity based on selection
              }}
              onClick={() => handleTimeSelect("0-2")} // Set screen time to 0-2 hours
            >
              <h1 className="text-lg font-bold opacity-80">0 - 2 Hours</h1>
            </button>
            <button
              className="flex flex-col items-center border border-blue-500 px-12 rounded-md text-5xl py-5"
              style={{
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                opacity: selectedTime === "4-6" ? 1 : selectedTime ? 0.5 : 1, // Change opacity based on selection
              }}
              onClick={() => handleTimeSelect("4-6")} // Set screen time to 4-6 hours
            >
              <h1 className="text-lg font-bold opacity-80">4 - 6 Hours</h1>
            </button>
          </div>
          <div className="flex gap-7">
            <button
              className="flex flex-col items-center border border-blue-500 px-12 rounded-md text-5xl py-5"
              style={{
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                opacity: selectedTime === "6-8" ? 1 : selectedTime ? 0.5 : 1, // Change opacity based on selection
              }}
              onClick={() => handleTimeSelect("6-8")} // Set screen time to 6-8 hours
            >
              <h1 className="text-lg font-bold opacity-80">6 - 8 Hours</h1>
            </button>
            <button
              className="flex flex-col items-center border border-blue-500 px-11 rounded-md text-5xl py-5"
              style={{
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                opacity:
                  selectedTime === "more-than-8" ? 1 : selectedTime ? 0.5 : 1, // Change opacity based on selection
              }}
              onClick={() => handleTimeSelect("more-than-8")} // Set screen time to more than 8 hours
            >
              <h1 className="text-lg font-bold opacity-80">More than 8</h1>
            </button>
          </div>
        </div>
        <button
          className="bg-[#1F2544] text-white py-2 font-semibold rounded-md w-6/12 mx-auto flex justify-center items-center gap-2 mt-9"
          onClick={handleCount} // Call the handlecount function

        >
          Continue
          <FaArrowRightLong className="text-xs" />
        </button>
      </div>
    </div>
  );
};

export default Onboardingfour;
