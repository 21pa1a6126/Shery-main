import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

AOS.init();

const Onboardingseven = ({ handleCount, handleDataCollection }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    handleDataCollection(value); // Call here to pass the selected option
  };

  return (
    <div className="flex gap-10 items-start" data-aos="fade-left">
      <div
        className="px-16 py-16 rounded-md text-center relative border border-blue-500"
        style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
      >
        <h1 className="text-4xl font-semibold z-50">
          What is your primary goal <br /> for using ZenFocus?
        </h1>
        <div className="flex flex-col items-start">
          <div className="mb-2 mt-8">
            <input
              type="radio"
              id="option1"
              name="category"
              value="Only To Reduce Stress"
              checked={selectedOption === "Only To Reduce Stress"}
              onChange={handleRadioChange}
            />
            <label
              htmlFor="option1"
              style={{ marginLeft: "8px", fontSize: "18px" }}
            >
              To Reduce Stress
            </label>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <input
              type="radio"
              id="option2"
              name="category"
              value="To reduce stress and increase productivity"
              checked={
                selectedOption === "To reduce stress and increase productivity"
              }
              onChange={handleRadioChange}
            />
            <label
              htmlFor="option2"
              style={{ marginLeft: "8px", fontSize: "18px" }}
            >
              To Reduce stress and increase productivity
            </label>
          </div>
        </div>
        <button
          className="bg-[#1F2544] text-white py-2 font-semibold rounded-md px-8 flex justify-center items-center gap-2 mx-auto mt-8"
          onClick={handleCount}
        >
          <Link to={"/dashboard"}>Continue</Link>
          <FaArrowRightLong className="text-xs" />
        </button>
      </div>
    </div>
  );
};

export default Onboardingseven;
