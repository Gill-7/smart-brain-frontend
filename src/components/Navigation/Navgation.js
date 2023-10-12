import React from "react";
import Logo from "../Logo/Logo";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  let changeNavigation = "";
  if (isSignedIn) {
    changeNavigation = (
      <p
        className="text-base underline underline-offset-2 cursor-pointer hover:text-zinc-200"
        onClick={() => onRouteChange("signout")}
      >
        Sign out
      </p>
    );
  } else {
    changeNavigation = (
      <div className="flex space-x-4 sm:space-x-4 md:space-x-6 text-sm sm:text-xs md:text-base">
        <p
          className=" underline underline-offset-2 cursor-pointer hover:text-zinc-200"
          onClick={() => onRouteChange("signin")}
        >
          Sign In
        </p>
        <p
          className=" underline underline-offset-2 cursor-pointer hover:text-zinc-200"
          onClick={() => onRouteChange("register")}
        >
          Register
        </p>
      </div>
    );
  }
  return (
    <nav className="flex justify-between items-center pr-2 sm:pr-4 md:pr-6 pl-2 sm:pl-4 md:pl-6 pt-2 pb-1 h-14">
      <Logo />
      {changeNavigation}
    </nav>
  );
};

export default Navigation;
