import "./App.scss";
import "font-awesome/css/font-awesome.min.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductListPage from "./components/ProductListPage/ProductListPage";
import ProductDetail from "./components/ProductDetails/ProductDetails";
import SearchResult from "./components/SearchResults/SearchResult";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import { ShoppingCartContext } from "./utils/context/ShoppingCartContext";
import { React, useReducer } from "react";
import shoppinCartReducer, {
  initialStateShoppingCart,
} from "./utils/reducers/ShoppingCartReducer";

const App = () => {
  const [shoppingCartState, dispatchShoppingCart] = useReducer(
    shoppinCartReducer,
    initialStateShoppingCart
  );

  return (
    <ShoppingCartContext.Provider value={[shoppingCartState, dispatchShoppingCart]}>
      <Router>
        <div id="app">
          <Header />
          <Routes>
            <Route index element={<Main />}></Route>
            <Route path="/home" element={<Main />}></Route>
            <Route path="/products" element={<ProductListPage />}></Route>
            <Route
              path="/products/:productId"
              element={<ProductDetail />}
            ></Route>
            <Route path="/search" element={<SearchResult />}></Route>
            <Route path="/cart" element={<Cart shoppingCartState={shoppingCartState} dispatchShoppingCart={dispatchShoppingCart}/>}></Route>
            <Route path="/checkout" element={<Checkout shoppingCartState={shoppingCartState} />}></Route>
            <Route path="*" element={<Main />}></Route>
          </Routes>
          <Footer />
        </div>
      </Router>
    </ShoppingCartContext.Provider>
  );
};

export default App;
