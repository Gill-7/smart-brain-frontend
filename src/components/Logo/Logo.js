import React from "react";
import { LuBrainCircuit } from "react-icons/lu";

const Logo = () => {
  return (
    <div className="flex justify-between items-center pt-6">
      <div className="pr-1.5 text-3xl md:text-4xl">
        <LuBrainCircuit />
      </div>
      <div className="text-base md:text-xl pt-3.5">FaceFinder</div>
    </div>
  );
};

export default Logo;
