import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { mswServer } from "./msw/msw-server";
import App from "../App";

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe("Testing Main Component - Home Page", () => {
  it("2.1. Featured Banners Slider is fetching and rendering data from the API ", async () => {
    render(<App />);

    await waitFor(() => {
      //Testing slider section
      expect(screen.getByText("Slider Section")).toBeInTheDocument();
      const image = screen.getByAltText("A GREAT STYLE - LIVING ROOM");
      expect(image.src).toContain(
        "https://images.prismic.io/wizeline-academy/305e2781-5f25-4c00-bef7-1041b49def37_banner-1-2.jpeg?auto=compress,format&rect=103,0,1226,600&w=1440&h=705"
      );
    });
  });

  it("2.2. Categories Carousel/Grid is fetching and rendering data from the API", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Bed & Bath")).toBeInTheDocument();
      const image = screen.getByAltText("Bath");
      expect(image.src).toContain(
        "https://images.prismic.io/wizeline-academy/5df875b5-3e43-4cf0-97b9-06ed73ed6d9b_sanibell-bv-530lZQXMKGw-unsplash-web+%281%29.jpg?auto=compress,format&rect=0,24,1920,1231&w=621&h=398"
      );
    });
  });

  it("2.3. Featured Products Grid is fetching and rendering data from the API", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Featured Products")).toBeInTheDocument();
      const image = screen.getByAltText("Tallulah Sofa Gray");
      expect(image.src).toContain(
        "https://images.prismic.io/wizeline-academy/fa394f7d-4d89-4c90-86b3-832de74928fa_1.webp?auto=compress,format"
      );
    });
  });
});
