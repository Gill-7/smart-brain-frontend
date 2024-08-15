import React from "react";

const ImageLinkForm = ({
  inputUrl,
  onInputUrlChange,
  onChooseFileChange,
  chooseFileRef,
  onSubmit,
}) => {
  // const [error, setError] = useState(false);

  // handleError = () => {

  // }
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="mb-4">Choose a picture or paste in url</p>
      <div className="w-full flex flex-col">
        <input
          type="file"
          id="avatar"
          className="block w-full mb-4 text-xs md:text-sm
              file:mr-3 file:py-1.5 file:px-3
              file:rounded-lg file:border-0
              file:text-xs md:file:text-sm
              	 file:text-black file:bg-extra-gray hover:file:bg-light-gray
              "
          accept="image/*"
          ref={chooseFileRef}
          onChange={onChooseFileChange}
        />

        <div className="relative mb-5">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-black dark:text-black"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full py-1.5 md:py-2 ps-10 text-sm text-black border border-gray rounded-lg bg-white focus:ring-blue focus:border-blue mx-auto"
            placeholder="Type in the image url"
            value={inputUrl}
            onChange={onInputUrlChange}
          />
        </div>

        <button
          className="w-20 md:w-24 place-self-center
                py-1 md:py-1.5 text-sm md:text-base
                rounded-md text-white hover:text-light-red md:text-white md:hover:text-gray font-bold border border-red active:bg-red focus:outline-none focus:ring focus:ring-light-red"
          onClick={onSubmit}
        >
          Detect
        </button>
        {/* {error && <p className="text-red mt-2">Please choose one option.</p>} */}
      </div>
    </div>
  );
};

export default ImageLinkForm;
