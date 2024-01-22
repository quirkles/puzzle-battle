import type { Meta, StoryObj } from '@storybook/react';
import '../app/globals.css';
import { GameTypeSelect } from '../app/home/GametypeSelect';
import { GameTypeEnum } from '../__generated__/graphql';

const gameTypes = [
  {
    type: GameTypeEnum.Wins_3,
    title: 'First to 3 wins',
    description: 'First to 3 wins'
  },
  {
    type: GameTypeEnum.Wins_4,
    title: 'First to 4 wins',
    description: 'First to 4 wins'
  },
  {
    type: GameTypeEnum.Wins_5,
    title: 'First to 5 wins',
    description: 'First to 5 wins'
  },
  {
    type: GameTypeEnum.Time_1Min,
    title: 'Play for one minute, most solves wins.',
    description: 'Complete as many as you can in 1 minute'
  },
  {
    type: GameTypeEnum.Time_2Mins,
    title: 'Play for two minutes, most solves wins.',
    description: 'Complete as many as you can in 2 minutes'
  },
  {
    type: GameTypeEnum.Time_3Mins,
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
