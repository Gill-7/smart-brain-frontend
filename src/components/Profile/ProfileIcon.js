import React from "react";
import { CgProfile } from "react-icons/cg";

export default class ProfileIcon extends React.Component {
  handleSignOut = () => {
    fetch("https://face-detection-backend-eef6.onrender.com/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        res.json();
        sessionStorage.removeItem("token");
        this.props.onRouteChange("signin");
      })

      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { isDropdownOpen, toggleProfileDropdown, toggleProfileModal } =
      this.props;
    return (
      <div className="relative inline-block text-left">
        <button
          onClick={toggleProfileDropdown}
          className={`mt-6 md:mt-5 inline-flex w-full justify-center text-xl text-white outline-none shadow-sm cursor-pointer rounded-full hover:ring-2 hover:ring-gray active:ring-2 active:ring-gray focus:outline-none ${
            isDropdownOpen ? "ring-2 ring-white" : ""
          }`}
        >
          <CgProfile />
        </button>
        {isDropdownOpen && (
          <div
            onClick={toggleProfileDropdown}
            className="fixed w-screen h-screen top-0 left-0 bottom-0 right-0 z-5"
          ></div>
        )}
        {isDropdownOpen && (
          <div className="absolute right-0 z-10 w-32 md:w-40 lg:w-48 origin-top-right rounded-md bg-[#516395] shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in divide-y divide-gray">
            <li
              className="rounded-t-md block px-3 md:px-4 py-1.5 md:py-2 text-xs text-white cursor-pointer hover:bg-[#5874bf]"
              onClick={() => toggleProfileModal()}
            >
              View Settings
            </li>
            <li
              className="rounded-b-md block px-3 md:px-4 py-1.5 md:py-2 text-xs text-white cursor-pointer hover:bg-[#5874bf]"
              onClick={() => this.handleSignOut()}
            >
              Sign Out
            </li>
          </div>
        )}
      </div>
    );
  }
}
