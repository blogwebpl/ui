import React from 'react';
import { StoryFn as Story, Meta } from '@storybook/react'; // Corrected import for Story
import { InventoryDetails, InventoryDetailsProps } from '../../components/atoms/InventoryDetails'; // Corrected import to named export and added InventoryDetailsProps

export default {
  title: 'Atoms/InventoryDetails',
  component: InventoryDetails,
} as Meta;

const Template: Story<InventoryDetailsProps> = (args) => <InventoryDetails {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Add default props here
};

export const WithData = Template.bind({});
WithData.args = {
  // Add specific props to show different states or variations
};
