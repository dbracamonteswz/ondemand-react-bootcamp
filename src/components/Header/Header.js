import React from "react";
import logoEcommerce from "../../logo-ecommerce.png";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ShoppingCartContext } from "../../utils/context/ShoppingCartContext";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const [shoppingCart] = useContext(ShoppingCartContext);

  return (
    <header>
      <nav>
        <Link to="/home">
          <img src={logoEcommerce} className="app-logo" alt="app-logo" />
        </Link>
        <div className="search-container">
          <form>
            <input
              type="text"
              placeholder="Search.."
              name="search"
              value={searchTerm}
              onChange={handleChange}
            />
            <Link to="/cart">
              <button id="shopping-cart-btn">
                <i className="fa fa-shopping-cart"></i>
                <span id="lblCartCount">{shoppingCart.count}</span>
              </button>
            </Link>
            <Link
              to={{
                pathname: "/search",
                search: `?searchTerm=${searchTerm}`,
              }}
            >
              <button type="submit">
                <i className="fa fa-search" id="search-btn"></i>
              </button>
            </Link>
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Header;
