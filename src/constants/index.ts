export const shareUrl = () =>
  typeof window !== "undefined" ? window.location.href : "";

export const formatPrice = (price?: string | number) => {
  if (price) {
    const formatedPrice = price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formatedPrice;
  }
  return 0;
};
