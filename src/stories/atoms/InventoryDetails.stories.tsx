import React from 'react';
import { StoryFn as Story, Meta } from '@storybook/react'; // Corrected import for Story
import {
	InventoryDetails,
	InventoryDetailsProps,
} from '../../components/atoms/InventoryDetails'; // Corrected import to named export and added InventoryDetailsProps
import { BrowserRouter as Router } from 'react-router-dom';

export default {
	title: 'Atoms/InventoryDetails',
	component: InventoryDetails,
} as Meta;

const Template: Story<InventoryDetailsProps> = (args) => (
	<Router>
		<InventoryDetails {...args} />
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
	},
	itemDetails: {
		itemNumber: 1,
		date: '2021-01-01',
		note: 'Notatka',
	},
};
