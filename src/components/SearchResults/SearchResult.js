import { useSearchResults } from "../../utils/hooks/useSearchResult";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import ProductGridCard from "../Card/ProductGridCard";

const SearchResult = () => {
  const queryParams = new URLSearchParams(useLocation().search);
  const searchTerm = queryParams.get("searchTerm")?.toLocaleLowerCase();
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const searchResultHook = useSearchResults(searchTerm, page, pageSize);
  const [products, setProducts] = useState();

  const handleSetPage = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (!searchResultHook.isLoading) {
      setProducts(searchResultHook.data.results);
    }
  }, [searchResultHook.isLoading]);

  return (
    <main>
      {searchResultHook.isLoading ? (
        <div className="loader">
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      ) : (
        <>
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
        </>
      )}
    </main>
  );
};

export default SearchResult;
