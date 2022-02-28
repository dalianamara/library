import { useState } from "react";
import "../css/stars.css";

const Stars = () => {
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const defaultStars = [1, 2, 3, 4, 5];

  return defaultStars.map((i) => {
    i += 1;
    return (
      <button
        onClick={() => setStars(i)}
        className={i <= (hover || stars) ? "on" : "off"}
        onMouseEnter={() => setHover(i)}
        onMouseLeave={() => setStars(stars)}
      >
        <span>&#9733;</span>
      </button>
    );
  });
};
export default Stars;
