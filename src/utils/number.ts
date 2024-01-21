export function getRandomIntInRange(min: number, max: number, seed?: string): number {
  if (seed) {
    const seedNumber = seed.split('').reduce((total, char) => {
      return total + char.charCodeAt(0);
    }, 0);
    return (seedNumber % (max - min)) + min;
  } else {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
}
