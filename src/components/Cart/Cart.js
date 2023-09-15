import React, { useContext, useReducer } from "react";
import { formatMoney } from "../../utils/formatUtils";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../../utils/context/ShoppingCartContext";
import { ShoppingStateEnums } from "../../utils/reducers/ShoppingCartReducer";

const Cart = () => {
  const [shoppingCartState, dispatchShoppingCart] = useContext(ShoppingCartContext);
  const isShoppingCartEmpty = shoppingCartState.count === 0;
console.log(shoppingCartState);

  const deleteCartItem = (cartItem) => {
    dispatchShoppingCart({type: ShoppingStateEnums.DELETE_ITEMS,payload: cartItem});
  };

  const minusCartItem = (cartItemId) => {
    dispatchShoppingCart({type: ShoppingStateEnums.MINUS_ITEM,payload:{id: cartItemId}});
  };

  const plusCartItem = (cartItemId) => {
    console.log("HandleplusCartItem" + cartItemId); 
    dispatchShoppingCart({type: ShoppingStateEnums.PLUS_ITEM,payload:{id: cartItemId}});
  };

  const getTotal = shoppingCartState.cartInfo.reduce((accumulator, cartItem) => {
    return accumulator + cartItem.quantity * cartItem.price;
  }, 0);

  return (
    <main>
      <div className="shopping-cart">
        {isShoppingCartEmpty ? (
          <h2>ShoppingCart is empty</h2>
        ) : (
          <>
            <div className="title">Shopping Cart</div>
            {shoppingCartState.cartInfo.map((cartItem) => (
              <div className="item" key={cartItem.id}>
                <div className="buttons">
                  <button
                    className="delete-btn fa fa-trash"
                    onClick={() => deleteCartItem(cartItem)}
                  ></button>
                </div>
                <div className="image">
                  <img src={cartItem.imageUrl} alt="" />
                </div>

                <div className="description">
                  <span>{cartItem.name}</span>
                  <span>Unit Price {formatMoney(cartItem.price)}</span>
                </div>

                <div className="quantity">
                  <button
                    className="minus-btn fa fa-minus"
                    type="button"
                    name="button"
                    onClick={() => minusCartItem(cartItem.id)}
                  ></button>
                  <input
                    type="text"
                    name="name"
                    value={cartItem.quantity}
                    readOnly={true}
                  />
                  <button
                    className="plus-btn fa fa-plus"
                    type="button"
                    name="button"
                    onClick={() => plusCartItem(cartItem.id)}
                  ></button>
                </div>

                <div className="total-price">
                  <span>SubTotal </span>
                  {formatMoney(cartItem.quantity * cartItem.price)}
                </div>
              </div>
            ))}

            <div className="summary">
              <span className="summary-total">
                {" "}
                Total {formatMoney(getTotal)}
              </span>
              <Link to="/checkout">
                <button className="btn-checkout" type="button">
                  Check Out
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Cart;
