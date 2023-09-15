import React, { useContext, useState } from "react";
import { ShoppingCartContext } from "../../utils/context/ShoppingCartContext";
import { ShoppingStateEnums } from "../../utils/reducers/ShoppingCartReducer";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";

const ShoppingControls = ({ cartItem }) => {
  const [quantity, setQuantity] = useState(0);
  const [shoppingCartState, dispatchShoppingCart] =
    useContext(ShoppingCartContext);
  const isAddBtnDisabled = quantity == 0;
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const addBtnCartTitle = isAddBtnDisabled
    ? "Please select a quantity"
    : "Add to Cart";
  ReactModal.setAppElement("#app");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatchShoppingCart({
      type: ShoppingStateEnums.ADD_ITEM,
      payload: { ...cartItem, quantity: parseInt(quantity)},
    });

    setModalIsOpen(!modalIsOpen);
    setQuantity(0);
  };

  return (
    <div className="shopping-controls">
      <form onSubmit={handleSubmit}>
        <div className="counter">
          <select
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          >
            <option value={"0"} disabled>
              Quantity
            </option>
            {[...Array(cartItem.stock + 1)].map(
              (x, i) =>
                i > 0 && (
                  <option value={i} key={i}>
                    {i}
                    {x}
                  </option>
                )
            )}
          </select>
        </div>
        <button
          className={isAddBtnDisabled ? "disabled" : ""}
          disabled={isAddBtnDisabled}
          title={addBtnCartTitle}
        >
          Add to Cart
        </button>
      </form>
      <ReactModal isOpen={modalIsOpen}>
        <h2>Your shoping cart has been update.</h2>
        Would you like to continue shopping?
        <button
          className="btn-continue-shopping"
          onClick={() => setModalIsOpen(!modalIsOpen)}
        >
          Continue
        </button>
        <Link to="/cart">
          <button
            className="btn-go-shopping-cart"
            onClick={() => setModalIsOpen(!modalIsOpen)}
          >
            Go to Shopping Cart
          </button>
        </Link>
      </ReactModal>
    </div>
  );
};

export default ShoppingControls;
