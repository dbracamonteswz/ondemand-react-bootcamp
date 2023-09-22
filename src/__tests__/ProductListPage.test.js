import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import { mswServer } from "./msw/msw-server";
import App from "../App";
import ProductListPage from "../components/ProductListPage/ProductListPage";
import { BrowserRouter } from "react-router-dom";
import { ShoppingCartContext } from "../utils/context/ShoppingCartContext";
import { initialStateShoppingCart } from "../utils/reducers/ShoppingCartReducer";

beforeAll(() => mswServer.listen());
afterEach(() => {
  cleanup();
  mswServer.resetHandlers();
});
afterAll(() => mswServer.close());

describe("Testing Product List Page", () => {
  it("3.1. Product Category Sidebar is fetching and rendering data from the API", async () => {
    const dispatchCart = jest.fn();

    render(
      <ShoppingCartContext.Provider value={[initialStateShoppingCart, dispatchCart]}>
        <BrowserRouter>
          <ProductListPage />
        </BrowserRouter>
      </ShoppingCartContext.Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByText("This is the Product List Page")
      ).toBeInTheDocument();

      //validate that category
      expect(screen.getByText("Bed & Bath")).toBeInTheDocument();
      expect(screen.getByText("Lighting")).toBeInTheDocument();
      expect(screen.getByText("Kitchen")).toBeInTheDocument();
      expect(screen.getByText("Furniture")).toBeInTheDocument();
    });
  });

  it("3.2. Product Category Sidebar is fetching and rendering data from the API", async () => {
    const dispatchCart = jest.fn();

    render(
      <ShoppingCartContext.Provider value={[initialStateShoppingCart, dispatchCart]}>
        <BrowserRouter>
          <ProductListPage />
        </BrowserRouter>
      </ShoppingCartContext.Provider>
    );

    await waitFor(() => {
      const checkboxCategory = screen.getAllByRole("checkbox");

      //clicking lightning category , there isnt any result for this category
      fireEvent.click(checkboxCategory[1]);

      expect(
        screen.getByText("No products found with the categories selected")
      ).toBeInTheDocument();
    });
  });

  it("3.3. Pagination Controls are generated correctly based on the number of results fetched from the API and the maximum number of products per page", async () => {
    const dispatchCart = jest.fn();

    const { container } = render(
      <ShoppingCartContext.Provider value={[initialStateShoppingCart, dispatchCart]}>
        <BrowserRouter>
          <ProductListPage />
        </BrowserRouter>
      </ShoppingCartContext.Provider>
    );

    const btnPagination = container.getElementsByClassName("btn-pagination");

    await waitFor(() => {
      // there are 3 buttons for pages and two for prev and next page
      expect(btnPagination.length).toBe(5);
      //first btnPage is active, prevbtn is disabled
      expect(btnPagination[1]).toHaveClass("active");
      expect(btnPagination[0]).toBeDisabled();
    });
  });

  it("3.5. Next button  and prev is working as expected", async () => {
    const dispatchCart = jest.fn();

    const { container } = render(
      <ShoppingCartContext.Provider value={[initialStateShoppingCart, dispatchCart]}>
        <BrowserRouter>
          <ProductListPage />
        </BrowserRouter>
      </ShoppingCartContext.Provider>
    );

    const btnPagination = container.getElementsByClassName("btn-pagination");

    await waitFor(() => {
      //clicking last page
      fireEvent.click(btnPagination[3]);
      //last page is active
      expect(btnPagination[3]).toHaveClass("active");
      // next page is disabled
      expect(btnPagination[4]).toBeDisabled();
    });

    await waitFor(() => {
     // clicking prevPage
      fireEvent.click(btnPagination[0]);
      expect(btnPagination[2]).toHaveClass("active");
    });

    await waitFor(() => {
      // clicking nextPage
      fireEvent.click(btnPagination[4]);
      expect(btnPagination[3]).toHaveClass("active");
      expect(btnPagination[4]).toBeDisabled(); 
    });
  });
});
