import styled from 'styled-components';
import { Card } from '../Card';
import { ButtonContainer } from '../ButtonContainer';
import { Button } from '../Button';
import { Typography } from '../Typography';
import { useNavigate } from 'react-router-dom';
import { IInventoryItem } from '../../types';

const InventoryDetailsContainer = styled.div`
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

const StyledContainer = styled.div`
	padding: 1rem 0;
`;

export interface InventoryDetailsProps {
	inventoryItem: IInventoryItem;
	itemDetails: {
		itemNumber: number;
		date?: string;
		note?: string;
	};
}

export function InventoryDetails({ inventoryItem }: InventoryDetailsProps) {
	const navigate = useNavigate();
	return (
		<Card width="48rem">
			<InventoryDetailsContainer>
				<Typography component="h6" userSelect="none" color="#000000">
					Inventory details
				</Typography>
				<StyledContainer>
					<p>{inventoryItem.itemName}</p>
					<p>{inventoryItem.inventoryNumber}</p>
					<p>{inventoryItem.quantity}</p>
				</StyledContainer>
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
			</InventoryDetailsContainer>
		</Card>
	);
}
