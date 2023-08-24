import { useEffect, useState, useRef } from "react";
import productCategories from "../../mocks/en-us/product-categories.json";
import mockProducts from "../../mocks/en-us/products.json";

const ProductListPage = ({ items }) => {
  const [isLoading, setLoading] = useState(true);
  const initProducts = mockProducts.results;
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
        <div className="loader"></div>
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
                  <section className="grid-section" key={item.id}>
                    <h5>Name {item.data.name}</h5>
                    <h5>Price {item.data.price}</h5>
                    <h5>Category {item.data.category.slug}</h5>
                    <img
                      src={item.data.mainimage.url}
                      alt={item.data.mainimage.alt}
                    />
                  </section>
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
