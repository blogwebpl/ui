import { IconType } from 'react-icons';
import styled from 'styled-components';

const StyledUl = styled.ul`
	padding: 0;
	margin: 8px 0 8px 0;
	li {
		color: #000000;
		list-style: none;
		display: flex;
		padding: 8px 0;
		&:hover,
		&:focus {
			background-color: ${(props) => `#000000${props.theme.opacity.actions.hover * 100}`};
		}
	}
`;

const StyledIconContainer = styled.span`
	width: 32px;
	hegiht: 48px;
	display: flex;
	align-items: center;
	cursor: pointer;
`;

const StyledLabelContainer = styled.span`
	width: auto;
	hegiht: 48px;
	display: flex;
	align-items: center;
	cursor: pointer;
`;

export interface MenuItem {
	id: string;
	icon: IconType;
	label: string;
	onClick: () => void;
}

interface CardMenuProps {
	items: MenuItem[];
}

export function CardMenu(props: CardMenuProps) {
	return (
		<StyledUl>
			{props.items.map((item: any) => (
				<li key={item.id} onClick={item.onClick}>
					<StyledIconContainer>
						<item.icon size={24} />
					</StyledIconContainer>
					<StyledLabelContainer>{item.label}</StyledLabelContainer>
				</li>
			))}
		</StyledUl>
	);
}
