import React from 'react';
import { StoryFn as Story, Meta } from '@storybook/react'; // Corrected import for Story
import { InventoryItem, InventoryItemProps } from '../../components/atoms/InventoryItem'; // Corrected import to named export and added InventoryItemProps
import { BrowserRouter as Router } from 'react-router-dom';

export default {
  title: 'Atoms/InventoryItem',
  component: InventoryItem,
} as Meta;

const Template: Story<InventoryItemProps> = (args) => (
  <Router>
    <InventoryItem {...args} />
  </Router>
);

export const Default = Template.bind({});
Default.args = {
  inventoryItem : 
    {
      id: '11',
      dgId: 11,
      itemName: 'Telefon komórkowy SAMSUNG',
      owner: 'REA',
      status: 50,
      inventoryNumber: 'REA/9/2021',
      quantity: 3,
      unitMeasure: 'szt.',
    },
    scannedItems: [
      {
        dgId: 11,
        itemNumber: 1,
      },
      {
        dgId: 11,
        itemNumber: 3,
      },
      
    ],
  
};
