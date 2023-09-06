import Carousel from "../Carousel/Carousel";
import Slider from "../Slider/Slider";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import { useFeaturedBanners } from "../../utils/hooks/useFeaturedBanners";
import { useFeaturedProducts } from "../../utils/hooks/useFeaturedProducts";
import ShareDataContext from "../../context/shareDataContext";
import { useContext } from "react";

const Main = () => {
  const featuredBanners = useFeaturedBanners();
  const featuredProducts = useFeaturedProducts();
  const productCategories = useContext(ShareDataContext).productCategories;

  return (
    <main>
      {featuredBanners.isLoading ||
      productCategories.isLoading ||
      featuredProducts.isLoading ? (
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
