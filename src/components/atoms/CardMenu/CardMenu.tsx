import { IconType } from 'react-icons';
import styled from 'styled-components';

const StyledUl = styled.ul`
	li {
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
	options: MenuItem[];
}

export function CardMenu(props: CardMenuProps) {
	return (
		<StyledUl>
			{props.options.map((option: any) => (
				<li key={option.id} onClick={option.onClick}>
					<StyledIconContainer>
						<option.icon size={24} />
					</StyledIconContainer>
					<StyledLabelContainer>{option.label}</StyledLabelContainer>
				</li>
			))}
		</StyledUl>
	);
}
