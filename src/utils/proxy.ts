export const getProxyUrl = (originalUrl: string): string => {
  const base = "https://proxy.optomall.uz/proxy/?url="
  return `${base}${encodeURIComponent(originalUrl)}`
}
