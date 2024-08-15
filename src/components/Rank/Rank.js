import React from "react";

const Rank = ({ name, entries }) => {
  let capitalizeName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <div className="flex flex-col justify-center items-center">
      <blockquote className="italic text-center">
        <span className="before:block before:absolute before:-inset-1 before:-skew-y-6 before:bg-red relative inline-block">
          <span className="relative text-white">{capitalizeName} </span>
        </span>
        {"  "}
        Total number of pictures you entered...
      </blockquote>
      <div className="mt-2 mb-2 text-2xl">{entries}</div>
    </div>
  );
};

export default Rank;
