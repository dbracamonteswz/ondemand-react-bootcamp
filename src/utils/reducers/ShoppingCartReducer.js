import { calculateCart } from "../shoppingCartUtils";
export const ShoppingStateActions = {
  DELETE_ITEMS: "DELETE_ITEMS",
  MINUS_ITEM: "MINUS_ITEM",
  ADD_ITEM: "ADD_ITEM",
  PLUS_ITEM: "PLUS_ITEM",
};

export const initialStateShoppingCart = {
  count: 0,
  total: 0,
  products: [],
};

const shoppinCartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ShoppingStateActions.DELETE_ITEMS: {
      const newProducts = state.products.filter(
        (product) => product.id != payload.id
      );

      const { total, count } = calculateCart(newProducts);

      return {
        products: newProducts,
        total,
        count,
      };
    }

    case ShoppingStateActions.MINUS_ITEM: {
      const newProducts = [...state.products];

      const indexItem = newProducts.findIndex(
        (product) => product.id == payload.id
      );

      newProducts[indexItem].quantity -= 1;
      const { total, count } = calculateCart(newProducts);

      return {
        total: total,
        count: count,
        products: newProducts,
      };
    }

    case ShoppingStateActions.PLUS_ITEM: {
      const newProducts = [...state.products];

      const indexItem = newProducts.findIndex(
        (product) => product.id == payload.id
      );

      newProducts[indexItem].quantity += 1 ;
      const { total, count } = calculateCart(newProducts);

      return {
        total: total,
        count: count,
        products: newProducts
      };
    }

    case ShoppingStateActions.ADD_ITEM:{
      const newProducts = [...state.products];
      const indexItem = newProducts.findIndex(
        (product) => product.id == payload.id
      );
      
    
      if(indexItem != -1) {
        newProducts[indexItem].quantity += payload.quantity ;
      } else {
        newProducts.push(payload);
      }

      const { total, count } = calculateCart(newProducts);

      return {
        total: total,
        count: count,
        products: newProducts
      };
    }
  }
};

export default shoppinCartReducer;
