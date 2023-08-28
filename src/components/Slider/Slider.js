import { useState } from "react";
import Card from "../Card/Card";

const Slider = ({ items }) => {
  const [showItems, setShowItems] = useState(items);

  const handledClickPrevious = () => {
    setShowItems([
      ...showItems.slice(showItems.length - 1, showItems.length),
      ...showItems.slice(0, showItems.length - 1),
    ]);
  };

  const handledClickNext = () => {
    setShowItems([
      ...showItems.slice(1, showItems.length),
      ...showItems.slice(0, 1),
    ]);
  };

  return (
    <>
      <h1>Slider Section</h1>
      <article className="slider-columns">
        {showItems.map((item) => (
          <Card
            key={item.id}
            name={item.data.title}
            url={item.data.main_image.url}
            alt={item.data.main_image.alt}
            classSection="slider_section"
          />
        ))}
      </article>
      <section className="slider_controls">
        <button onClick={handledClickPrevious}>Previous</button>
        <button onClick={handledClickNext}>Next</button>
      </section>
    </>
  );
};

export default Slider;
