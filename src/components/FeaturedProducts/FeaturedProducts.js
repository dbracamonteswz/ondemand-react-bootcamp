import Card from "../Card/Card";

const FeaturedProducts = ({ items , handleViewChange}) => {
  return (
    <>
      <h1>Featured Products</h1>
      <button id="show-products-btn" onClick={() => handleViewChange(false, true)}>View all products</button>
      <article className="grid-columns">
        {items.map((item) => {
          return (
            <Card
              key={item.id}
              name={item.data.name}
              price={item.data.price}
              url={item.data.mainimage.url}
              alt={item.data.category.slug}
              classSection="grid-section"
            />
          );
        })}
      </article>
    </>
  );
};

export default FeaturedProducts;
