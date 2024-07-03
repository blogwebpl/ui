import { IInventoryItem } from '../types';
import styled from 'styled-components';
import { Card } from '../atoms/Card';
import { MdOutlineNoteAlt } from 'react-icons/md';
import { ButtonContainer } from '../atoms/ButtonContainer';
import { Button } from '../atoms/Button';
import { TextField } from '../atoms/TextField';
import { ChangeEvent, useMemo } from 'react';
import { Typography } from '../atoms/Typography';
import { useNavigate } from 'react-router-dom';

const InventoryItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0.5rem 0;
	@media (min-width: 24rem) {
		padding: 1rem 1rem;
	}
	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0.5rem;
		gap: 1rem;
		height: 5rem;
		border-radius: 0.5rem;
		background: #fdf5e6;
	}
	li.checked {
		background: #8fbc8f;
	}

	.number {
		width: 4rem;
		display: flex;
		overflow: hidden;
		justify-content: flex-end;
		user-select: none;
	}
	p {
		font-size: 1.4rem;
	}
`;

const StyledHeaderContainer = styled.div`
	padding: 1rem 0;
	height: 10rem;
	p {
		padding: 0.5rem 0;
	}
	div {
		padding: 0.5rem;
	}
`;

const StyledListContainer = styled.div``;

export interface InventoryItemEditProps {
	inventoryItem: IInventoryItem;
	scannedItems: { dgId: number; itemNumber: number }[];
}

export function InventoryItemEdit({
	inventoryItem,
	scannedItems,
}: InventoryItemEditProps) {
	const maxItemNumber = Math.max(
		...scannedItems.map((item) => item.itemNumber)
	);
	const maxQuantity = Math.max(inventoryItem.quantity || 0, maxItemNumber);

	const checkedItems = useMemo(
		() => new Set(scannedItems.map((item) => item.itemNumber)),
		[scannedItems]
	);
	const navigate = useNavigate();
	return (
		<Card width="48rem">
			<InventoryItemContainer>
				<Typography component="h6" userSelect="none" color="#000000">
					{inventoryItem.itemName}
				</Typography>
				<StyledHeaderContainer>
					<p>
						{inventoryItem.owner} - {inventoryItem.inventoryNumber}, Ilość:{' '}
						{scannedItems.length} / {inventoryItem.quantity}{' '}
						{inventoryItem.unitMeasure}
					</p>

					<div>
						<TextField
							id="search"
							label="Notatka"
							type="text"
							icon={MdOutlineNoteAlt}
							slim={true}
							autoFocus
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								console.log(e.target.value);
							}}
							value={''}
							controlled
						/>
					</div>
				</StyledHeaderContainer>
				<StyledListContainer>
					<ul>
						{Array.from({ length: maxQuantity || 0 }, (_, i) => (
							<li
								key={i}
								className={checkedItems.has(i + 1) ? 'checked' : ''}
								onContextMenu={(e) => {
									e.preventDefault();
									navigate(
										`/inventory/item/${inventoryItem.id}/subitem/${i + 1}`
									);
								}}
								onClick={(e) => {
									if (!('ontouchstart' in window)) {
										e.preventDefault();
										navigate(
											`/inventory/item/${inventoryItem.id}/subitem/${i + 1}`
										);
									}
								}}
							>
								<span className="number">
									{i + 1 > (inventoryItem.quantity || 0)
										? `[${i + 1}]`
										: `${i + 1}`}
								</span>
								<span className="note">note...</span>
							</li>
						))}
					</ul>
				</StyledListContainer>
				<ButtonContainer>
					<Button
						label="WRÓĆ"
						variant="primary"
						type="button"
						disabled={false}
						onClick={() => {
							navigate(-1);
						}}
					/>
				</ButtonContainer>
			</InventoryItemContainer>
		</Card>
	);
}
