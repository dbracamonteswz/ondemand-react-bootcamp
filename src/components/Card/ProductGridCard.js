import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { formatMoney } from "../../utils/formatUtils";

const ProductGridCard = ({
  name,
  price,
  category,
  url,
  alt,
  classSection,
  id,
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
      <div className="shopping-controls">
        <div className="counter">
          <button className="fa fa-minus-circle" />
          <input type="text" defaultValue="1" readOnly />
          <button className="fa fa-plus-circle" />
        </div>
        <button>Add to Cart</button>
      </div>
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
  id: PropTypes.string.isRequired
};

export default ProductGridCard;
