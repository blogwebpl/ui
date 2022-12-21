import { MdPerson as IconPerson } from 'react-icons/md';
import styled from 'styled-components';
import { Card } from '../atoms/Card';
import { Typography } from '../atoms/Typography';

const StyledEmailContainer = styled.div`
	color: ${(props) => props.theme.palette.text.secondary};
	display: flex;
	align-items: center;
	margin-top: 16px;
	span {
		padding: 0 8px;
		user-select: none;
	}
`;

export function Profile() {
	return (
		<Card padding minWidth="320px">
			<Typography component="h6" userSelect="none" color="#000000">
				Profil użytkownika
			</Typography>
			<StyledEmailContainer>
				<IconPerson size={24} />
				<span>test@example.com</span>
			</StyledEmailContainer>
		</Card>
	);
}
