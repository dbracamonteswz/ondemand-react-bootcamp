// import logo from "./logo.svg";
import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import { useState } from "react";

const App = () => {
  const [showHomePage, setShowHomePage] = useState(true);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const onViewChange = (showHomePage,showAllProducts) => {
    setShowAllProducts(showAllProducts);
    setShowHomePage(showHomePage);
  };

  return (
    <div id="app">
      <Header onViewChange={onViewChange} />
      <Main
        showHomePage={showHomePage}
        showAllProducts={showAllProducts}
        onViewChange={onViewChange}
      />
      <Footer />
    </div>
  );
};

export default App;
