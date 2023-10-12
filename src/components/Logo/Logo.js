import React from "react";
import logo from "./logo.svg";

const Logo = () => {
  return (
    <div>
      <img src={logo} alt="logo" className="w-32 sm:w-36 md:w-44" />
    </div>
  );
};

export default Logo;
