import Carousel from "../Carousel/Carousel";
import Slider from "../Slider/Slider";
import productCategoriesMock from "../../mocks/en-us/product-categories.json";
import featuredBannersMock from "../../mocks/en-us/featured-banners.json";
import featuredProductsMock from "../../mocks/en-us/featured-products.json";
import ProductListPage from "../ProductListPage/ProductListPage";

const Main = ({showHomePage, showAllProducts, onViewChange} ) => {

   
  return (
    <main>
      {showHomePage && (
        <>
          <button onClick={() => onViewChange(false, true)}>View all products</button>
          <h1>Home Page</h1>
          <Slider items={featuredBannersMock.results} />
          <Carousel items={productCategoriesMock.results} />
        </>
      )}

      {showAllProducts && (
        <>
          <button onClick={() => onViewChange(true, false)}>Home Page</button>
          <ProductListPage items={featuredProductsMock.results} />
        </>
      )}
    </main>
  );
};

export default Main;
