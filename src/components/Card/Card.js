import PropTypes from "prop-types";
import { formatMoney } from "../../utils/formatUtils";
const Card = ({ name, price, category, url, alt, classSection }) => {
  return (
    <section className={classSection}>
      <h5>{name}</h5>
      {price && <h5>Price {formatMoney(price)}</h5>}
      {category && <h5>Category {category}</h5>}
      <img src={url} alt={alt} />
    </section>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
  category: PropTypes.string,
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  classSection:  PropTypes.string.isRequired
};

export default Card;
