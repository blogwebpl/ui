import { IInventoryItem } from "../../types";
import styled from "styled-components";
import { Card } from "../Card";
import { MdOutlineNoteAlt } from "react-icons/md";
import { ButtonContainer } from "../ButtonContainer";
import { Button } from "../Button";
import { TextField } from "../TextField";
import { ChangeEvent } from "react";

const InventoryDetailsContainer = styled.div`
display: flex;
  li {
    display: flex;
    justify-content: space-between; // Changed to space-between for better alignment
    align-items: center;
    margin: 0.5rem;
    gap: 1rem;
    height: 5rem;
  }
  li:nth-child(even) {
    background: #ddd;
  }
  li:nth-child(odd) {
    background: #eee;
  }
  .number {   
    width: 4rem;
    display: flex;
    overflow: hidden;
    justify-content: flex-end; // Aligned to the right
  }

`;

const StyledHeaderContainer = styled.div``;

const StyledListContainer = styled.div``;

export interface InventoryDetailsProps {
  inventoryItem: IInventoryItem;
}

export function InventoryDetails({ inventoryItem }: InventoryDetailsProps) { // Destructured props added
  return
    <Card width="48rem"> <InventoryDetailsContainer>
      <StyledHeaderContainer>
        <p>Name:</p> // Displaying name from inventoryItem
        <p>Department - Inventory Number: </p> // Displaying department and inventory number
        <p>x / y units</p> // Displaying units
        <p>
          <TextField
            id="search"
            label=""
            type="text"
            icon={MdOutlineNoteAlt}
            slim={true}
            autoFocus
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
            
            }}
            value={''}
            controlled
		    />
      </p>
      </StyledHeaderContainer>
      <StyledListContainer>
        <ul>
          <li>
            <span className="number">1</span><span className="note"><TextField            
            label="Notatka"
            type="text"
            icon={MdOutlineNoteAlt}
            slim={true}
            autoFocus
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
            
            }}
            value={''}
            controlled
		    /></span>
          </li>
          <li>
            <span className="number">1000</span><span className="note"><TextField            
            label="Notatka"
            type="text"
            icon={MdOutlineNoteAlt}
            slim={true}
            autoFocus
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
            
            }}
            value={''}
            controlled
		    /></span>
          </li>
        </ul>
      </StyledListContainer>
        <ButtonContainer >
					<Button label="WRÓĆ" variant="primary" type="button" disabled={false} />
				</ButtonContainer>
  </InventoryDetailsContainer>;
    </Card>
}

