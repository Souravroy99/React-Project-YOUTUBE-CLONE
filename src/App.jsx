import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";
import Navbar from "./Components/Navbar/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
      </Routes>
    </div>
  );
};

export default App;
