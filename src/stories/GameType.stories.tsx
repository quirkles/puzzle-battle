import type { Meta, StoryObj } from '@storybook/react';
import '../app/globals.css';
import { GameType } from '../app/home/GametypeSelect';

const meta = {
  title: 'Example/GameType',
  component: GameType,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof GameType>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    type: 'gme-type',
    title: 'Game Title',
    description: 'This is the kind of game'
  }
};
