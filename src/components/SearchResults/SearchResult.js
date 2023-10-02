import React,{ useRequest } from "../../utils/hooks/useRequest";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import ProductGridCard from "../Card/ProductGridCard";
import { PRODUCT_SEARCH_QUERY } from "../../utils/constants";

const SearchResult = () => {
  const queryParams = new URLSearchParams(useLocation().search);
  const searchTerm = queryParams.get("searchTerm")?.toLocaleLowerCase();
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const searchResultHook = useRequest(PRODUCT_SEARCH_QUERY(searchTerm, pageSize, page ));
  const [products, setProducts] = useState();

  const handleSetPage = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (!searchResultHook.isLoading) {
      setProducts(searchResultHook.data.results);
    }
  }, [searchResultHook.isLoading]);

  const showLoading = searchResultHook.isLoading;

  return (
    <main>
      { showLoading ? (
        <div className="loader">
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      ) : (
        <div data-testid='search-section'>
          <Link to="/home">
            <button>Home Page</button>
          </Link>
          <div className="product-list-wrapper">
            <aside></aside>
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
                    stock={item.data.stock}
                  />
                ))
              ) : (
                <label>No products found for the search</label>
              )}
            </article>
          </div>
          <Pagination
            page={page}
            totalPages={searchResultHook.data.total_pages}
            handleSetPage={handleSetPage}
          />
        </div>
      )}
    </main>
  );
};

export default SearchResult;
