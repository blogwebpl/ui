import styled from 'styled-components';
import { Language, Translations } from '../../types';
import { getIconComponent } from '../IconSelect';

const StyledUl = styled.ul`
	padding: 0;
	margin: 0.8rem 0 0.8rem 0;
	li {
		color: #000000;
		list-style: none;
		display: flex;
		padding: 0.8rem 0;
		&:hover,
		&:focus {
			background-color: ${(props) => `#000000${props.theme.opacity.actions.hover * 100}`};
		}
	}
`;

const StyledIconContainer = styled.span`
	width: 3.2rem;
	hegiht: 4.8rem;
	display: flex;
	align-items: center;
	cursor: pointer;
`;

const StyledLabelContainer = styled.span`
	width: auto;
	hegiht: 4.8rem;
	display: flex;
	align-items: center;
	cursor: pointer;
`;

export interface ICardMenuItem {
	id: string;
	icon?: string | null;
	label: Translations;
	onClick?: () => void;
}

interface CardMenuProps {
	items: ICardMenuItem[];
	language: Language;
}

export function CardMenu(props: CardMenuProps) {
	return (
		<StyledUl>
			{props.items.map((item) => {
				if (item.icon === null) return null;
				const IconComponent = getIconComponent(item.icon);
				return (
					<li key={item.id} onClick={item.onClick}>
						{IconComponent && (
							<StyledIconContainer>
								<IconComponent size="2.4rem" />
							</StyledIconContainer>
						)}
						<StyledLabelContainer>{item.label[props.language]}</StyledLabelContainer>
					</li>
				);
			})}
		</StyledUl>
	);
}
