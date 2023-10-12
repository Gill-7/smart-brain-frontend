import React from "react";

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-6">
      <p className="text-sm sm:text-base md:text-lg">
        Smart Brain will detect faces in your pictures.
      </p>
      <div className="w-full space-y-6 flex flex-col">
        <input
          type="text"
          className="placeholder:italic placeholder:text-slate-400 w-full place-self-center border-slate-300 rounded-lg py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-yellow-50 focus:ring-1 text-sm sm:text-base text-slate-950"
          placeholder="Type in the image url"
          onChange={onInputChange}
          required
        />
        <button
          className="border m-auto mt-3 px-4 pt-0 pb-1 text-md bg-slate-700 hover:bg-slate-500"
          onClick={onSubmit}
        >
          Detect
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
