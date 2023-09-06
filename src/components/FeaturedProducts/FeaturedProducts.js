import ProductGridCard from "../Card/ProductGridCard";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const FeaturedProducts = ({ items }) => {
  return (
    <>
      <h1>Featured Products</h1>
      <Link to="/products">
        <button id="show-products-btn">View all products</button>
      </Link>
      <article className="grid-columns">
        {items.map((item) => {
          return (
            <ProductGridCard
              key={item.id}
              name={item.data.name}
              price={item.data.price}
              category={item.data.category.slug}
              url={item.data.mainimage.url}
              alt={item.data.category.slug}
              id={item.id}
              classSection="grid-section"
            />
          );
        })}
      </article>
    </>
  );
};

FeaturedProducts.propTypes = {
  items: PropTypes.array.isRequired
};

export default FeaturedProducts;
