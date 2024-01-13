export function randomElement<T>(arr: T[]): T {
  return arr[(arr.length * Math.random()) << 0];
}
