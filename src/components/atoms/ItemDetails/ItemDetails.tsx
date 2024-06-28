import styled from 'styled-components';
import { Card } from '../Card';
import { ButtonContainer } from '../ButtonContainer';
import { Button } from '../Button';
import { Typography } from '../Typography';
import { useNavigate } from 'react-router-dom';
import { IInventoryItem } from '../../types';

const ItemDetailsContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0.5rem 0;

	p {
		font-size: 1.4rem;
		line-height: 2.5rem;
	}
	span.status {
		display: inline-block;
		width: auto;
		height: 2rem;
		padding: 0.5rem;
		line-height: 1rem;
		margin: 1rem;
	}
	span.status.ok {
		background: #4caf50; /* Nice green color */
		color: #ffffff; /* Contrasting text color */
	}
	span.status.error {
		background: #ff0000;
		color: #ffffff;
	}
	span.status.warning {
		background: #ffa500;
		color: #000;
	}
	user-select: none;
`;

const StyledContainer = styled.div`
	padding: 1rem 0;
`;

export interface ItemDetailsProps {
	inventoryItem: IInventoryItem;
	itemDetails: {
		itemNumber: number;
		date?: string;
		note?: string;
	};
}

export function ItemDetails({ inventoryItem, itemDetails }: ItemDetailsProps) {
	const navigate = useNavigate();
	const quantity = inventoryItem.quantity || 0;
	return (
		<Card width="32rem" padding>
			<ItemDetailsContainer>
				<Typography component="h6" userSelect="none" color="#000000">
					{inventoryItem.itemName}
				</Typography>
				<StyledContainer>
					<p>Numer inw.: {inventoryItem.inventoryNumber}</p>
					<p>Numer porządkowy: {itemDetails.itemNumber}</p>
					<p>
						Status:{' '}
						<span
							className={`status ${!itemDetails.date ? 'error' : itemDetails.itemNumber <= quantity ? 'ok' : 'warning'}`}
						>
							{!itemDetails.date ? 'NIEPOTWIERDZONY' : 'POTWIERDZONY'}
						</span>
					</p>
					{itemDetails.date && <p>Data odczytu: {itemDetails.date}</p>}
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
			</ItemDetailsContainer>
		</Card>
	);
}
