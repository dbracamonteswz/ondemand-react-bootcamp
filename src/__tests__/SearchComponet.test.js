import {
  render,
  screen,
  within,
} from "@testing-library/react";
import { mswServer } from "./msw/msw-server";
import SearchResult from "../components/SearchResults/SearchResult";
import {
  BrowserRouter
} from "react-router-dom";
import { ShoppingCartContext } from "../utils/context/ShoppingCartContext";
import { initialStateShoppingCart } from "../utils/reducers/ShoppingCartReducer";
import {setupFaultyHomeHandlers} from "./msw/emptyHandlers";

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe("Testing Search Component ", () => {
  it("Should render and fetch Featured Banners from the API ", async () => {
    const match = {params : { searchTerm: 'Fair Isle' } };
    const dispatchCart = jest.fn();

    const { container } = render(
     
        <ShoppingCartContext.Provider value={[initialStateShoppingCart, dispatchCart]}>
           <BrowserRouter>
          <SearchResult match={match} />
          </BrowserRouter>
        </ShoppingCartContext.Provider>
     );

      const searchSection =  within(await screen.findByTestId('search-section'));
      const productsArray = container.getElementsByClassName('grid-section');

      expect(searchSection.getByText('Set of 4 Tahoe Fair Isle Mugs')).toBeInTheDocument();
      expect(searchSection.getByText('Fair Isle Snowflake Lumbar Cushion Cover')).toBeInTheDocument();
      expect(productsArray.length).toBe(2);
    });

    it("Should a proper message when there are no results for the search", async () => {
      setupFaultyHomeHandlers();
      const match = {params : { searchTerm: 'Test' } };
      const dispatchCart = jest.fn();

      window.history.replaceState({}, '', '/?isEmpty=true');
        render(
          <ShoppingCartContext.Provider value={[initialStateShoppingCart, dispatchCart]}>
             <BrowserRouter>
            <SearchResult match={match} />
            </BrowserRouter>
          </ShoppingCartContext.Provider>
       );
  
        const searchSection =  within(await screen.findByTestId('search-section'));
  
        expect(searchSection.getByText('No products found for the search')).toBeInTheDocument();
      });
 
});
