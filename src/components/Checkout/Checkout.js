import React from "react";
import { formatMoney } from "../../utils/formatUtils";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Checkout = ({shoppingCartState}) => {
  const isShoppingCartEmpty = shoppingCartState.count === 0;

  return (
    <main>
      <section className="checkout">
        {isShoppingCartEmpty ? (
          <h2>ShoppingCart is empty</h2>
        ) : (
          <form>
            <div className="row">
              <div className="col-25">
                <label htmlFor="name">Name</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name.."
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="email">Email</label>
              </div>
              <div className="col-75">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email.."
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="zipcode">Zip Code</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  placeholder="Your zip code.."
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="notes">Notes</label>
              </div>
              <div className="col-75">
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="Write any note.."
                  style={{ height: "200px" }}
                ></textarea>
              </div>
            </div>
            <div className="row">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>SubTotal</th>
                  </tr>
                </thead>
                <tbody>
                  {shoppingCartState.products.map((cartItem, index) => (
                    <tr key={index}>
                      <td>{cartItem.name}</td>
                      <td>{cartItem.quantity}</td>
                      <td>{formatMoney(cartItem.price)}</td>
                      <td className="sub-total"> {formatMoney(cartItem.price * cartItem.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br />
            <div className="row">
              <span className="summary-total">
                Total {formatMoney(shoppingCartState.total)}
              </span>
            </div>
            <div className="row">
              <button className="btn-submit-order">Submit Order</button>
              <Link to="/cart">
                <button className="btn-back-cart">Go back to Cart </button>
              </Link>
            </div>
          </form>
        )}
      </section>
    </main>
  );
};

Checkout.propTypes = {
  shoppingCartState: PropTypes.object.isRequired
};


export default Checkout;
