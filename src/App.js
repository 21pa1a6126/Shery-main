import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboardingfile from "./Onboardingfile";
import Dashboard from "./Dashboard";

const App = () => {
  useEffect(() => {
    window.electronAPI.onNavigateTo((url) => {
      window.open(url, "_blank"); // Open the URL in a new tab
    });
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboardingfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
