import React, {useState } from "react";
import { ShoppingStateActions } from "../../utils/reducers/ShoppingCartReducer";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ShoppingControls = ({
  cartItem,
  shoppingCartState,
  dispatchShoppingCart,
}) => {
  const [quantity, setQuantity] = useState(0);
  const isAddBtnDisabled = quantity == 0;
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const addBtnCartTitle = isAddBtnDisabled
    ? "Please select a quantity"
    : "Add to Cart";
  ReactModal.setAppElement("main");

  // Get Product from Cart
  const productInCart = shoppingCartState.products.find(
    (product) => product.id === cartItem.id
  );

  const quantityToDisplay = () =>
    cartItem.stock - (productInCart?.quantity ?? 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatchShoppingCart({
      type: ShoppingStateActions.ADD_ITEM,
      payload: { ...cartItem, quantity: parseInt(quantity) },
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
            {[...Array(quantityToDisplay() + 1)].map(
              (element, index) =>
                index > 0 && (
                  <option value={index} key={index}>
                    {index}
                    {element}
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

ShoppingControls.propTypes = {
  cartItem: PropTypes.object.isRequired,
  shoppingCartState: PropTypes.object.isRequired,
  dispatchShoppingCart:  PropTypes.func.isRequired
};

export default ShoppingControls;
