import {
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { mswServer } from "./msw/msw-server";
import {
  BrowserRouter
} from "react-router-dom";
import { initialStateShoppingCart } from "../utils/reducers/ShoppingCartReducer";
import Cart from "../components/Cart/Cart";
import shoppingCartMock  from "../mocks/en-us/shopping-cart.json";
import { calculateCart } from '../utils/shoppingCartUtils';
import { formatMoney } from "../utils/formatUtils";

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe("Testing Shopping Cart Component ", () => {
  it("Should render proper message when cart is empty", async () => {
    const dispatchCart = jest.fn();

    const { container } = render(
          <Cart dispatchShoppingCart={dispatchCart} shoppingCartState={initialStateShoppingCart} />
     );

      const shoppingCartSection =  within(await screen.findByTestId('shopping-cart-section'));
      
      expect(shoppingCartSection.getByText('ShoppingCart is empty')).toBeInTheDocument();
    });


    it("Should render total of items in cart and name, price, sub total, image", async () => {
      const dispatchCart = jest.fn();
      const { container } = render(
        <BrowserRouter>
            <Cart dispatchShoppingCart={dispatchCart} shoppingCartState={shoppingCartMock} />
            </BrowserRouter>
       );

      const shoppingCartSection =  within(await screen.findByTestId('shopping-cart-section'));
      const productsArray = container.getElementsByClassName('item'); 
      const image = shoppingCartSection.getByAltText('Cojín Faye Azul');

      
      expect(shoppingCartSection.getByText('Cojín Faye Azul')).toBeInTheDocument();
      expect(shoppingCartSection.getByText('Unit Price $41.00')).toBeInTheDocument();
      expect(shoppingCartSection.getByDisplayValue('10')).toBeInTheDocument();
      expect(shoppingCartSection.getByText('$410.00')).toBeInTheDocument();
      expect(shoppingCartSection.getByText('Total $784.00')).toBeInTheDocument();
      expect(image.src).toBe('https://images.prismic.io/wizeline-academy/39db837a-8a39-48fc-9937-5d496027bc79_1.jpeg?auto=compress,format');
      expect(productsArray.length).toBe(3);
    });

    it("Should validate if total if equals to all the subtotals", async () => {
      const dispatchCart = jest.fn();
     render(
        <BrowserRouter>
            <Cart dispatchShoppingCart={dispatchCart} shoppingCartState={shoppingCartMock} />
            </BrowserRouter>
       );

      const shoppingCartSection =  within(await screen.findByTestId('shopping-cart-section'));
      const {total} = calculateCart(shoppingCartMock.products);
      
      expect(shoppingCartSection.getByText('Total ' + formatMoney(total))).toBeInTheDocument();

    });

    it("Should validate if total if equals to all the subtotals", async () => {
      const dispatchCart = jest.fn();
      render(
        <BrowserRouter>
            <Cart dispatchShoppingCart={dispatchCart} shoppingCartState={shoppingCartMock} />
            </BrowserRouter>
       );

      const shoppingCartSection =  within(await screen.findByTestId('shopping-cart-section'));
      const {total} = calculateCart(shoppingCartMock.products);
      
      expect(shoppingCartSection.getByText('Total ' + formatMoney(total))).toBeInTheDocument();
    });

    it("Should be able to add an item to the cart", async () => {
      const dispatchCart = jest.fn();
      const { container } = render(
        <BrowserRouter>
            <Cart dispatchShoppingCart={dispatchCart} shoppingCartState={shoppingCartMock} />
            </BrowserRouter>
       );

       const shoppingCartSection =  within(await screen.findByTestId('shopping-cart-section'));
       const productsArray = container.getElementsByClassName('item');

      const btnArray = within(productsArray[2]).getAllByRole('button');
      expect(within(productsArray[2]).getByDisplayValue('2')).toBeInTheDocument();
      fireEvent.click(btnArray[2]);


     // expect(await within(productsArray[2]).findByDisplayValue('3')).toBeInTheDocument();      
    });

});
