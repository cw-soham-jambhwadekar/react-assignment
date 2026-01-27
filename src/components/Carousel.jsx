import { useState } from "react";
import "../styles/Carousel.css"

function Carousel({ images }) {
  const [index, setIndex] = useState(0);

  if (!images.length) return null;

  const prev = () => {
    setIndex(i => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = () => {
    setIndex(i => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="carousel">
      <img
        src={images[index]}
        alt={`slide-${index}`}
        className="carousel-image"
        onError={(e) => {
          e.currentTarget.src = "https://imgd.aeplcdn.com/0x0/cw/static/icons/svg/no-image.svg";
        }}
      />

      {images.length > 1 && (
        <>
          <button className="carousel-btn left" onClick={prev}>
            ‹
          </button>
          <button className="carousel-btn right" onClick={next}>
            ›
          </button>

        </>
      )}
    </div>
  );
}

export default Carousel;
