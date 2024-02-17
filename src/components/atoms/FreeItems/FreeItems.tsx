import { MdNfc } from 'react-icons/md';
import styled from 'styled-components';
import { useState, useEffect, useMemo } from 'react';
import { ImBarcode } from 'react-icons/im';
import { debounce } from 'lodash';
import { Card } from '../Card';
import { Language } from '../../types';
import { TextField } from '../TextField';
import { FieldContainer } from '../FieldContainer';
import { IInventoryItem } from '../InventoryItems';
import { ButtonContainer } from '../ButtonContainer';
import { Button } from '../Button';

const StyledHeader = styled.h1`
	font-size: 1.6rem;
	font-weight: 700;
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
	max-height: calc(100vh - 46rem);
	min-height: 20rem;
	font-size: 1.4rem;
	li {
		padding: 1rem;
		border-bottom: 1px solid ${(props) => props.theme.palette.border};
		line-height: 1.5;
		cursor: pointer;
		user-select: none;
		b {
			font-size: 1.6rem;
		}
	}
`;

const StyledInvisibleButton = styled.button`
	border: none;
	background-color: transparent;
	cursor: pointer;
	width: 4.8rem;
	height: 4.8rem;
	position: absolute;
	top: 2rem;
	right: 0;
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
	cancelFunction: () => void;
	scanFunction: () => void;
	searchText?: string;
	itemNumber?: number;
}

export function FreeItems(props: FreeItemsProps) {
	console.log('FreeItems', new Date().toISOString());
	const [searchText, setSearchText] = useState(props.searchText || '');
	const [itemNumber, setItemNumber] = useState(props.itemNumber || 1);
	const [selectedItem, setSelectedItem] = useState<IInventoryItem | null>(null);
	const [showAdvancedOptions, setShowAdvancedOptions] = useState(true);
	const [filteredItems, setFilteredItems] = useState<IInventoryItem[]>(props.items);

	const tagsUsageMap = useMemo(() => {
		console.log('TagsUsageMap', new Date().toISOString());
		const map = new Map<number, number>();
		props.tags.forEach((tag) => {
			map.set(tag.dgId, (map.get(tag.dgId) || 0) + 1);
		});
		return map;
	}, [props.tags]);

	useEffect(() => {
		const checkCardHeight = () => {
			setShowAdvancedOptions(window.innerHeight > 450);
		};
		checkCardHeight();
		window.addEventListener('resize', checkCardHeight);
		return () => window.removeEventListener('resize', checkCardHeight);
	}, []);

	useEffect(() => {
		setItemNumber(props.itemNumber || 1);
	}, [props.itemNumber]);

	useEffect(() => {
		setFilteredItems(props.items);
	}, [props.items]);

	const filterItems = (queryText: string) => {
		console.log('Filter start', new Date().toISOString());
		const lowerCaseSearchText = queryText.toLowerCase();
		const newFilteredItems = props.items.filter((item) => {
			const isItemUsed = (tagsUsageMap.get(item.dgId) || 0) >= (item.quantity || 1);
			return queryText === ''
				? !isItemUsed
				: !isItemUsed &&
						(item.inventoryNumber.toLowerCase().includes(lowerCaseSearchText) ||
							item.itemName.toLowerCase().includes(lowerCaseSearchText) ||
							item.owner.toLowerCase().includes(lowerCaseSearchText));
		});
		setFilteredItems(newFilteredItems);

		if (newFilteredItems.length === 1) {
			setSelectedItem(newFilteredItems[0]);
		} else {
			setSelectedItem(null);
		}
		console.log('Filter end', new Date().toISOString());
	};

	const debouncedFilterItems = useMemo(() => debounce(filterItems, 300), [filterItems]);

	const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newSearchText = e.target.value;
		setSearchText(newSearchText);
		debouncedFilterItems(newSearchText);
	};

	useEffect(() => {
		const initialSearchText = props.searchText || '';
		setSearchText(initialSearchText);
		debouncedFilterItems(initialSearchText);
	}, [props.searchText]);

	const handleSelectItem = (item: IInventoryItem) => {
		setSelectedItem(item);
	};

	const renderItemUsage = useMemo(() => {
		const tagCountMap = new Map();
		props.tags.forEach((tag) => {
			tagCountMap.set(tag.dgId, (tagCountMap.get(tag.dgId) || 0) + 1);
		});

		return (item: IInventoryItem) => {
			const usedTagsCount = tagCountMap.get(item.dgId) || 0;
			return `${usedTagsCount} / ${item.quantity}`;
		};
	}, [props.tags]);

	console.log('rendering', new Date().toISOString());
	return (
		<Card minWidth="32rem" padding>
			<StyledHeader>
				<MdNfc size="4.8rem" color="#8BC34A" />
				{props.language === 'en' ? 'ASSIGN TAG' : 'PRZYPISZ TAG'}
			</StyledHeader>
			<StyledContainer>
				<FieldContainer>
					<TextField
						label={props.language === 'en' ? 'Search' : 'Szukaj'}
						type="text"
						value={searchText}
						onChange={handleSearchTextChange}
						controlled
						autoFocus
						icon={ImBarcode}
					/>
					<StyledInvisibleButton onClick={props.scanFunction} />
				</FieldContainer>
				{filteredItems.length > 0 && (
					<>
						<StyledList>
							{filteredItems.map((item) => (
								<li
									key={item.id}
									onClick={() => handleSelectItem(item)}
									style={{
										color: selectedItem?.id === item.id ? 'white' : 'black',
										backgroundColor: selectedItem?.id === item.id ? '#E91E63' : 'transparent',
									}}
								>
									<b>{item.inventoryNumber}</b>
									<br />
									{item.itemName} - {item.owner}
									<br />
									{renderItemUsage(item)} {item.unitMeasure}
								</li>
							))}
						</StyledList>
						{showAdvancedOptions && (
							<FieldContainer>
								<TextField
									label={props.language === 'en' ? 'Numer kolejny' : 'Item number'}
									type="number"
									value={itemNumber}
									onChange={(e) => setItemNumber(parseInt(e.target.value, 10))}
									controlled
								/>
							</FieldContainer>
						)}
					</>
				)}
				{filteredItems.length === 0 && <span>Nie znaleziono przedmiotu</span>}
				{showAdvancedOptions && (
					<ButtonContainer>
						<Button
							label={props.language === 'en' ? 'Cancel' : 'Anuluj'}
							variant="secondary"
							onClick={props.cancelFunction}
						/>
						<Button
							label={props.language === 'en' ? 'Assign' : 'Przypisz'}
							variant="primary"
							disabled={selectedItem === null}
						/>
					</ButtonContainer>
				)}
			</StyledContainer>
		</Card>
	);
}
