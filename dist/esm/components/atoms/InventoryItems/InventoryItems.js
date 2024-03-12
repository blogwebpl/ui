import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { TextField } from '../TextField';
import { Button } from '../Button';
import { Select } from '../Select';
const StyledInventoryItems = styled.div `
	display: grid;
	grid-template-columns: 1fr 7rem 1fr;
	overflow: hidden;
	border: 1px solid;
	border-color: rgba(0, 0, 0, 0.38);
	user-select: none;
	li {
		background: #eee;
		margin: 0.5rem;
		padding: 0.5rem;
		line-height: 1.5;
	}

	li:nth-child(even) {
		background: #ddd;
	}
	border-radius: 0.4rem;
`;
const StyledSelectedItems = styled.div `
	border-right: 1px solid #ccc;
`;
const StyledUnselectedItems = styled.div `
	border-left: 1px solid #ccc;
`;
const StyledOptions = styled.div `
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 3rem;
	padding: 0.5rem;
`;
const StyledTitle = styled.div `
	padding: 1rem;
`;
const StyledAppBar = styled.div `
	padding: 0.5rem;
`;
const StyledContent = styled.ul `
	padding: 0.5rem;
`;
const StyledItemsList = styled.div `
	overflow-x: hidden;
	overflow-y: scroll;
	height: calc(100vh - 55rem);
`;
export function InventoryItems({ selectedItems, items, setSelectedItems, language, }) {
    const unselectedItems = useMemo(() => items.map((item) => item.dgId).filter((dgId) => !selectedItems.includes(dgId)), [items, selectedItems]);
    const [filterTypeSelected, setFilterTypeSelected] = useState({
        value: 'none',
        label: language === 'en' ? 'None' : 'Brak',
    });
    const [filterTypeUnselected, setFilterTypeUnselected] = useState({
        value: 'none',
        label: language === 'en' ? 'None' : 'Brak',
    });
    const [filterTextSelected, setFilterTextSelected] = useState('');
    const [filterTextUnselected, setFilterTextUnselected] = useState('');
    const filterItems = (i, filterType, filterText) => {
        if (!filterType || filterType.value === 'none')
            return i;
        const lowerCaseFilterText = filterText.toLowerCase();
        if (filterType.value === 'name')
            return i.filter((item) => item.itemName.toLowerCase().includes(lowerCaseFilterText));
        if (filterType.value === 'owner')
            return i.filter((item) => item.owner.toLowerCase().includes(lowerCaseFilterText));
        if (filterType.value === 'inventoryNumber')
            return i.filter((item) => item.inventoryNumber.toLowerCase().includes(lowerCaseFilterText));
        return i;
    };
    const debouncedFilterItems = useMemo(() => debounce(filterItems, 500), []);
    useEffect(() => {
        return () => {
            debouncedFilterItems.cancel();
        };
    }, [debouncedFilterItems]);
    const filterOptions = useMemo(() => [
        { value: 'none', label: language === 'en' ? 'None' : 'Brak' },
        { value: 'name', label: language === 'en' ? 'Name' : 'Nazwa' },
        { value: 'owner', label: language === 'en' ? 'Owner' : 'Komórka' },
        {
            value: 'inventoryNumber',
            label: language === 'en' ? 'Inventory Number' : 'Numer Inwentarzowy',
        },
    ], [language]);
    const handleAddToSelected = () => {
        const filteredUnselected = filterItems(items.filter((item) => unselectedItems.includes(item.dgId)), filterTypeUnselected, filterTextUnselected);
        console.log(filteredUnselected.map((item) => item.dgId));
        setSelectedItems([...selectedItems, ...filteredUnselected.map((item) => item.dgId)]);
    };
    const handleRemoveFromSelected = () => {
        const filteredSelected = filterItems(items.filter((item) => selectedItems.includes(item.dgId)), filterTypeSelected, filterTextSelected);
        setSelectedItems(selectedItems.filter((id) => !filteredSelected.map((item) => item.dgId).includes(id)));
    };
    return (_jsxs(StyledInventoryItems, { children: [_jsxs(StyledSelectedItems, { children: [_jsx(StyledTitle, { children: language === 'en' ? 'Selecteds Items' : 'Wybrane przedmioty' }), _jsxs(StyledAppBar, { children: [_jsx(TextField, { label: language === 'en' ? 'Filter' : 'Filtr', type: "text", value: filterTextSelected, onChange: (e) => setFilterTextSelected(e.target.value), controlled: true }), _jsx("br", {}), _jsx(Select, { label: language === 'en' ? 'Filter Type' : 'Typ Filtra', options: filterOptions, value: filterTypeSelected, onChange: (selectedOption) => setFilterTypeSelected(selectedOption), isClearable: true })] }), _jsx(StyledItemsList, { children: _jsx(StyledContent, { children: filterItems(items.filter((item) => selectedItems.includes(item.dgId)), filterTypeSelected, filterTextSelected).map((item) => (_jsxs("li", { children: [item.itemName, " ", item.quantity && `- ${item.quantity} ${item.unitMeasure}`, _jsx("br", {}), item.owner, " - ", item.inventoryNumber] }, item.id))) }) })] }), _jsxs(StyledOptions, { children: [_jsx(Button, { label: '<<<', variant: 'primary', onClick: handleAddToSelected }), _jsx(Button, { label: '>>>', variant: 'primary', onClick: handleRemoveFromSelected })] }), _jsxs(StyledUnselectedItems, { children: [_jsx(StyledTitle, { children: language === 'en' ? 'Unselected Items' : 'Niewybrane przedmioty' }), _jsxs(StyledAppBar, { children: [_jsx(TextField, { label: language === 'en' ? 'Filter' : 'Filtr', type: "text", value: filterTextUnselected, onChange: (e) => setFilterTextUnselected(e.target.value), controlled: true }), _jsx("br", {}), _jsx(Select, { label: language === 'en' ? 'Filter Type' : 'Typ Filtra', options: filterOptions, value: filterTypeUnselected, onChange: (selectedOption) => setFilterTypeUnselected(selectedOption), isClearable: true })] }), _jsx(StyledItemsList, { children: _jsx(StyledContent, { children: filterItems(items.filter((item) => unselectedItems.includes(item.dgId)), filterTypeUnselected, filterTextUnselected).map((item) => (_jsxs("li", { children: [item.itemName, " ", item.quantity && `- ${item.quantity} ${item.unitMeasure}`, _jsx("br", {}), item.owner, " - ", item.inventoryNumber] }, item.id))) }) })] })] }));
}
//# sourceMappingURL=InventoryItems.js.map