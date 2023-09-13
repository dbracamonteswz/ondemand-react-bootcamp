export const API_BASE_URL = "https://wizeline-academy.cdn.prismic.io/api/v2";

export const CATEGORIES_QUERY = `&q=[[at(document.type, "category")]]&lang=en-us&pageSize=5`;

export const FEATURED_PRODUCTS_QUERY = `&q=[[at(document.type, "product")]]]]&q=[[at(document.tags, ["Featured"])]]&lang=en-us&pageSize=16`;

export const FEATURED_BANNERS_QUERY = `&q=[[at(document.type, "banner")]]&lang=en-us&pageSize=5`;

export const PRODUCTS_QUERY = (pageSize, page) =>
  `&q=[[at(document.type, "product")]]&lang=en-us&pageSize${pageSize}&page=${page}`;

export const PRODUCT_DETAIL_QUERY = (productId) =>
  `&q=[[at(document.id,"${productId}")]]`;

export const PRODUCT_SEARCH_QUERY = (searchText, pageSize, page) =>
  `&q=[[at(document.type,"product")]]&q=[[fulltext(document,"${searchText}")]]&lang=en-us&pageSize=${pageSize}&page=${page}`;
