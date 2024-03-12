import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { InventoryItems } from '../../components/atoms/InventoryItems';
import { exampleInventoryItems } from './InventoryItems.data';
export default {
    title: 'Atoms/InventoryItems',
    component: InventoryItems,
};
export const Default = () => {
    const [selectedItems, setSelectedItems] = useState([1]);
    return (_jsx(InventoryItems, { items: exampleInventoryItems, selectedItems: selectedItems, setSelectedItems: setSelectedItems, language: "pl" }));
};
//# sourceMappingURL=InventoryItems.stories.js.map