// Home.js
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="navbar bg-neutral text-neutral-content">
        <div className="container container-sm mx-auto">
          <button className="btn btn-ghost text-xl">SoloSens</button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
