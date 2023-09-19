import React from "react";
import Carousel from "../Carousel/Carousel";
import Slider from "../Slider/Slider";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import { useRequest } from "../../utils/hooks/useRequest";
import { CATEGORIES_QUERY, FEATURED_PRODUCTS_QUERY, FEATURED_BANNERS_QUERY} from "../../utils/constants";

const Main = () => {
  const featuredBanners = useRequest(FEATURED_BANNERS_QUERY);
  const featuredProducts = useRequest(FEATURED_PRODUCTS_QUERY);
  const productCategories = useRequest(CATEGORIES_QUERY);

  const showLoading =
    featuredBanners.isLoading ||
    productCategories.isLoading ||
    featuredProducts.isLoading;

  return (
    <main>
      {showLoading ? (
        <div className="loader">
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      ) : (
        <>
          <h1>Home Page</h1>
          <Slider items={featuredBanners.data.results} />
          <Carousel items={productCategories.data.results} />
          <FeaturedProducts items={featuredProducts.data.results} />
        </>
      )}
    </main>
  );
};

export default Main;
