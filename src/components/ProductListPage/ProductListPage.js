import { useEffect, useState, useContext, useRef } from "react";
import { useLocation, Outlet } from "react-router-dom";
import ProductGridCard from "../Card/ProductGridCard";
import { Link } from "react-router-dom";
import { useProducts } from "../../utils/hooks/useProducts";
import ShareDataContext from "../../context/shareDataContext";
import Pagination from "../Pagination/Pagination";

const ProductListPage = () => {
  const queryParams = new URLSearchParams(useLocation().search);
  const [initProducts, setInitProducts] = useState();
  const [products, setProducts] = useState(initProducts);
  const [filters, setFilters] = useState(new Map());
  const productCategories = useContext(ShareDataContext).productCategories;
  const categoryParam = queryParams.get("category")?.toLocaleLowerCase();
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const ref = useRef([]);
  const productsHook = useProducts(page, pageSize);

  const handleSetPage = (newPage) => {
    setPage(newPage);
  };

  const handleClearFilters = () => {
    for (var i = 0; i < ref.current.children.length; i++) {
      ref.current.children[i].children[0].checked = false;
    }

    setFilters(new Map());
  };

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
    if (!productsHook.isLoading) {
      if (categoryParam)
        setFilters((map) => new Map(map.set(categoryParam, true)));
      setInitProducts(productsHook.data.results);
      setProducts(productsHook.data.results);
    }
  }, [productsHook.isLoading]);

  return (
    <main>
      {productCategories.isLoading || productsHook.isLoading ? (
        <div className="loader">
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      ) : (
        <>
          <Link to="/home">
            <button>Home Page</button>
          </Link>
          <h1>This is the Product List Page</h1>
          <div className="product-list-wrapper">
            <aside>
              <ul ref={ref}>
                {productCategories.data.results.map((category) => (
                  <li key={category.id}>
                    <input
                      type="checkbox"
                      name={category.data.name}
                      value={category.data.name}
                      onChange={(event) => handleChange(event)}
                      defaultChecked={
                        category.data.name.toLowerCase() == categoryParam
                      }
                    />
                    {category.data.name}
                  </li>
                ))}
              </ul>
              <button onClick={handleClearFilters}>Clear Filters</button>
            </aside>
            <article className="grid-columns">
              {products && products.length > 0 ? (
                products.map((item) => (
                  <ProductGridCard
                    key={item.id}
                    name={item.data.name}
                    price={item.data.price}
                    category={item.data.category.slug}
                    url={item.data.mainimage.url}
                    alt={item.data.mainimage.alt}
                    id={item.id}
                    classSection="grid-section"
                  />
                ))
              ) : (
                <label>No products found with the categories selected</label>
              )}
            </article>    
          </div>
          <div>
              <Pagination 
                page={page}
                totalPages={productsHook.data.total_pages}
                handleSetPage={handleSetPage}
              />
            </div>
          <Outlet />
        </>
      )}
    </main>
  );
};

export default ProductListPage;
