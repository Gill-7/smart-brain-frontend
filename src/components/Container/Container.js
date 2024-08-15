import React, { Component } from "react";
import ImageLinkForm from ".././ImageLinkForm/ImageLinkForm";
import FaceRecognition from ".././FaceRecognition/FaceRecognition";
import Rank from ".././Rank/Rank";

export default class Container extends Component {
  render() {
    const {
      name,
      entries,
      onInputUrlChange,
      onChooseFileChange,
      onSubmit,
      imageUrl,
      imageSrc,
      inputUrl,
      chooseFileRef,
      boxes,
      error,
    } = this.props;
    return (
      <div className="w-full text-white text-sm md:text-base sm:w-[400px] mx-4 py-10  px-2 md:px-3">
        <Rank name={name} entries={entries} />
        <ImageLinkForm
          inputUrl={inputUrl}
          chooseFileRef={chooseFileRef}
          onInputUrlChange={onInputUrlChange}
          onChooseFileChange={onChooseFileChange}
          onSubmit={onSubmit}
        />
        {error && (
          <div className="text-red text-left mt-4 text-xs md:text-sm">
            Both URL and file inputs cannot be used simultaneously.
          </div>
        )}
        {imageUrl && <FaceRecognition image={imageUrl} boxes={boxes} />}
        {imageSrc && <FaceRecognition image={imageSrc} boxes={boxes} />}
      </div>
    );
  }
}
