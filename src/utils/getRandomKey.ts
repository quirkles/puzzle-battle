export function randomProperty<T extends Record<string, unknown>>(obj: T): T[keyof T] {
  const keys: (keyof T)[] = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
}
