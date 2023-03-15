/* eslint-disable no-alert */
import { useRef } from 'react';
import { MdPerson as IconPerson } from 'react-icons/md';
import styled from 'styled-components';
import { Button } from '../atoms/Button';
import { ButtonContainer } from '../atoms/ButtonContainer';
import { Card } from '../atoms/Card';
import { FieldContainer } from '../atoms/FieldContainer';
import { Form } from '../atoms/Form';
import { TextField } from '../atoms/TextField';
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

interface ChangePasswordProps {
	onSubmit: (password1: string, password2: string) => void;
	onCancel: () => void;
	email: string;
	error: string;
	isLoading: boolean;
}

export function ChangePassword(props: ChangePasswordProps) {
	const passwordRef1 = useRef<HTMLInputElement>(null);
	const passwordRef2 = useRef<HTMLInputElement>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const password1 = passwordRef1.current!.value;
		const password2 = passwordRef2.current!.value;
		if (!password1 || !password2) return;
		props.onSubmit(password1, password2);
	};

	return (
		<Card padding minWidth="320px">
			<Typography component="h6" userSelect="none" color="#000000">
				Zmiana hasła
			</Typography>
			<Form alertText={props.error} onSubmit={handleSubmit}>
				<StyledEmailContainer>
					<IconPerson size={24} />
					<span>{props.email}</span>
				</StyledEmailContainer>
				<FieldContainer>
					<TextField
						id="new-password"
						label="Nowe hasło"
						required={true}
						type="password"
						forwardedRef={passwordRef1}
						autoFocus
						onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
							if (event.key === 'Enter' && passwordRef2.current) {
								event.preventDefault();
								passwordRef2.current.focus();
							}
						}}
					/>
				</FieldContainer>
				<FieldContainer>
					<TextField
						id="repeat-password"
						label="Powtórz hasło"
						required={true}
						type="password"
						forwardedRef={passwordRef2}
					/>
				</FieldContainer>
				<ButtonContainer>
					<Button
						label="ANULUJ"
						variant="secondary"
						type="button"
						isDisabled={props.isLoading}
						onClick={props.onCancel}
					/>
					<Button label="ZAPISZ" variant="primary" type="submit" isDisabled={props.isLoading} />
				</ButtonContainer>
			</Form>
		</Card>
	);
}
