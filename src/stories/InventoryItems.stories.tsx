import { useState } from 'react';
import { InventoryItemsSelect } from '../components/InventoryItemsSelect';
import { exampleInventoryItems } from './atoms/InventoryItems.data';

export default {
	title: 'Atoms/InventoryItems',
	component: InventoryItemsSelect,
};

export const Default = () => {
	const [selectedItems, setSelectedItems] = useState([1]);

	return (
		<InventoryItemsSelect
			items={exampleInventoryItems}
			selectedItems={selectedItems}
			setSelectedItems={setSelectedItems}
			language="pl"
		/>
	);
};
