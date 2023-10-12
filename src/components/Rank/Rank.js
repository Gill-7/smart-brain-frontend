import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-sm sm:text-base md:text-lg">
        {`${name}, your current entry count is...`}
      </div>
      <div className="mb-3 text-3xl sm:text-lg md:text-2xl">{entries}</div>
    </div>
  );
};

export default Rank;
