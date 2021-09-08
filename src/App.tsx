import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import CreateData from "./components/Patient_reg";


export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <CreateData />
      </div>
    </Router>
  );
}
