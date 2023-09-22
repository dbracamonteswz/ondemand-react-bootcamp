export const calculateCart = (products) => {
  const total = products.reduce(
    (accumulator, cartItem) => accumulator + cartItem.quantity * cartItem.price,
    0
  );

  const count = products.reduce(
    (accumulator, cartItem) => accumulator + cartItem.quantity,
    0
  );

  return {
    total: total,
    count: count,
  };
};
