import React from "react";

const Rank = ({ name, entries }) => {
  let capitalizeName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <div className="flex flex-col justify-center items-center">
      <blockquote className="italic text-center text-xs md:text-sm">
        <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 md:before:-skew-y-6 before:bg-light-red relative inline-block mr-1 md:mr-2">
          <span className="relative text-black">{capitalizeName}</span>
        </span>
        {"  "}
        Total number of pictures you entered...
      </blockquote>
      <div className="mt-1 mb-2 text-2xl">{entries}</div>
    </div>
  );
};

export default Rank;
