import { useEffect, useState } from "react";
import { useRequest } from "../../utils/hooks/useRequest";
import { useParams } from "react-router-dom";
import ProductDetailCard from "../Card/ProductDetailCard";
import { PRODUCT_DETAIL_QUERY } from "../../utils/constants";

const ProductDetail = () => {
  const { productId } = useParams();
  const productDetailsHook = useRequest(PRODUCT_DETAIL_QUERY(productId));
  const [product, setProduct] = useState();

  useEffect(() => {
    if (!productDetailsHook.isLoading) {
      setProduct(productDetailsHook.data.results[0]);
    }
  }, [productDetailsHook.isLoading]);

  const showLoading = productDetailsHook.isLoading;

  return showLoading ? (
    <div className="loader">
      <i className="fa fa-spinner fa-spin"></i>
    </div>
  ) : product ? (
    <main>
      <ProductDetailCard product={product} />
    </main>
  ) : (
    <div>Product not found</div>
  );
};

export default ProductDetail;
