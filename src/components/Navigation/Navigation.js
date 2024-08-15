import React from "react";
import Logo from "../Logo/Logo";
import ProfileIcon from "../Profile/ProfileIcon";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  let changeNavigation = "";
  if (isSignedIn) {
    changeNavigation = (
      <div>
        <ProfileIcon onRouteChange={onRouteChange} />
      </div>
    );
    // } else {
    //   changeNavigation = (
    //     <div className="flex mt-5 space-x-4 sm:space-x-4 md:space-x-6 text-xs sm:text-sm">
    //       <button
    //         className="cursor-pointer hover:text-zinc-200"
    //         onClick={() => onRouteChange("signin")}
    //       >
    //         Sign In
    //       </button>
    //       <button
    //         className="cursor-pointer hover:text-zinc-200"
    //         onClick={() => onRouteChange("register")}
    //       >
    //         Register
    //       </button>
    //     </div>
    //   );
  }
  return (
    <nav className="flex justify-between items-center pr-2 sm:pr-4 md:pr-6 pl-2 sm:pl-4 md:pl-6 pt-2 pb-1 h-14 text-white">
      <Logo />
      {changeNavigation}
    </nav>
  );
};

export default Navigation;
