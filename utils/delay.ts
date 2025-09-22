export const delayHelper = (ms: number) =>
  new Promise((res) => setTimeout(res, ms));
export const jitterHelper = () => 200 + Math.random() * 600; // 200–800ms
export const maybeFailHelper = () => Math.random() < 0.15; // 15% chance to fail
