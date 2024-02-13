import { MdNfc } from 'react-icons/md';
import styled from 'styled-components';
import { useState, useEffect, useMemo } from 'react';
import { Card } from '../Card';
import { Language } from '../../types';
import { TextField } from '../TextField';
import { FieldContainer } from '../FieldContainer';
import { IInventoryItem } from '../InventoryItems';
import { ButtonContainer } from '../ButtonContainer';
import { Button } from '../Button';

const StyledHeader = styled.h1`
	font-size: 1.6rem;
	display: flex;
	align-items: center;
	gap: 2rem;
`;

const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

const StyledList = styled.ul`
	list-style: none;
	padding: 1rem;
	margin: -1rem 0 -1rem 0;
	border: 1px solid ${(props) => props.theme.palette.border};
	border-radius: 0.4rem;
	overflow-y: auto;
	max-height: 20rem;
	font-size: 1.4rem;
	li {
		padding: 1rem;
		border-bottom: 1px solid ${(props) => props.theme.palette.border};
		line-height: 1.5;
		cursor: pointer;
		user-select: none;
	}
`;

export interface ITags {
	id: string;
	dgId: number;
	tagId: string;
	itemNumber: number;
	note?: string;
}

interface FreeItemsProps {
	language?: Language;
	items: IInventoryItem[];
	tags: ITags[];
}

export function FreeItems(props: FreeItemsProps) {
	const [searchText, setSearchText] = useState('');
	const [selectedItem, setSelectedItem] = useState<IInventoryItem | null>(null);

	const tagsUsageMap = useMemo(() => {
		const map = new Map<number, number>();
		props.tags.forEach((tag) => {
			map.set(tag.dgId, (map.get(tag.dgId) || 0) + 1);
		});
		return map;
	}, [props.tags]);

	const [filteredItems, setFilteredItems] = useState<IInventoryItem[]>(props.items);

	useEffect(() => {
		setFilteredItems(props.items);
	}, [props.items]);

	const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
		const lowerCaseSearchText = e.target.value.toLowerCase();
		const newFilteredItems = props.items.filter((item) => {
			const isItemUsed = (tagsUsageMap.get(item.dgId) || 0) >= (item.quantity || 1);
			return (
				!isItemUsed &&
				(item.inventoryNumber.toLowerCase().includes(lowerCaseSearchText) ||
					item.itemName.toLowerCase().includes(lowerCaseSearchText) ||
					item.owner.toLowerCase().includes(lowerCaseSearchText))
			);
		});
		setFilteredItems(newFilteredItems || []);

		if (newFilteredItems.length === 1) {
			setSelectedItem(newFilteredItems[0]);
		} else if (newFilteredItems.length === 0) {
			setSelectedItem(null);
		}
	};

	const handleSelectItem = (item: IInventoryItem) => {
		setSelectedItem(item);
	};

	const renderItemUsage = (item: IInventoryItem) => {
		const usedTagsCount = props.tags.filter((tag) => tag.dgId === item.dgId).length;
		return `${usedTagsCount} / ${item.quantity}`;
	};

	return (
		<Card minWidth="32rem" padding>
			<StyledHeader>
				<MdNfc size="4.8rem" />
				{props.language === 'en' ? 'Assign tag' : 'Przypisz tag'}
			</StyledHeader>
			<StyledContainer>
				<FieldContainer>
					<TextField
						label={props.language === 'en' ? 'Search' : 'Szukaj'}
						type="text"
						value={searchText}
						onChange={handleSearchTextChange}
						controlled
					/>
				</FieldContainer>
				<StyledList>
					{filteredItems.map((item) => (
						<li
							key={item.id}
							onClick={() => handleSelectItem(item)}
							style={{ backgroundColor: selectedItem?.id === item.id ? '#e0e0e0' : 'transparent' }}
						>
							{item.inventoryNumber}
							<br />
							{item.itemName} - {item.owner}
							<br />
							{renderItemUsage(item)} {item.unitMeasure}
						</li>
					))}
				</StyledList>
				<ButtonContainer>
					<Button label={props.language === 'en' ? 'Cancel' : 'Anuluj'} variant="secondary" />
					<Button
						label={props.language === 'en' ? 'Assign' : 'Przypisz'}
						variant="primary"
						disabled={selectedItem === null}
					/>
				</ButtonContainer>
			</StyledContainer>
		</Card>
	);
}
