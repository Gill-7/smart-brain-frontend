import React from "react";
import Logo from "../Logo/Logo";
import ProfileIcon from "../Profile/ProfileIcon";

const Navigation = ({
  onRouteChange,
  isSignedIn,
  toggleProfileModal,
  isDropdownOpen,
  toggleProfileDropdown,
}) => {
  let changeNavigation = "";
  if (isSignedIn) {
    changeNavigation = (
      <div>
        <ProfileIcon
          isDropdownOpen={isDropdownOpen}
          toggleProfileDropdown={toggleProfileDropdown}
          onRouteChange={onRouteChange}
          toggleProfileModal={toggleProfileModal}
        />
      </div>
    );
  }
  return (
    <nav className="flex justify-between items-center pr-2 sm:pr-4 md:pr-6 pl-2 sm:pl-4 md:pl-6 pt-2 pb-1 h-14 text-white">
      <Logo />
      {changeNavigation}
    </nav>
  );
};

export default Navigation;
