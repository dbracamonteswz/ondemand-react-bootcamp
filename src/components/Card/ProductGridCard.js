import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { formatMoney } from "../../utils/formatUtils";
import ShoppingControls from "../ShoppingControls/ShoppingControls";

const ProductGridCard = ({
  name,
  price,
  category,
  url,
  alt,
  classSection,
  id,
  stock,
}) => {
  return (
    <section className={classSection}>
      <img src={url} alt={alt} />
      <h5>{name}</h5>
      {price && <h5>Price {formatMoney(price)}</h5>}
      {category && <h5>Category {category}</h5>}

      <Link to={`/products/${id}`}>
        <button className="btn-details">Go to Details</button>
      </Link>

      <ShoppingControls
        cartItem={{
          name: name,
          price: price,
          stock: stock,
          id: id,
          imageUrl: url,
        }}
      />
    </section>
  );
};

ProductGridCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
  category: PropTypes.string,
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  classSection: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired,
};

export default ProductGridCard;
