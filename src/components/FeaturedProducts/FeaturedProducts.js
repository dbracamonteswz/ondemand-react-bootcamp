import Card from "../Card/Card";

const FeaturedProducts = ({ items }) => {
  const getData = (item) => {
    return {
      name: item.data.name,
      price: item.data.price,
      category: item.data.category.slug,
      url: item.data.mainimage.url,
      alt: item.data.category.slug,
      classSection: "grid-section",
    };
  };

  return (
    <>
      <h1>Grid Section</h1>
      <article className="grid-columns">
        {items.map((item) => {
          return <Card key={item.id} data={getData(item)} />;
        })}
      </article>
    </>
  );
};

export default FeaturedProducts;
