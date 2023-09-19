import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
  cleanup,
  within
} from "@testing-library/react";
import { mswServer } from "./msw/msw-server";
import App from "../App";
import ProductListPage from "../components/ProductListPage/ProductListPage";
import { BrowserRouter } from "react-router-dom";
import shoppinCartReducer from "../utils/reducers/ShoppingCartReducer";
import { ShoppingCartContext } from "../utils/context/ShoppingCartContext";

beforeAll(() => mswServer.listen());
afterEach(() => {
  cleanup();
  mswServer.resetHandlers();
});
afterAll(() => mswServer.close());

describe("Testing Product List Page", () => {
  it("3.1. Product Category Sidebar is fetching and rendering data from the API", async () => {
    act(() => {
      render(<App />);
    });

    await waitFor(() => {
      const btnAllProducts = screen.getByText("View all products");
      fireEvent.click(btnAllProducts);
    });

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
    act(() => {
      render(<App />);
    });

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
    const shoppinCart = [];
    
    const {container}  = render(
      <ShoppingCartContext.Provider value={[shoppinCart, shoppinCart.push]}>
      <BrowserRouter>
        <ProductListPage />
      </BrowserRouter>
      </ShoppingCartContext.Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByText("This is the Product List Page")
      ).toBeInTheDocument();
    });

    const btnPagination = container.getElementsByClassName('btn-pagination');
    
    // there are 3 pages and two for prev and next page
    expect(btnPagination.length).toBe(3);
    
  });
});
