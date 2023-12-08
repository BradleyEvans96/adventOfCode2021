export const getLowestCommonMultiple = (array: number[]): number => {
  const gcd = (a, b) => (!b ? a : gcd(b, a % b));
  const lcm = (a, b) => (a * b) / gcd(a, b);
  return array.reduce(lcm, 1);
};
