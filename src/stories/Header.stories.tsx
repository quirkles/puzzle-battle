import type { Meta, StoryObj } from '@storybook/react';
import {Button, Header} from "../components";
import '../app/globals.css'
import {Center, Left, Right} from "../components/Header";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/Header',
  component: Header,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Simple: Story = {
  args: {
    children: <>Hello user <Button text='i am a button' color="red" onClick={() => null}></Button></>
  },
};

export const WithLeft: Story = {
  args: {
    children: <>
      <Left>
        Hello user <Button text='i am a button' color="red" onClick={() => null}></Button>
      </Left>
    </>
  },
};

export const WithRight: Story = {
  args: {
    children: <>
      <Right>
        Hello user <Button text='i am a button' color="red" onClick={() => null}></Button>
      </Right>
    </>
  },
};
export const WithCenter: Story = {
  args: {
    children: <>
      <Center>
        Hello user <Button text='i am a button' color="red" onClick={() => null}></Button>
      </Center>
    </>
  },
};
