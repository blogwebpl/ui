/* eslint-disable no-alert */
import { MdPerson as IconPerson, MdMode as IconEdit, MdLock as IconLock } from 'react-icons/md';
import styled from 'styled-components';
import { Card } from '../atoms/Card';
import { CardMenu, MenuItem } from '../atoms/CardMenu';
import { FieldContainer } from '../atoms/FieldContainer';
import { Select } from '../atoms/Select';
import { Typography } from '../atoms/Typography';

const StyledEmailContainer = styled.div`
	color: ${(props) => props.theme.palette.text.secondary};
	display: flex;
	align-items: center;
	margin-top: 1.6rem;
	margin-bottom: 0.8rem;
	span {
		padding: 0 0.8rem;
		user-select: none;
	}
`;

interface Option {
	value: string;
	label: string;
}

interface ProfileProps {
	roles: Option[] | undefined;
	role: Option | null | undefined;
	onChange: (newRole: Option) => void;
	email: string;
	changePassword: () => void;
	logout: () => void;
}

export function Profile(props: ProfileProps) {
	const menuItems: MenuItem[] = [
		{ id: 'changePassword', icon: IconEdit, label: 'Zmień hasło', onClick: props.changePassword },
		{ id: 'lock', icon: IconLock, label: 'Wyloguj', onClick: props.logout },
	];
	if (!props.role) {
		return null;
	}
	const options = props.roles || [];
	const value = props.role || null;

	return (
		<Card padding minWidth="32rem">
			<Typography component="h6" userSelect="none" color="#000000">
				Profil użytkownika
			</Typography>
			<StyledEmailContainer>
				<IconPerson size="2.4rem" />
				<span>{props.email}</span>
			</StyledEmailContainer>
			<FieldContainer>
				<Select
					label="Aktywna grupa"
					options={options}
					value={value}
					onChange={props.onChange}
					isMulti={false}
					isClearable={false}
					isRequired={true}
				/>
			</FieldContainer>
			<CardMenu items={menuItems} />
		</Card>
	);
}
