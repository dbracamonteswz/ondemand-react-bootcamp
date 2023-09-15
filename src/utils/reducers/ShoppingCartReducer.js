export const ShoppingStateEnums = {
  DELETE_ITEMS: 0,
  MINUS_ITEM: 1,
  ADD_ITEM: 2,
  PLUS_ITEM: 3,
};

export const initialStateShoppingCart = {
  count: 0,
  cartInfo: []
};

const shoppinCartReducer = (state, action) => {
  const { type, payload } = action;
  let copyCartInfo = [...state.cartInfo];
  const indexItem = state.cartInfo.findIndex(
    (cartItem) => cartItem.id == payload.id
  );

  switch (type) {
    case ShoppingStateEnums.DELETE_ITEMS:
      copyCartInfo = copyCartInfo.filter(
        (cartItem) => cartItem.id != payload.id
      );

      return {
        count: state.count - parseInt(payload.quantity),
        cartInfo: copyCartInfo,
      };

    case ShoppingStateEnums.MINUS_ITEM:

      if (copyCartInfo[indexItem].quantity > 1) {
        copyCartInfo[indexItem].quantity -= 1;
      } else {
        copyCartInfo = copyCartInfo.filter(
          (cartItem) => cartItem.id != payload.id
        );
      }

      return {
        count: state.count - 1,
        cartInfo: copyCartInfo,
      };

    case ShoppingStateEnums.PLUS_ITEM:
    console.log(" ShoppingStateEnums.PLUS_ITEM");
    state.cartInfo[indexItem].quantity += 1;

     console.log("quantity " +  copyCartInfo[indexItem].quantity);
      return {
        count: state.count + 1,
        cartInfo: [...state.cartInfo],
        quantity:state.cartInfo[indexItem].quantity
      };

    case ShoppingStateEnums.ADD_ITEM:
      if (indexItem === -1) {
        copyCartInfo = [...copyCartInfo, payload];
      } else {
        copyCartInfo[indexItem].quantity += parseInt(payload.quantity);
      }

      return {
        count: state.count + parseInt(payload.quantity),
        cartInfo: copyCartInfo,
      };
  }
};

export default shoppinCartReducer;
