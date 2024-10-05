export const getProductLimit = (rowsNeeded: number) => {
  const screenWidth = window.innerWidth;
  let productsPerRow;

  if (screenWidth <= 650) {
    productsPerRow = 2;
  } else if (screenWidth > 650 && screenWidth <= 968) {
    productsPerRow = 3;
  } else if (screenWidth > 768 && screenWidth <= 1524) {
    productsPerRow = 4;
  } else {
    productsPerRow = 5;
  }

  return productsPerRow * rowsNeeded;
};
