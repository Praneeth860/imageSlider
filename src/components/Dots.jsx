import React from "react";
import "./dots.css";
function Dots({ images, visibleId, setVisibleId }) {
  return (
    <>
      {images.map((key, index) => (
        <button
          key={key}
          aria-label={`View Image ${index + 1}`}
          className={`dots ${index === visibleId ? "active" : ""}`}
          onClick={() => setVisibleId(index)}
        ></button>
      ))}
    </>
  );
}

export default Dots;
