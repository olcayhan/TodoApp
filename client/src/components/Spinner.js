import React from "react";
import { BeatLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <BeatLoader color="#00adb5" size={40} />
    </div>
  );
};

export default Spinner;
