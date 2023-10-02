import React, { useState } from "react";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Carousel = ({ items }) => {
  const [currentItem, setCurrentItem] = useState(0);
  const handledClickPrevious = () => {
    setCurrentItem(currentItem == 0 ? items.length - 1 : currentItem - 1);
  };

  const handledClickNext = () => {
    setCurrentItem(currentItem == items.length - 1 ? 0 : currentItem + 1);
  };

  return (
    <div data-testid='carousel-section' >
      <Card
        key={items[currentItem].id}
        name={items[currentItem].data.name}
        url={items[currentItem].data.main_image.url}
        alt={items[currentItem].data.main_image.alt}
        classSection="carousel_main"
      />
      <section className="carousel_controls">
        <Link
          to={{
            pathname: "/products",
            search: `?category=${encodeURIComponent(items[currentItem].data.name)}`
          }}
        >
          <button>Go to Products</button>
        </Link>
        <button onClick={handledClickPrevious}>Previous</button>
        <button onClick={handledClickNext}>Next</button>
      </section>
    </div>
  );
};

Carousel.propTypes = {
  items: PropTypes.array.isRequired
};

export default Carousel;
