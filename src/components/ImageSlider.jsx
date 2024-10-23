import React, { useState, useRef, useEffect } from "react";
import images from "../assets/images";
import ForwardTwoToneIcon from "@mui/icons-material/ForwardTwoTone";
import "./imageSlider.css";
import Dots from "./Dots";

function ImageSlider() {
  const [visibleId, setVisibleId] = useState(0);
  const imagesLength = Object.keys(images).length;
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef(null);
  const transitionDuration = 1000; // Transition duration in milliseconds (1 second)

  // Function to handle the next image
  function handleNextImage() {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setVisibleId((prevId) => (prevId + 1) % imagesLength); // Move to next image
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false); // Unlock state after animation completes
      }, transitionDuration); // Delay should match CSS transition duration
    }
  }

  // Function to handle the previous image
  function handlePrevImage() {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setVisibleId((prevId) => (prevId - 1 + imagesLength) % imagesLength); // Move to previous image
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false); // Unlock state after animation completes
      }, transitionDuration); // Delay should match CSS transition duration
    }
  }

  // Handle space key for next image navigation
  function handleKeyDown(event) {
    if (event.code === "Space" && !isTransitioning) {
      // Check isTransitioning here as well
      event.preventDefault(); // Prevent scrolling
      handleNextImage(); // Move to the next image when Space is pressed
    }
  }

  // Attach keydown event listener
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown); // Clean up event listener
    };
  }, []);

  // Clean up timeout when component unmounts
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section aria-label="Image Slider" className="mySlider">
      {Object.keys(images).map((key, id) => (
        <img
          aria-hidden={id !== visibleId}
          key={key}
          src={images[Object.keys(images)[id]]}
          alt={`Car Image  ${id + 1}`}
          className="img-slider-img"
          style={{ translate: `${-100 * visibleId}%` }}
        />
      ))}

      <button
        className="icon-container left"
        onClick={handlePrevImage}
        disabled={isTransitioning} // Disable button while transitioning
        aria-label="View Previous Image"
      >
        <ForwardTwoToneIcon className="forward-icon" />
      </button>
      <button
        className="icon-container right"
        aria-label="View Next Image"
        onClick={handleNextImage}
        disabled={isTransitioning} // Disable button while transitioning
      >
        <ForwardTwoToneIcon className="forward-icon" />
      </button>
      <div className="dots-container">
        <Dots
          images={Object.keys(images)}
          visibleId={visibleId}
          setVisibleId={setVisibleId}
        />
      </div>
    </section>
  );
}

export default ImageSlider;
