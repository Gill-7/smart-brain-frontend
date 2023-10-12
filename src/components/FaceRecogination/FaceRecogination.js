import React from "react";
import "./FaceRecogination.css";

const FaceRecogination = ({ imageUrl, box }) => {
  return (
    <div className="mt-4 w-full relative border">
      <img
        id="inputImage"
        src={imageUrl}
        alt="face detection"
        className="w-full"
      />
      <div
        className="bounding-box"
        style={{
          top: box.topRow,
          right: box.rightCol,
          bottom: box.bottomRow,
          left: box.leftCol,
        }}
      ></div>
    </div>
  );
};

export default FaceRecogination;
