import {
  render,
  screen,
  fireEvent,
  cleanup,
  within,
} from "@testing-library/react";
import { mswServer } from "./msw/msw-server";
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
  it("Should render and fetch Product Category Sidebar from the API", async () => {
    const dispatchCart = jest.fn();

    render(
      <ShoppingCartContext.Provider
        value={[initialStateShoppingCart, dispatchCart]}
      >
        <BrowserRouter>
          <ProductListPage />
        </BrowserRouter>
      </ShoppingCartContext.Provider>
    );

    const productListSection = within(
      await screen.findByTestId("product-list-section")
    );
    expect(
      productListSection.getByText("This is the Product List Page")
    ).toBeInTheDocument();

    expect(productListSection.getByText("Bed & Bath")).toBeInTheDocument();
    expect(productListSection.getByText("Lighting")).toBeInTheDocument();
    expect(productListSection.getByText("Kitchen")).toBeInTheDocument();
    expect(productListSection.getByText("Furniture")).toBeInTheDocument();
  });

  it("Should filter and fetch Products Grid by category", async () => {
    const dispatchCart = jest.fn();

    render(
      <ShoppingCartContext.Provider
        value={[initialStateShoppingCart, dispatchCart]}
      >
        <BrowserRouter>
          <ProductListPage />
        </BrowserRouter>
      </ShoppingCartContext.Provider>
    );

    const productListSection = within(
      await screen.findByTestId("product-list-section")
    );
    const checkboxCategory = productListSection.getAllByRole("checkbox");
    fireEvent.click(checkboxCategory[1]);

    expect(
      productListSection.getByText(
        "No products found with the categories selected"
      )
    ).toBeInTheDocument();
  });

  it("Should Show Pagination Controls based on the pages number return by the api", async () => {
    const dispatchCart = jest.fn();

    render(
      <ShoppingCartContext.Provider
        value={[initialStateShoppingCart, dispatchCart]}
      >
        <BrowserRouter>
          <ProductListPage />
        </BrowserRouter>
      </ShoppingCartContext.Provider>
    );

    const productListSection = within(
      await screen.findByTestId("product-list-section")
    );
    const paginationContainer = within(
      await productListSection.findByTestId("pagination-container")
    );
    const btnPaginationArray = paginationContainer.getAllByRole("button");

    // there are 3 buttons for pages and two for prev and next page
    expect(btnPaginationArray.length).toBe(5);
    //first btnPage is active, prevbtn is disabled
    expect(btnPaginationArray[1]).toHaveClass("active");
    expect(btnPaginationArray[0]).toBeDisabled();
  });

  it("Should Show Prev Button as disabled when user is in the first page", async () => {
    const dispatchCart = jest.fn();

    const { container } = render(
      <ShoppingCartContext.Provider
        value={[initialStateShoppingCart, dispatchCart]}
      >
        <BrowserRouter>
          <ProductListPage />
        </BrowserRouter>
      </ShoppingCartContext.Provider>
    );

    const productListSection = within(
      await screen.findByTestId("product-list-section")
    );
    const paginationContainer = within(
      await productListSection.findByTestId("pagination-container")
    );
    const btnPaginationArray = paginationContainer.getAllByRole("button");

    //first btnPage is active, prevbtn is disabled
    expect(btnPaginationArray[1]).toHaveClass("active");
    expect(btnPaginationArray[0]).toBeDisabled();
  });

  it("Should Work Next Button as expected", async () => {
    const dispatchCart = jest.fn();
    render(
      <ShoppingCartContext.Provider
        value={[initialStateShoppingCart, dispatchCart]}
      >
        <BrowserRouter>
          <ProductListPage />
        </BrowserRouter>
      </ShoppingCartContext.Provider>
    );

    const productListSection = within(
      await screen.findByTestId("product-list-section")
    );
    const paginationContainer = within(
      await productListSection.findByTestId("pagination-container")
    );
    const btnPaginationArray = paginationContainer.getAllByRole("button");

    //Current page 1 after clicking next btn , page2 btn should have class active
    fireEvent.click(btnPaginationArray[4]);
    expect(btnPaginationArray[2]).toHaveClass("active");
  });

  it("Should Work Prev Button as expected", async () => {
    const dispatchCart = jest.fn();
    render(
      <ShoppingCartContext.Provider
        value={[initialStateShoppingCart, dispatchCart]}
      >
        <BrowserRouter>
          <ProductListPage />
        </BrowserRouter>
      </ShoppingCartContext.Provider>
    );

    const productListSection = within(
      await screen.findByTestId("product-list-section")
    );
    const paginationContainer = within(
      await productListSection.findByTestId("pagination-container")
    );
    const btnPaginationArray = paginationContainer.getAllByRole("button");

    // active page is 1 when page is load
    expect(btnPaginationArray[1]).toHaveClass("active");

    // after clickling next, active page is 2
    fireEvent.click(btnPaginationArray[4]);
    expect(btnPaginationArray[2]).toHaveClass("active");

    // clicking prev page , active should be 1 again
    fireEvent.click(btnPaginationArray[0]);
    expect(btnPaginationArray[1]).toHaveClass("active");
  });

  it("Should Show Next button as  disabled when the user is on the last page", async () => {
    const dispatchCart = jest.fn();
    render(
      <ShoppingCartContext.Provider
        value={[initialStateShoppingCart, dispatchCart]}
      >
        <BrowserRouter>
          <ProductListPage />
        </BrowserRouter>
      </ShoppingCartContext.Provider>
    );

    const productListSection = within(
      await screen.findByTestId("product-list-section")
    );
    const paginationContainer = within(
      await productListSection.findByTestId("pagination-container")
    );
    const btnPaginationArray = paginationContainer.getAllByRole("button");

    fireEvent.click(btnPaginationArray[3]);
    //Next btn is disabled
    expect(btnPaginationArray[4]).toBeDisabled();
  });
});
