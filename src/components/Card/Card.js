const Card = ({
  data: { name, price, category, url, alt, classSection },
}) => {
  return (
    <section className={classSection}>
      <h5>{name}</h5>
      {price && <h5>Price {price}</h5>}
      {category && <h5>Category {category}</h5>}
      <img src={url} alt={alt} />
    </section>
  );
};

export default Card;
