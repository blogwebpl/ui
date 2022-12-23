import { useState } from 'react';
import { MdPerson as IconPerson } from 'react-icons/md';
import styled from 'styled-components';
import { Card } from '../atoms/Card';
import { FieldContainer } from '../atoms/FieldContainer';
import { Select } from '../atoms/Select';
import { Typography } from '../atoms/Typography';

const StyledEmailContainer = styled.div`
	color: ${(props) => props.theme.palette.text.secondary};
	display: flex;
	align-items: center;
	margin-top: 16px;
	margin-bottom: 8px;
	span {
		padding: 0 8px;
		user-select: none;
	}
`;

export function Profile() {
	const options = [
		{ value: 'Admin', label: 'Admin' },
		{ value: 'User', label: 'User' },
	];
	const [value, setValue] = useState(options[0]);
	return (
		<Card padding minWidth="320px">
			<Typography component="h6" userSelect="none" color="#000000">
				Profil użytkownika
			</Typography>
			<StyledEmailContainer>
				<IconPerson size={24} />
				<span>test@example.com</span>
			</StyledEmailContainer>
			<FieldContainer>
				<Select
					label="Aktywna grupa"
					options={options}
					value={value}
					onChange={setValue}
					isMulti={false}
					isClearable={false}
					isRequired={true}
				/>
			</FieldContainer>
		</Card>
	);
}
