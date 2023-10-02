// handlers.js
import { rest } from 'msw';
import { mswServer } from "./msw-server";
import searchProductsEmpty  from "../../mocks/en-us/search-product-empty.json";
const baseUrl =
  "https://wizeline-academy.cdn.prismic.io/api/v2/documents/search";


export const setupFaultyHomeHandlers = () => {
  mswServer.use(rest.get(baseUrl, async (req, res, ctx) => {
  const pageSize = req.url.searchParams.get("pageSize");
  let response = null;

  switch (pageSize) {
    case "20":
      response = searchProductsEmpty;
    break;
  }

  return res(ctx.json(response));
}))

};