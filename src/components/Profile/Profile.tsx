/* eslint-disable no-alert */
import { MdPerson as IconPerson } from 'react-icons/md';
import styled from 'styled-components';
import { Card } from '../atoms/Card';
import { CardMenu } from '../atoms/CardMenu';
import { FieldContainer } from '../atoms/FieldContainer';
import { Select, SelectOption } from '../atoms/Select';
import { Typography } from '../atoms/Typography';
import { Action } from '../atoms/Tools';
import { MdCreate as EditIcon, MdLock as LockIcon } from 'react-icons/md';

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

const Capitalize = styled.div`
	text-transform: capitalize;
`;

interface Option {
	value: string;
	label: string;
}

interface ProfileProps {
	roles: Option[] | undefined;
	role: Option | null | undefined;
	onChange: ({ value, label }: SelectOption) => void;
	email: string;
	changePassword: () => void;
	logout: () => void;
}

export function Profile(props: ProfileProps) {
	const menuItems: Action[] = [
		{
			id: 'changePassword',
			icon: EditIcon,
			hint: { pl: 'Zmień hasło', en: 'Change password' },
			onClick: props.changePassword,
		},
		{
			id: 'lock',
			icon: LockIcon,
			hint: { pl: 'Wyloguj', en: 'Sign out' },
			onClick: props.logout,
		},
	];
	if (!props.role) {
		return null;
	}
	const options = props.roles || [];
	const value = props.role || null;

	return (
		<Card padding width="32rem">
			<Typography component="h6" userSelect="none" color="#000000">
				Profil użytkownika
			</Typography>
			<StyledEmailContainer>
				<IconPerson size="2.4rem" />
				<span>{props.email}</span>
			</StyledEmailContainer>
			<FieldContainer>
				<Capitalize>
					<Select
						label="Aktywna grupa"
						options={options}
						value={value}
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						onChange={props.onChange as any}
						isMulti={false}
						isClearable={false}
						isRequired={true}
					/>
				</Capitalize>
			</FieldContainer>
			<CardMenu items={menuItems} language="pl" />
		</Card>
	);
}
