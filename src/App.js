import "./App.scss";
import "font-awesome/css/font-awesome.min.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductListPage from "./components/ProductListPage/ProductListPage";
import ShareDataContext from "./context/shareDataContext";
import { useCategories } from "./utils/hooks/useCategories";
import ProductDetail from "./components/ProductDetails/ProductDetails";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SearchResult from "./components/SearchResults/SearchResult";

const App = () => {
  const categories = useCategories();

  return (
    <ShareDataContext.Provider value={{ productCategories: categories }}>
      <Router>
        <div id="app">
          <Header />
          <Routes>
            <Route index element={<Main />}></Route>
            <Route path="/home" element={<Main />}></Route>
            <Route path="/products" element={<ProductListPage />}></Route>
            <Route path="/products/:productId" element={<ProductDetail />}></Route>
            <Route path="/search" element={<SearchResult />}></Route>
            <Route path="*" element={<Main />}></Route>
          </Routes>
          <Footer />
        </div>
      </Router>
    </ShareDataContext.Provider>
  );
};

export default App;
