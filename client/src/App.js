import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import RecordList from "./components/telephonelist";

// We import all the components we need in our app
import Navbar from "./components/navbar";


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<RecordList />} />
      </Routes>
    </div>
  );
};

export default App;
