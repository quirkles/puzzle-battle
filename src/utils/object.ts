import { getRandomIntInRange } from './number';

export function randomProperty<T extends Record<string | number | symbol, unknown>>(
  obj: T,
  seed?: string
): T[keyof T] {
  return obj[randomKey(obj, seed)];
}

export function randomKey<T extends Record<string | number | symbol, unknown>>(
  obj: T,
  seed?: string
): keyof T {
  const keys: (keyof T)[] = Object.keys(obj);
  return keys[getRandomIntInRange(0, keys.length, seed)];
}
