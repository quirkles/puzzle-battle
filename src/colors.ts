export const Colors = {
  BLUE: 'blue',
  BLACK: 'black',
  YELLOW: 'yellow',
  RED: 'red',
  PURPLE: 'purple',
  PINK: 'pink',
  ORANGE: 'orange',
  GREEN: 'green'
} as const;
export type Color = (typeof Colors)[keyof typeof Colors];
