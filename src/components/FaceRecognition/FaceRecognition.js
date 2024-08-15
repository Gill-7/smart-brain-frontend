import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ image, boxes }) => {
  return (
    <div className="mt-4 w-full relative">
      <img id="inputImage" src={image} alt="not provided" className="w-full" />
      {boxes.map((box) => (
        <div
          key={`box${box.topRow}${box.rightCol}`}
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      ))}
    </div>
  );
};

export default FaceRecognition;
