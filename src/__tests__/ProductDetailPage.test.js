import {
  render,
  screen,
  cleanup,
  within,
} from "@testing-library/react";
import { mswServer } from "./msw/msw-server";
import ProductDetail from "../components/ProductDetails/ProductDetails";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ShoppingCartContext } from "../utils/context/ShoppingCartContext";
import { initialStateShoppingCart } from "../utils/reducers/ShoppingCartReducer";
import shoppingCartMock  from "../mocks/en-us/shopping-cart-empty-stock.json";

beforeAll(() => mswServer.listen());
afterEach(() => {
  cleanup();
  mswServer.resetHandlers();
});
afterAll(() => mswServer.close());

describe("Testing Product Detail Page", () => {
  it("Should render and fetch Product Detail from the API", async () => {
    const dispatchCart = jest.fn();

    const productId = "YZZ_XhIAAC0AvmiA";

    render(
      <ShoppingCartContext.Provider
        value={[initialStateShoppingCart, dispatchCart]}
      >
        <MemoryRouter initialEntries={[`/products/${productId}`]}>
          <Routes>
            <Route
              path="/products/:productId"
              element={<ProductDetail />}
            ></Route>
          </Routes>
        </MemoryRouter>
      </ShoppingCartContext.Provider>
    );

    const productDetailSection = within(
      await screen.findByTestId('product-detail-section')
    );

    expect(productDetailSection.getByText('Fair Isle Snowflake Lumbar Cushion Cover')).toBeInTheDocument();
    expect(productDetailSection.getByText('Price $40.00')).toBeInTheDocument();
    expect(productDetailSection.getByText('Sku 1107982309')).toBeInTheDocument();
    expect(productDetailSection.getByText('Living Room')).toBeInTheDocument();
    expect(productDetailSection.getByText('Category decorate')).toBeInTheDocument();
    expect(productDetailSection.getByText('40.26 cm high x 66 cm wide. Zipper: Approximately 61 cm long')).toBeInTheDocument();
  });

  it("Should render shopping controls quanty selector, add to cart button", async () => {
    const dispatchCart = jest.fn();
    const productId = "YZZ_XhIAAC0AvmiA";
    render(
      <ShoppingCartContext.Provider
        value={[initialStateShoppingCart, dispatchCart]}
      >
        <MemoryRouter initialEntries={[`/products/${productId}`]}>
          <Routes>
            <Route
              path="/products/:productId"
              element={<ProductDetail />}
            ></Route>
          </Routes>
        </MemoryRouter>
      </ShoppingCartContext.Provider>
    );

    const productDetailSection = within(
      await screen.findByTestId('product-detail-section')
    );

    expect( productDetailSection.getByText('Add to Cart', { selector: 'button' })).toBeInTheDocument();
    expect(productDetailSection.getByText('Quantity')).toBeInTheDocument();
  });

  it("Should be disabled Add to Cart Button when stock is zero", async () => {
    const dispatchCart = jest.fn();
    const productId = "YZZ_XhIAAC0AvmiA";


    render(
      <ShoppingCartContext.Provider
        value={[shoppingCartMock, dispatchCart]}
      >
        <MemoryRouter initialEntries={[`/products/${productId}`]}>
          <Routes>
            <Route
              path="/products/:productId"
              element={<ProductDetail />}
            ></Route>
          </Routes>
        </MemoryRouter>
      </ShoppingCartContext.Provider>
    );

    const productDetailSection = within(
      await screen.findByTestId('product-detail-section')
    );

    expect( productDetailSection.getByText('Add to Cart', { selector: 'button' })).toBeDisabled();
  });
});
