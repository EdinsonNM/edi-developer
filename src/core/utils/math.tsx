export function roundTo(n: number, decimals: number) {
  const factor = Math.pow(10, decimals);
  return Math.round(n * factor) / factor;
}
