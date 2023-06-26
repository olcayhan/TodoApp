import React from "react";
import imp from "../images/imp.png";

export default function StartImport() {
  return (
    <div
      className="
      flex
      flex-col
      items-center
      justify-center
      bg-gradient-to-b 
      from-[#293462]
      to-[#eb1d36]
      w-[240px]
      h-[240px]
      rounded-xl
      "
    >
      <img className="w-[120px]" src={imp} alt="home" />
      <h4 className="text-lg text-slate-50 font-bold text-center">
        Starring To Do's
      </h4>
      <p className="text-sm text-slate-50 text-center">
        Try starring some tasks to see them here
      </p>
    </div>
  );
}
