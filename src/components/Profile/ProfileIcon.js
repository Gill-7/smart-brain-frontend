import React from "react";
// import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { CgProfile } from "react-icons/cg";

export default class ProfileIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
    };
  }

  toggleDropdown = () => {
    this.setState((prevState) => ({
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  };

  render() {
    return (
      <div className="relative inline-block text-left">
        <button
          onClick={this.toggleDropdown}
          className={`mt-6 md:mt-5 inline-flex w-full justify-center text-base sm:text-xl outline-none shadow-sm cursor-pointer rounded-full hover:ring-2 hover:ring-gray active:ring-2 active:ring-gray focus:outline-none ${
            this.state.isDropdownOpen ? "ring-2 ring-white" : ""
          }`}
        >
          <CgProfile />
        </button>
        {this.state.isDropdownOpen && (
          <div
            onClick={this.toggleDropdown}
            className="fixed w-screen h-screen top-0 left-0 bottom-0 right-0 z-5"
          ></div>
        )}
        {this.state.isDropdownOpen && (
          <div className="absolute right-0 z-10 w-28 md:w-36 lg:w-44 origin-top-right rounded-md bg-[#516395] shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
            <ul>
              <li className="rounded-t-lg block px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm text-white cursor-pointer hover:bg-[#5874bf]">
                Settings
              </li>
              <li
                className="rounded-b-md block px-3 md:px-2 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm text-white cursor-pointer hover:bg-[#5874bf]"
                onClick={() => this.props.onRouteChange("signin")}
              >
                Sign out
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}
