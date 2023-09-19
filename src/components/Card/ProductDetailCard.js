import React  from 'react';
import SwiperCore, {
  Navigation,
  Pagination,
  EffectFade,
  Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import PropTypes from "prop-types";
import { formatMoney } from "../../utils/formatUtils";
import ShoppingControls from "../ShoppingControls/ShoppingControls";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, EffectFade, Autoplay]);

const ProductDetailCard = ({ product }) => {

  return (
    <section className="product-card">
      <Swiper
        centeredSlides={true}
        slidesPerView={"1"}
        pagination={true}
        navigation={true}
        className="mySwiper"
      >
        {product.data.images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img.image.url} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
      <h1>{product.data.name}</h1>
      <p className="price">Price {formatMoney(product.data.price)}</p>
      <p>Sku {product.data.sku}</p>
      <p>Category {product.data.category.slug}</p>
      <p className="description">{product.data.short_description}</p>
      <p>
        <span className="tag">Tags</span>
        {product.tags.map((tag, index) => (
          <span
            key={index}
            className={index % 2 == 0 ? "tag blue-tag" : "tag green-tag"}
          >
            {tag}
          </span>
        ))}
      </p>
      <table className="table-specs">
        <thead>
          <tr>
            <th>Spec</th>
            <th>Desc</th>
          </tr>
        </thead>
        <tbody>
          {product.data.specs.map((item, i) => (
            <tr key={i}>
              <td>{item.spec_name}</td>
              <td>{item.spec_value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ShoppingControls
        cartItem={{
          id: product.id,
          name: product.data.name,
          price: product.data.price,
          stock: product.data.stock,
          imageUrl: product.data.mainimage.url
        }}
      />
    </section>
  );
};

ProductDetailCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductDetailCard;
