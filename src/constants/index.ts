export const shareUrl = () =>
  typeof window !== "undefined" ? window.location.href : "";
