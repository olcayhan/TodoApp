import React from "react";
import note from "../images/note.png";

export default function StartScreen() {
  return (
    <div
      className="
      flex
      flex-col
      items-center
      justify-center
      bg-gradient-to-b 
      from-[#293462]
      to-[#31c6d4]
      w-[240px]
      h-[240px]
      rounded-xl
    "
    >
      <img className="w-[120px]" src={note} alt="home" />
      <h4 className="text-lg text-slate-50 font-bold text-center">
        Focus on your day
      </h4>
      <p className="text-sm text-slate-50 text-center">
        Get things done with Tasks
      </p>
    </div>
  );
}
