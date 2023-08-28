import { useState } from "react";
import Card from "../Card/Card";

const Carousel = ({ items }) => {
  const [currentItem, setCurrentItem] = useState(0);
  const handledClickPrevious = () => {
    setCurrentItem(currentItem == 0 ? items.length - 1 : currentItem - 1);
  };

  const handledClickNext = () => {
    setCurrentItem(currentItem == items.length - 1 ? 0 : currentItem + 1);
  };

  return (
    <>
      <Card
        key={items[currentItem].id}
        name={items[currentItem].data.name}
        url={items[currentItem].data.main_image.url}
        alt={items[currentItem].data.main_image.alt}
        classSection="carousel_main"
      />
      <section className="carousel_controls">
        <button onClick={handledClickPrevious}>Previous</button>
        <button onClick={handledClickNext}>Next</button>
      </section>
    </>
  );
};

export default Carousel;
