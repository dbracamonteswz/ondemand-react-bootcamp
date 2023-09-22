import { useEffect, useState, useContext, useRef } from "react";
import { useLocation, Outlet } from "react-router-dom";
import ProductGridCard from "../Card/ProductGridCard";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import { useRequest } from "../../utils/hooks/useRequest";
import { CATEGORIES_QUERY, PRODUCTS_QUERY } from "../../utils/constants";

const ProductListPage = () => {
  const queryParams = new URLSearchParams(useLocation().search);
  const [initProducts, setInitProducts] = useState();
  const [products, setProducts] = useState(initProducts);
  const productCategories = useRequest(CATEGORIES_QUERY);
  const categoryParam = queryParams.get("category")?.toLocaleLowerCase();
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const ref = useRef([]);
  const productsHook = useRequest(PRODUCTS_QUERY(pageSize, page));
  const [checkedCategoryState, setCheckedCategoryState] = useState([]);

  const handleChangeCategory = (event) => {
    const isChecked = event.target.checked;
    const category = event.target.value.toLowerCase();

    setCheckedCategoryState((prevCategoryFilters) => {
      if (isChecked) {
        return [...prevCategoryFilters, category];
      } else {
        return prevCategoryFilters.filter(
          (categoryName) => categoryName != category
        );
      }
    });
  };

  const isCheckedCategory = (categoryName) =>
    checkedCategoryState.findIndex(
      (category) => category === categoryName.toLowerCase()
    ) != -1;

  const handleSetPage = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (!productsHook.isLoading) {
      setProducts(
        checkedCategoryState.length == 0
          ? initProducts
          : initProducts.filter((product) =>
              checkedCategoryState.includes(
                product.data.category.slug.toLowerCase()
              )
            )
      );
    }
  }, [checkedCategoryState]);

  useEffect(() => {
    if (!productsHook.isLoading) {
      if (categoryParam)
        setCheckedCategoryState((prevFilters) => [
          ...prevFilters,
          categoryParam,
        ]);
      setInitProducts(productsHook.data.results);
      setProducts(productsHook.data.results);
    }
  }, [productsHook.isLoading]);

  const showLoading = productCategories.isLoading || productsHook.isLoading;

  return (
    <main>
      {showLoading ? (
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
                {productCategories.data.results.map((category, index) => (
                  <li key={category.id}>
                    <input
                      type="checkbox"
                      name={category.data.name}
                      value={category.data.name}
                      onChange={handleChangeCategory}
                      checked={isCheckedCategory(category.data.name)}
                    />
                    {category.data.name}
                  </li>
                ))}
              </ul>
              <button onClick={() => setCheckedCategoryState([])}>
                Clear Filters
              </button>
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
                    stock={item.data.stock}
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
