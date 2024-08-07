import styled from 'styled-components';
import { Card } from '../atoms/Card';
import { ButtonContainer } from '../atoms/ButtonContainer';
import { Button } from '../atoms/Button';
import { Typography } from '../atoms/Typography';
import { useNavigate } from 'react-router-dom';
import { IInventoryItem } from '../types';

const InventorySubitemEditContainer = styled.div`
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

export interface InventorySubitemEditProps {
	inventoryItem: IInventoryItem;
	inventorySubitem: {
		itemNumber: number;
		date?: string;
		note?: string;
	};
	changeStatus: (status: boolean) => void;
}

export function InventorySubitemEdit({
	inventoryItem,
	inventorySubitem,
	changeStatus,
}: InventorySubitemEditProps) {
	const navigate = useNavigate();
	const quantity = inventoryItem.quantity || 0;
	const statusConfirmed = !!inventorySubitem.date;

	return (
		<Card width="36rem" padding>
			<InventorySubitemEditContainer>
				<Typography component="h6" userSelect="none" color="#000000">
					{inventoryItem.itemName}
				</Typography>
				<StyledContainer>
					<p>Numer inw.: {inventoryItem.inventoryNumber}</p>
					<p>Numer porządkowy: {inventorySubitem.itemNumber}</p>
					<p>
						Status:{' '}
						<span
							className={`status ${statusConfirmed ? (inventorySubitem.itemNumber <= quantity ? 'ok' : 'warning') : 'error'}`}
						>
							{statusConfirmed ? 'POTWIERDZONY' : 'NIEPOTWIERDZONY'}
						</span>
					</p>
					{inventorySubitem.date && (
						<p>Data odczytu: {inventorySubitem.date}</p>
					)}
				</StyledContainer>
				<ButtonContainer>
					<Button
						label="ZMIEŃ STATUS"
						variant="accent"
						type="button"
						disabled={false}
						onClick={() => {
							changeStatus(statusConfirmed);
						}}
					/>
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
			</InventorySubitemEditContainer>
		</Card>
	);
}
