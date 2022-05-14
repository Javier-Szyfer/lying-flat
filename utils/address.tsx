export const formatAddress = (address) => {
  const chars = address.split("");

  return `(${chars.slice(0, 4).join("")}…${chars.slice(-4).join("")})`;
};
export const formatHash = (hash) => {
  const chars = hash.split("");

  return `(${chars.slice(0, 12).join("")}…${chars.slice(-12).join("")})`;
};
