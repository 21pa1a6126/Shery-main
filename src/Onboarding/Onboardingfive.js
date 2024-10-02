import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const categories = [
  "Shopping",
  "Education",
  "Social Media",
  "Coding/Development",
  "News",
  "Entertainment",
  "Work/Productivity",
  "Gaming",
  "Video Streaming",
  "Health & Fitness",
  "Unknown",
];

const Onboardingfive = ({ handleCount, handleDataCollection }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCheckboxChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleContinue = () => {
    handleDataCollection(selectedCategories); // Handle data collection when continuing
    handleCount(); // Move to the next step
  };

  const leftCategories = categories.slice(0, 5);
  const rightCategories = categories.slice(5);

  return (
    <div className="flex gap-10 items-start" data-aos="fade-left">
      <div
        className="px-16 py-16 rounded-md text-center relative border border-blue-500"
        style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
      >
        <h1 className="text-4xl font-semibold z-50">Primarily Used</h1>
        <div className="flex items-center justify-between mt-10">
          <div className="flex items-start gap-20">
            <ul className="list-none flex flex-col items-start">
              {leftCategories.map((category, index) => (
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

            <ul className="list-none flex flex-col items-start">
              {rightCategories.map((category, index) => (
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
                    id={`category-right-${index}`}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCheckboxChange(category)}
                    style={{ transform: "scale(1.5)" }}
                  />
                  <label
                    htmlFor={`category-right-${index}`}
                    style={{ marginLeft: "8px" }}
                  >
                    {category}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          className="bg-[#1F2544] text-white py-2 font-semibold rounded-md px-8 flex justify-center items-center gap-2 mx-auto mt-6"
          onClick={handleContinue} // Call continue handler
          disabled={selectedCategories.length === 0} // Disable if no categories are selected
        >
          Continue
          <FaArrowRightLong className="text-xs" />
        </button>
      </div>
    </div>
  );
};

export default Onboardingfive;
