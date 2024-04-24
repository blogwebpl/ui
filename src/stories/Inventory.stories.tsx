import { Meta, StoryObj } from '@storybook/react';
import { Inventory } from '../components/Inventory';
import { exampleInventoryItems } from './atoms/InventoryItems.data';

const meta: Meta<typeof Inventory> = {
	title: 'Inventory',
	component: Inventory,
};

export default meta;

const exampleInventory = {
	dgIds: [17, 18, 19],
	scannedItems: [
		{
			dgId: 18,
			itemNumber: 1,
		},
		{
			dgId: 18,
			itemNumber: 2,
		},
		{
			dgId: 19,
			itemNumber: 1,
		},
	],
};

export const Default: StoryObj<typeof Inventory> = {
	args: {
		items: exampleInventoryItems,
		inventory: exampleInventory,
		language: 'en',
	},
};
