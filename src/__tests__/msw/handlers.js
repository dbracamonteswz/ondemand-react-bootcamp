// handlers.js

import { rest } from "msw";
import featuredBanners from "../../mocks/en-us/featured-banners.json";
import featuredProducts from "../../mocks/en-us/featured-products.json";
import productCategories from "../../mocks/en-us/product-categories.json";
import products  from "../../mocks/en-us/products.json";

import latestApi from "../../mocks/en-us/latest-api.json";

const latestApiUrl = `https://wizeline-academy.cdn.prismic.io/api/v2`;
const baseUrl =
  "https://wizeline-academy.cdn.prismic.io/api/v2/documents/search";

const latestApiHandler = rest.get(latestApiUrl, async (req, res, ctx) => {
  return res(ctx.json(latestApi));
});

const basehandler = rest.get(baseUrl, async (req, res, ctx) => {
  const pageSize = req.url.searchParams.get("pageSize");
  let response = null;

  switch (pageSize) {
    case "5":
      response = productCategories;
      break;

    case "6":
      response = featuredBanners;
      break;

    case "12":
      response = products;
      break;

    case "16":
        response = featuredProducts;
        break;
  }

  return res(ctx.json(response));
});

export const handlers = [latestApiHandler, basehandler];
