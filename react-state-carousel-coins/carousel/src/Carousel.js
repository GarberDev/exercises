import React, { useState } from "react";

function Carousel({ photos, title }) {
  const [currCardIdx, setCurrCardIdx] = useState(0);

  const currCard = photos[currCardIdx];
  const total = photos.length;

  // Increments currCardIdx state by 1
  function goForward() {
    setCurrCardIdx(currCardIdx + 1);
  }

  // Decrements currCardIdx state by 1
  function goLeft() {
    setCurrCardIdx((currCardIdx) =>
      currCardIdx > 0 ? currCardIdx - 1 : currCardIdx
    );
  }
  return (
    <div className="Carousel">
      <h1>{title}</h1>
      <div className="Carousel-main">
        {currCardIdx > 0 && (
          <i
            className="bi bi-arrow-left-circle"
            onClick={goLeft}
            data-testid="left-arrow"
          />
        )}
        <Card
          caption={currCard.caption}
          src={currCard.src}
          currNum={currCardIdx + 1}
          totalNum={total}
        />
        {currCardIdx < photos.length - 1 && (
          <i
            className="bi bi-arrow-right-circle"
            onClick={goForward}
            data-testid="right-arrow"
          />
        )}
      </div>
    </div>
  );
}

export default Carousel;
