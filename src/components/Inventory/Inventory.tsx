import styled from 'styled-components';
import { IInventoryItem, Language } from '../types';
import { Card } from '../atoms/Card';
import { Typography } from '../atoms/Typography';
import { TextField } from '../atoms/TextField';
import { Select, SelectOption } from '../atoms/Select';
import { useMemo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const StyledInventoryContainer = styled.div`
	max-width: 64rem;
	width: 100%;
	height: calc(100vh - 10rem);
	position: relative;
	overflow: hidden;
`;

const StyledAppBar = styled.div`
	margin-top: 1rem;
	padding: 0 0.1rem;
	// padding: 0.5rem;
`;

const StyledItemsList = styled.ul`
	margin-top: 2rem;
	overflow-x: hidden;
	overflow-y: scroll;
	height: calc(100vh - 31rem);
	user-select: none;
	border-top-left-radius: 0.4rem;
	border-bottom-left-radius: 0.4rem;
	li {
		background: #fdf5e6;
		margin: 0.4rem;
		padding: 0.4rem;
		line-height: 1.5;
		font-size: 1.3rem;
		&.equal {
			background: #8fbc8f !important;
		}
		&.over {
			background: #ff6347 !important;
		}
		&.under {
			background: #ffa07a !important;
		}
		&:hover {
			cursor: pointer;
		}
	}

	li:nth-child(even) {
		background: #faebd7;
	}
	border: 1px solid;
	border-color: rgba(0, 0, 0, 0.38);
`;

export interface IInventory {
	dgIds: number[];
	scannedItems: {
		dgId: number;
		itemNumber: number;
	}[];
}

interface InventoryProps {
	items: IInventoryItem[];
	inventory: IInventory;
	language: Language;
}

export function Inventory({ items, language, inventory }: InventoryProps) {
	const navigate = useNavigate();
	const filterInputRef = useRef<HTMLInputElement>(null);
	const [filterTextSelected, setFilterTextSelected] = useState('');
	const filterOptions: SelectOption[] = [
		{ value: 'none', label: language === 'en' ? 'None' : 'Brak' },
		{ value: 'name', label: language === 'en' ? 'Name' : 'Nazwa' },
		{ value: 'owner', label: language === 'en' ? 'Owner' : 'Komórka' },
		{
			value: 'inventoryNumber',
			label: language === 'en' ? 'Inventory Number' : 'Numer Inwentarzowy',
		},
	];
	const [filterTypeSelected, setFilterTypeSelected] =
		useState<SelectOption | null>({
			value: 'name',
			label: language === 'en' ? 'Name' : 'Nazwa',
		});

	const sumScannedItems = useMemo(() => {
		const sums: Record<number, number> = {};
		inventory.scannedItems.forEach(({ dgId }) => {
			if (!sums[dgId]) sums[dgId] = 0;
			sums[dgId] += 1;
		});
		return sums;
	}, [inventory.scannedItems]);

	const filteredItems = useMemo(() => {
		const itemsInInventory = items.filter((item) =>
			inventory.dgIds.includes(item.dgId)
		);
		if (!filterTypeSelected || filterTypeSelected.value === 'none')
			return itemsInInventory;
		const lowerCaseFilterText = filterTextSelected.toLowerCase();
		if (filterTypeSelected.value === 'name')
			return itemsInInventory.filter((item) =>
				item.itemName.toLowerCase().includes(lowerCaseFilterText)
			);
		if (filterTypeSelected.value === 'owner')
			return itemsInInventory.filter((item) =>
				item.owner.toLowerCase().includes(lowerCaseFilterText)
			);
		if (filterTypeSelected.value === 'inventoryNumber')
			return itemsInInventory.filter((item) =>
				item.inventoryNumber.toLowerCase().includes(lowerCaseFilterText)
			);
		return itemsInInventory;
	}, [items, filterTypeSelected, filterTextSelected, inventory.dgIds]);

	return (
		<Card width='64rem' padding>
			<StyledInventoryContainer>
				<Typography component="h6" userSelect="none" color="#000">
					Inwentaryzacja
				</Typography>
				<StyledAppBar>
					<TextField
						label={language === 'en' ? 'Filter' : 'Filtr'}
						type="text"
						value={filterTextSelected}
						onChange={(e) => setFilterTextSelected(e.target.value)}
						controlled
						autoFocus
						forwardedRef={filterInputRef} 
					/>
					<br />
					<Select
						label={language === 'en' ? 'Filter Type' : 'Typ Filtra'}
						options={filterOptions}
						value={filterTypeSelected}
						onChange={(selectedOption) => {
							setFilterTypeSelected(selectedOption as SelectOption);
							filterInputRef.current && filterInputRef.current.focus();
						}}
						isClearable={true}
					/>
				</StyledAppBar>
				<StyledItemsList>
					{filteredItems.map((item) => {
						const sumQuantity = sumScannedItems[item.dgId] || 0;

						let itemClass = '';
						if (sumQuantity === item.quantity || 0) {
							itemClass = 'equal';
						}
						if (sumQuantity > (item.quantity || 0)) {
							itemClass = 'over';
						}
						if (sumQuantity < (item.quantity || 0) && sumQuantity > 0) {
							itemClass = 'under';
						}

						if (item.quantity)
						return (
							<li key={item.id} className={itemClass} onClick={() => navigate(`/inventory/edit/${item.id}`)}>
								
								<p>{item.itemName}</p>
								<p>
									{item.owner} - {item.inventoryNumber}{' '}
									{item.quantity &&
										`${sumQuantity} / ${item.quantity} - ${item.unitMeasure}`}
								</p>
							</li>
						); else return null
						;
					})}
				</StyledItemsList>
			</StyledInventoryContainer>
		</Card>
	);
}
