import { useState } from 'react';
import { IInventoryItem, InventoryItems } from '../../components/atoms/InventoryItems';
import { exampleInventoryItems } from './InventoryItems.data';

export default {
	title: 'Atoms/InventoryItems',
	component: InventoryItems,
};

export const Default = () => {
	const [selectedItems, setSelectedItems] = useState([1]);

	return (
		<InventoryItems
			items={exampleInventoryItems}
			selectedItems={selectedItems}
			setSelectedItems={setSelectedItems}
			language="pl"
		/>
	);
};
