import React from "react";
import { RotatingLines } from "react-loader-spinner";
import "../loader/Loader.css";

function Loader() {
  return (
    <div className="loader">
      <RotatingLines
        strokeColor={"var(--primary-color)"}
        animationDuration="1.5"
      />
    </div>
  );
}

export default Loader;
