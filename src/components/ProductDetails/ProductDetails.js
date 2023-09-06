import { useEffect, useState } from "react";
import { useProductDetails } from "../../utils/hooks/useProductDetails";
import { useParams } from "react-router-dom";
import ProductDetailCard from "../Card/ProductDetailCard";

const ProductDetail = () => {
  const { productId } = useParams();
  const productDetailsHook = useProductDetails(productId);
  const [product, setProduct] = useState();

  useEffect(() => {
    if (!productDetailsHook.isLoading) {
      setProduct(productDetailsHook.data.results[0]);
    }
  }, [productDetailsHook.isLoading]);

  return productDetailsHook.isLoading ? (
    <div className="loader">
      <i className="fa fa-spinner fa-spin"></i>
    </div>
  ) : product ? (
    <main>
      <ProductDetailCard product={product}/>
    </main>
  ) : (
    <div>Product not found</div>
  );
};

export default ProductDetail;
