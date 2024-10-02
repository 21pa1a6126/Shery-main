import { IoIosArrowRoundBack } from "react-icons/io";
import React, { useState, useEffect } from "react";
import Onboardingone from "./Onboarding/Onboardingone";
import Onboardingtwo from "./Onboarding/Onboardingtwo";
import Onboardingthree from "./Onboarding/Onboardingthree";
import Onboardingfour from "./Onboarding/Onboardingfour";
import Onboardingfive from "./Onboarding/Onboardingfive";
import Onboardingsix from "./Onboarding/Onboardingsix";
import Onboardingseven from "./Onboarding/Onboardingseven";

const Onboardingfile = () => {
  const [step, setStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState({});

  const handleNextStep = () => {
    if (step < 7) {
      setStep(step + 1);
    } else {
      // Send onboarding data to Electron main process when onboarding is complete
      window.electronAPI.saveOnboardingData(onboardingData);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleDataCollection = (data) => {
    setOnboardingData((prevData) => ({ ...prevData, ...data }));
  };

  // Function to show notification
  const showNotification = (message) => {
    if (Notification.permission === "granted") {
      new Notification("Reminder", {
        body: message,
        icon: "path_to_icon.png", // Update this path if needed
      });
    } else if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          showNotification(message);
        }
      });
    }
  };

  useEffect(() => {
    // Request notification permission on component mount
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    // Show a notification when onboarding starts
    showNotification("Welcome to the onboarding process!");

    // Listen for the data save success/failure from Electron backend
    window.electronAPI.onOnboardingDataSaved((response) => {
      if (response.success) {
        console.log(response.message);
        // Show notification for successful save
        showNotification("Onboarding data saved successfully!");
      } else {
        console.error(response.message);
        // Show notification for error
        showNotification("Failed to save onboarding data.");
      }
    });

    // Cleanup listener on component unmount
    return () => {
      // Remove all listeners for 'onboarding-data-saved'
      window.electronAPI.onOnboardingDataSaved(() => {});
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center gap-3 w-9/12 fixed top-16 lg:top-20 xl:top-24">
        {step > 1 ? (
          <button onClick={handlePreviousStep}>
            <IoIosArrowRoundBack className="text-2xl opacity-70" />
          </button>
        ) : (
          <button onClick={handlePreviousStep} disabled>
            <IoIosArrowRoundBack className="text-2xl opacity-0" />
          </button>
        )}
        <div className="w-[75%] bg-gray-100 h-3 rounded-md">
          <div
            style={{
              width: `${(step / 7) * 100}%`,
            }}
            className="rounded-md bg-[#0066FF] h-3 duration-700 transform"
          ></div>
        </div>
      </div>
      <div className="w-full h-screen flex items-center justify-center p-10">
        {step === 1 && <Onboardingone handleCount={handleNextStep} />}
        {step === 2 && (
          <Onboardingtwo
            handleCount={handleNextStep}
            handleDataCollection={(data) =>
              handleDataCollection({ name: data })
            }
          />
        )}
        {step === 3 && (
          <Onboardingthree
            handleCount={handleNextStep}
            handleDataCollection={(data) =>
              handleDataCollection({ gender: data })
            }
          />
        )}
        {step === 4 && (
          <Onboardingfour
            handleCount={handleNextStep}
            handleDataCollection={(data) =>
              handleDataCollection({ screenTime: data })
            }
          />
        )}
        {step === 5 && (
          <Onboardingfive
            handleCount={handleNextStep}
            handleDataCollection={(data) =>
              handleDataCollection({ primarlyUsed: data })
            }
          />
        )}
        {step === 6 && (
          <Onboardingsix
            handleCount={handleNextStep}
            handleDataCollection={(data) =>
              handleDataCollection({ interestedBreaks: data })
            }
          />
        )}
        {step === 7 && (
          <Onboardingseven
            handleCount={handleNextStep}
            handleDataCollection={(data) =>
              handleDataCollection({ primaryGoal: data })
            }
          />
        )}
      </div>
    </div>
  );
};

export default Onboardingfile;
