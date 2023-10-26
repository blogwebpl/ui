import { useEffect, useRef } from 'react';
import { Button } from '../atoms/Button';
import { ButtonContainer } from '../atoms/ButtonContainer';
import { Card } from '../atoms/Card';
import { Checkbox } from '../atoms/Checkbox';
import { FieldContainer } from '../atoms/FieldContainer';
import { Form } from '../atoms/Form';
import { Logo } from '../atoms/Logo';
import { TextField } from '../atoms/TextField';
import { Typography } from '../atoms/Typography';

export interface LoginFormData {
	email: string;
	password: string;
}

interface LoginProps {
	logo?: string;
	handleSubmit: ({ email, password }: LoginFormData) => void;
	isPending: boolean;
	error: string;
}

export function Login(props: LoginProps) {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const rememberEmailRef = useRef<HTMLInputElement>(null);

	const storedEmail = localStorage.getItem('email');

	useEffect(() => {
		if (storedEmail) {
			rememberEmailRef.current!.checked = true;
			emailRef.current!.value = storedEmail;
			passwordRef.current!.focus();
		} else {
			emailRef.current!.focus();
		}
	}, []);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const email = emailRef.current!.value;
		const password = passwordRef.current!.value;
		const isRememberEmailChecked = rememberEmailRef.current!.value;
		if (!email || !password) return;
		if (isRememberEmailChecked) localStorage.setItem('email', email);
		else localStorage.removeItem('email');
		props.handleSubmit({ email, password });
	};

	return (
		<Card padding minWidth="32rem" opacity={true}>
			{props.logo && <Logo src={props.logo} height="6.4rem" />}
			<Typography component="h6" userSelect="none" color="#000000">
				Zaloguj się
			</Typography>
			<Form alertText={props.error} onSubmit={handleSubmit}>
				<FieldContainer>
					<TextField
						id="email"
						label="E-mail"
						required={true}
						type="email"
						forwardedRef={emailRef}
						onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
							if (event.key === 'Enter' && passwordRef.current) {
								event.preventDefault();
								passwordRef.current.focus();
							}
						}}
						autoComplete="username"
					/>
				</FieldContainer>
				<FieldContainer>
					<TextField
						id="password"
						label="Hasło"
						required={true}
						type="password"
						forwardedRef={passwordRef}
						autoComplete="current-password"
					/>
				</FieldContainer>
				<FieldContainer>
					<Checkbox id="checkbox" label="Zapamiętaj e-mail" forwardedRef={rememberEmailRef} />
				</FieldContainer>
				<ButtonContainer>
					<Button label="ZALOGUJ SIĘ" variant="primary" type="submit" disabled={props.isPending} />
				</ButtonContainer>
			</Form>
		</Card>
	);
}
