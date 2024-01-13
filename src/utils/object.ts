export function randomProperty<T extends Record<string | number | symbol, unknown>>(
  obj: T
): T[keyof T] {
  return obj[randomKey(obj)];
}

export function randomKey<T extends Record<string | number | symbol, unknown>>(obj: T): keyof T {
  const keys: (keyof T)[] = Object.keys(obj);
  return keys[(keys.length * Math.random()) << 0];
}
