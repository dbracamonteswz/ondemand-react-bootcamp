import {
  render,
  screen,
  within
} from "@testing-library/react";
import { mswServer } from "./msw/msw-server";
import App from "../App";

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe("Testing Main Component - Home Page", () => {
  it("Should render and fetch Featured Banners from the API ", async () => {
    render(<App />);

    const sliderContainer = within(await screen.findByTestId('slider-section'));
    const sliderSection = sliderContainer.getByText("Slider Section");
    const image = sliderContainer.getByAltText("A GREAT STYLE - LIVING ROOM");
    expect(sliderSection).toBeInTheDocument(); 
    expect(image.src).toContain(
      "https://images.prismic.io/wizeline-academy/305e2781-5f25-4c00-bef7-1041b49def37_banner-1-2.jpeg?auto=compress,format&rect=103,0,1226,600&w=1440&h=705");
  });

  it("Should render and fetch Categories from the API", async () => {
    render(<App />);
    const carouselSection =  within(await screen.findByTestId('carousel-section'));
    const image =carouselSection.getByAltText("Bath");

    expect( carouselSection.getByText("Bed & Bath")).toBeInTheDocument();
    expect(image.src).toContain(
      "https://images.prismic.io/wizeline-academy/5df875b5-3e43-4cf0-97b9-06ed73ed6d9b_sanibell-bv-530lZQXMKGw-unsplash-web+%281%29.jpg?auto=compress,format&rect=0,24,1920,1231&w=621&h=398"
    );
    
  });

  it("Should render and fetch Featured Products data from the API", async () => {
    render(<App />);

    const featuredProductsSection = within(await screen.findByTestId('featured-products-section'));
    const image = featuredProductsSection.getByAltText("Tallulah Sofa Gray");

    expect(featuredProductsSection.getByText("Featured Products")).toBeInTheDocument();
    expect(image.src).toContain(
      "https://images.prismic.io/wizeline-academy/fa394f7d-4d89-4c90-86b3-832de74928fa_1.webp?auto=compress,format"
    );
  });
});
