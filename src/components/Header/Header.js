import logoEcommerce from "../../logo-ecommerce.png";
const Header = ({onViewChange}) => {
  return (
    <header>
      <nav>
        <img src={logoEcommerce} className="app-logo" alt="app-logo"  onClick={() => onViewChange(true,false)}/>
        <div className="search-container">
          <form action="/action_page.php">
            <input type="text" placeholder="Search.." name="search" />
            <button type="submit" id="shopping-cart-btn">
              <i className="fa fa-shopping-cart"></i>
            </button>
            <button type="submit">
              <i className="fa fa-search" id="search-btn"></i>
            </button>         
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Header;
