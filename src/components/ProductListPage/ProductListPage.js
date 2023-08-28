import { useEffect, useState, useRef } from "react";
import productCategories from "../../mocks/en-us/product-categories.json";
import productsMock from "../../mocks/en-us/products.json";
import Card from "../Card/Card";

const ProductListPage = () => {
  const [isLoading, setLoading] = useState(true);
  const initProducts = productsMock.results;
  const [products, setProducts] = useState(initProducts);
  const [filters, setFilters] = useState(new Map());

  const handleChange = (event) => {
    const isChecked = event.target.checked;
    const value = event.target.value.toLowerCase();

    setFilters((map) => {
      if (!isChecked) map.delete(value);
      else map.set(event.target.value.toLowerCase(), event.target.checked);

      return new Map(map);
    });
  };

  useEffect(() => {
    setProducts(
      filters.size == 0
        ? initProducts
        : initProducts.filter((product) =>
            filters.get(product.data.category.slug.toLocaleLowerCase())
          )
    );
  }, [filters]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      ) : (
        <>
          <h1>This is the Product List Page</h1>
          <div className="product-list-wrapper">
            <aside>
              <ul>
                {productCategories.results.map((category) => (
                  <li key={category.id}>
                    <input
                      type="checkbox"
                      name="nameOfChoice"
                      value={category.data.name}
                      onChange={(event) => handleChange(event)}
                    />
                    {category.data.name}
                  </li>
                ))}
              </ul>
            </aside>
            <article className="grid-columns">
              {products.map((item) => {
                return (
                  <Card
                    key={item.id}
                    name={item.data.name}
                    price={item.data.price}
                    category={item.data.category.slug}
                    url={item.data.mainimage.url}
                    alt={item.data.mainimage.alt}
                    classSection="grid-section"
                  />
                );
              })}
            </article>
          </div>
        </>
      )}
    </>
  );
};

export default ProductListPage;
