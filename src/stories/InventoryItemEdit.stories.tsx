import React from 'react';
import { StoryFn as Story, Meta } from '@storybook/react'; // Corrected import for Story
import {
	InventoryItemEdit,
	InventoryItemEditProps,
} from '../components/InventoryItemEdit'; // Corrected import to named export and added InventoryItemProps
import { BrowserRouter as Router } from 'react-router-dom';

export default {
	title: 'InventoryItemEdit',
	component: InventoryItemEdit,
} as Meta;

const Template: Story<InventoryItemEditProps> = (args) => (
	<Router>
		<InventoryItemEdit {...args} />
	</Router>
);

export const Default = Template.bind({});
Default.args = {
	inventoryItem: {
		id: '11',
		dgId: 11,
		itemName: 'Telefon komórkowy SAMSUNG',
		owner: 'REA',
		status: 50,
		inventoryNumber: 'REA/9/2021',
		quantity: 3,
		unitMeasure: 'szt.',
		notes: 'Notatka',
	},
	scannedItems: [
		{
			dgId: 11,
			itemNumber: 1,
			date: new Date(),
		},
		{
			dgId: 11,
			itemNumber: 3,
			date: new Date(),
		},
	],
};
