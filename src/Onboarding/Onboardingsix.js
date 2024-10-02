import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const categories = [
  "Move away from screen",
  "Music",
  "Exercise",
  "Meditate",
  "Use Social Media/Gaming",
  "Don't have any",
];

const Onboardingsix = ({ handleCount, handleDataCollection }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCheckboxChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    handleDataCollection(updatedCategories); // Call here to pass updated data
  };

  return (
    <div
      className="px-10 md:px-24 py-10 md:py-16 rounded-md text-center relative border border-blue-500"
      style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
      data-aos="fade-left"
    >
      <h1 className="text-4xl font-bold z-50">Interested Breaks</h1>
      <div className="mt-8">
        <ul className="list-none flex flex-col items-start">
          {categories.map((category, index) => (
            <li
              key={index}
              style={{
                margin: "10px 0",
                fontSize: "18px",
                fontWeight: selectedCategories.includes(category)
                  ? "bold"
                  : "normal",
              }}
            >
              <input
                type="checkbox"
                id={`category-left-${index}`}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCheckboxChange(category)}
                style={{ transform: "scale(1.5)" }}
                className="rounded"
              />
              <label
                htmlFor={`category-left-${index}`}
                style={{ marginLeft: "8px" }}
                className="text-lg"
              >
                {category}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="bg-[#1F2544] text-white py-2 font-semibold rounded-md mt-6 w-6/12 mx-auto flex justify-center items-center gap-2"
        onClick={handleCount}
      >
        Continue
        <FaArrowRightLong className="text-xs" />
      </button>
    </div>
  );
};

export default Onboardingsix;
