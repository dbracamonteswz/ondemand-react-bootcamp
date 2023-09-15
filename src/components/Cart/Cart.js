import React, { useContext, useReducer } from "react";
import { formatMoney } from "../../utils/formatUtils";
import { Link } from "react-router-dom";
import { ShoppingStateActions } from "../../utils/reducers/ShoppingCartReducer";

const Cart = ({shoppingCartState,dispatchShoppingCart}) => {
  const isShoppingCartEmpty = shoppingCartState.count === 0;
console.log(shoppingCartState);

  const deleteCartItem = (cartItem) => {
    dispatchShoppingCart({type: ShoppingStateActions.DELETE_ITEMS,payload: cartItem});
  };

  const minusCartItem = (cartItemId,  quantity) => {
    if(quantity > 1)
      dispatchShoppingCart({type: ShoppingStateActions.MINUS_ITEM,payload:{id: cartItemId}});
  };

  const plusCartItem = (cartItemId, stock, quantity) => {
    if(quantity < stock )
    dispatchShoppingCart({type: ShoppingStateActions.PLUS_ITEM,payload:{id: cartItemId}});
  };

  return (
    <main>
      <div className="shopping-cart">
        {isShoppingCartEmpty ? (
          <h2>ShoppingCart is empty</h2>
        ) : (
          <>
            <div className="title">Shopping Cart</div>
            {shoppingCartState.products.map((cartItem) => (
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
                    onClick={() => minusCartItem(cartItem.id, cartItem.quantity)}
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
                    max={cartItem.stock}
                    onClick={() => plusCartItem(cartItem.id, cartItem.stock , cartItem.quantity)}
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
                Total {formatMoney(shoppingCartState.total)}
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
