import type { Meta, StoryObj } from '@storybook/react';
import '../app/globals.css';
import { GameTypeSelect } from '../app/home/GametypeSelect';

const gameTypes = [
  {
    type: 'first-to-3',
    title: 'First to 3 wins',
    description: 'First to 3 wins'
  },
  {
    type: 'first-to-4',
    title: 'First to 4 wins',
    description: 'First to 4 wins'
  },
  {
    type: 'first-to-5',
    title: 'First to 5 wins',
    description: 'First to 5 wins'
  },
  {
    type: '1-min',
    title: 'Play for one minute, most solves wins.',
    description: 'Complete as many as you can in 1 minute'
  },
  {
    type: '2-mins',
    title: 'Play for two minutes, most solves wins.',
    description: 'Complete as many as you can in 2 minutes'
  },
  {
    type: '3-mins',
    title: 'Play for three minutes, most solves wins.',
    description: 'Complete as many as you can in 3 minutes'
  }
];

const meta = {
  title: 'Example/GameTypeSelect',
  component: GameTypeSelect,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof GameTypeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    gameTypes
  }
};
