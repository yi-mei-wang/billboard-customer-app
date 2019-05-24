import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Calendar from "./components/Calendar.js";
import Uploader from "./components/Uploader.js";

function App() {
  return (
    <>
      <Calendar />
      <Uploader />
    </>
  );
}

export default App;
