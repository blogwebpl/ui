import { useEffect, useRef, useState } from 'react';
import {
	FaUser,
	FaLock,
	FaFacebook,
	FaGoogle,
	FaLinkedinIn,
} from 'react-icons/fa';

import { FaXTwitter } from 'react-icons/fa6';
import styled from 'styled-components';
import { SigninFormData } from '../Login/Login';
import { Checkbox } from '../atoms/Checkbox';
import { Alert } from '../atoms/Alert';

export interface SignupFormData {
	email: string;
	password: string;
	repeatPassword: string;
}

interface LoginModernProps {
	logo: string;
	handleSignin: ({ email, password }: SigninFormData) => void;
	handleSignup: ({ email, password, repeatPassword }: SignupFormData) => void;
	isPending: boolean;
	signInError: string;
	signUpInfo: string;
	signUpError: string;
	onClose: () => void;
}

const Logo = styled.div`
	user-select: none;
	margin-bottom: 1.8rem;
	width: 110%;

	@media (max-width: 55rem) {
		width: 90%;
	}

	@media (max-width: 48rem) {
		width: 100%;
	}
	@media (max-width: 40rem) {
		width: 110%;
	}
`;

// const AlertContainer = styled.div`
// 	position: fixed;
// 	bottom: 0;
// 	left: 0;
// 	width: 100%;
// 	z-index: 100000;
// `;

const Container = styled.div<{ $isPending: boolean }>`
	user-select: none;
	cursor: ${(props) => (props.$isPending ? 'wait' : 'default')};
	position: relative;
	width: 70vw;
	height: 80vh;
	background: #fff;
	border-radius: 1.5rem;
	box-shadow:
		0 0.4rem 2rem 0 rgba(0, 0, 0, 0.3),
		0 0.6rem 2rem 0 rgba(0, 0, 0, 0.3);
	overflow: hidden;
	opacity: 0.93;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: -50%;
		width: 100%;
		height: 100%;
		background: linear-gradient(-45deg, #3f51b5, #283593);
		z-index: 6;
		transform: translateX(100%);
		transition: 1s ease-in-out;
	}

	&.sign-up-mode::before {
		transform: translateX(0);
	}

	&.sign-up-mode .right-panel .image,
	&.sign-up-mode .right-panel .content {
		transform: translateX(200%);
	}

	&.sign-up-mode .left-panel .image,
	&.sign-up-mode .left-panel .content {
		transform: translateX(0);
	}

	&.sign-up-mode form.sign-in-form {
		opacity: 0;
	}

	&.sign-up-mode form.sign-up-form {
		opacity: 1;
	}

	&.sign-up-mode .right-panel {
		pointer-events: none;
	}

	&.sign-up-mode .left-panel {
		pointer-events: all;
	}

	@media (max-width: 48rem) {
		width: 100vw;
		height: 100vh;
		border-radius: 0;
	}

	@media (max-width: 40rem) {
		&::before {
			display: none;
		}

		form {
			width: 80%;
		}

		form.sign-up-form {
			display: none;
		}

		&.sign-up-mode2 form.sign-up-form {
			display: flex;
			opacity: 1;
		}

		&.sign-up-mode2 form.sign-in-form {
			display: none;
		}

		.panels-container {
			display: none;
		}

		.account-text {
			display: initial;
			margin-top: 3rem;
		}
	}

	@media (max-width: 20rem) {
		form {
			width: 90%;
		}
	}
`;

const SignInSignUp = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-around;
	z-index: 5;
`;

const Form = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	max-width: 30rem;
	padding: 0 1rem;

	&.sign-in-form {
		opacity: 1;
		transition: 0.5s ease-in-out;
		transition-delay: 1s;
	}

	&.sign-up-form {
		opacity: 0;
		transition: 0.5s ease-in-out;
		transition-delay: 1s;
	}
`;

const Title = styled.h2`
	font-size: 3.5rem;
	color: #3f51b5;
	margin-bottom: 1rem;
	display: block;
	width: 100%;
	height: 5rem;
	text-align: center;
`;

const MessageBox = styled.div`
	font-size: 1.5rem;
	color: #fff;
	width: 100%;
	height: 5rem;
	margin-bottom: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.4rem;
	border-radius: 0.5rem;
	&.error {
		background-color: #b00020;
	}
	&.info {
		background-color: #00c853;
	}
`;

const InputField = styled.div`
	width: 100%;
	height: 5rem;
	background: #f0f0f0;
	margin: 1rem 0;
	border: 0.2rem solid #3f51b5;
	border-radius: 5rem;
	display: flex;
	align-items: center;

	&:focus-within {
		border-color: #f44336;
	}

	i {
		flex: 1;
		text-align: center;
		color: #666;
		font-size: 1.8rem;
		height: 1.8rem;
	}

	input {
		flex: 5;
		background: none;
		border: none;
		outline: none;
		width: 100%;
		font-size: 1.8rem;
		font-weight: 600;
		color: #444;
	}
`;

const Button = styled.button`
	width: 100%;
	height: 5rem;
	border: 0.1rem solid #fff;
	border-radius: 5rem;
	background: #3f51b5;
	color: #fff;
	font-weight: 600;
	margin: 1rem 0;
	text-transform: uppercase;
	cursor: pointer;

	&:hover {
		background: #3f51b5;
	}

	&:active {
		background: #5c6bc0;
	}
`;

const SocialText = styled.p`
	margin: 1rem 0;
	font-size: 1.6rem;
`;

const SocialMedia = styled.div`
	display: flex;
	justify-content: center;
`;

const SocialIcon = styled.a`
	height: 4.5rem;
	width: 4.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #444;
	border: 0.1rem solid #444;
	border-radius: 5rem;
	margin: 0 0.5rem;

	&:hover {
		color: #3f51b5;
		border-color: #3f51b5;
	}
`;

const PanelsContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-around;
`;

const Panel = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	width: 35%;
	min-width: 24rem;
	padding: 0 1rem;
	text-align: center;
	z-index: 6;

	&.left-panel {
		pointer-events: none;
	}

	.content {
		color: #fff;
		transition: 1.1s ease-in-out;
		transition-delay: 0.5s;
	}

	h3 {
		font-size: 2.4rem;
		font-weight: 600;
	}

	p {
		font-size: 1.5rem;
		padding: 1rem 0;
	}

	.image {
		width: 100%;
		transition: 1.1s ease-in-out;
		transition-delay: 0.4s;
	}

	&.left-panel .image,
	&.left-panel .content {
		transform: translateX(-200%);
	}

	&.right-panel .image,
	&.right-panel .content {
		transform: translateX(0);
	}
`;

const AccountText = styled.p`
	display: none;

	@media (max-width: 40rem) {
		display: initial;
		margin-top: 3rem;
	}
`;

const CheckboxContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 1rem 0;
	line-height: 2.5rem !important;
	width: 100%;
`;

export function LoginModern(props: LoginModernProps) {
	const emailRef = useRef<HTMLInputElement>(null);
	const emailRef2 = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const passwordRef2 = useRef<HTMLInputElement>(null);
	const repeatPasswordRef = useRef<HTMLInputElement>(null);
	const rememberEmailRef = useRef<HTMLInputElement>(null);
	const [isSignUpMode, setIsSignUpMode] = useState(false);
	const [isSignUpMode2, setIsSignUpMode2] = useState(false);

	const storedEmail = localStorage.getItem('email');

	useEffect(() => {
		if (storedEmail) {
			if (rememberEmailRef.current) rememberEmailRef.current.checked = true;
			if (emailRef.current) emailRef.current.value = storedEmail;
			if (passwordRef.current) passwordRef.current.focus();
		} else {
			if (emailRef.current) emailRef.current.focus();
		}
		if (emailRef2.current) emailRef2.current.focus();
	}, [storedEmail, isSignUpMode, isSignUpMode2]);

	return (
		<Container
			$isPending={props.isPending}
			className={`container ${isSignUpMode ? 'sign-up-mode' : ''} ${isSignUpMode2 ? 'sign-up-mode2' : ''}`}
		>
			<SignInSignUp className="signin-signup">
				{isSignUpMode ? (
					<Form className="form sign-in-form"></Form>
				) : (
					<Form
						className="form sign-in-form"
						onSubmit={(e) => {
							e.preventDefault();
							localStorage.setItem('email', emailRef.current?.value || '');
							props.handleSignin({
								email: emailRef.current?.value || '',
								password: passwordRef.current?.value || '',
							});
						}}
					>
						<Logo>
							<img src={props.logo} alt="logo" />
						</Logo>
						{props.signInError ? (
							<MessageBox className="error">{props.signInError}</MessageBox>
						) : (
							<Title>Logowanie</Title>
						)}
						<InputField>
							<i>
								<FaUser />
							</i>
							<input
								type="email"
								required
								placeholder="e-mail"
								ref={emailRef}
							/>
						</InputField>
						<InputField>
							<i>
								<FaLock />
							</i>
							<input
								type="password"
								required
								placeholder="hasło"
								ref={passwordRef}
							/>
						</InputField>
						<CheckboxContainer>
							<Checkbox
								id="checkbox"
								label="Zapamiętaj e-mail"
								forwardedRef={rememberEmailRef}
							/>
						</CheckboxContainer>
						<Button type="submit" disabled={props.isPending}>
							Zaloguj się
						</Button>
						<SocialText>Lub zaloguj się przez:</SocialText>
						<SocialMedia>
							<SocialIcon href="#" className="social-icon">
								<FaFacebook />
							</SocialIcon>
							<SocialIcon href="" className="social-icon">
								<FaXTwitter />
							</SocialIcon>
							<SocialIcon href="" className="social-icon">
								<FaGoogle />
							</SocialIcon>
							<SocialIcon href="" className="social-icon">
								<FaLinkedinIn />
							</SocialIcon>
						</SocialMedia>
						<AccountText>
							Nie masz konta ?{' '}
							<a
								href="#"
								id="sign-up-btn2"
								onClick={() => setIsSignUpMode2(true)}
							>
								Zarejestruj&nbsp;się
							</a>
						</AccountText>
					</Form>
				)}
				{!isSignUpMode && !isSignUpMode2 ? (
					<Form className="form sign-up-form"></Form>
				) : (
					<Form
						className="form sign-up-form"
						onSubmit={(e) => {
							e.preventDefault();
							props.handleSignup({
								email: emailRef2.current?.value || '',
								password: passwordRef2.current?.value || '',
								repeatPassword: repeatPasswordRef.current?.value || '',
							});
						}}
					>
						{props.signUpError ? (
							<MessageBox className="error">{props.signUpError}</MessageBox>
						) : props.signUpInfo ? (
							<MessageBox className="info">{props.signUpInfo}</MessageBox>
						) : (
							<Title>Rejestracja</Title>
						)}
						<InputField>
							<i>
								<FaUser />
							</i>
							<input
								type="email"
								required
								placeholder="e-mail"
								ref={emailRef2}
							/>
						</InputField>
						<InputField>
							<i>
								<FaLock />
							</i>
							<input
								type="password"
								required
								placeholder="hasło"
								ref={passwordRef2}
							/>
						</InputField>
						<InputField>
							<i>
								<FaLock />
							</i>
							<input
								type="password"
								required
								placeholder="powtórz hasło"
								ref={repeatPasswordRef}
							/>
						</InputField>
						<Button type="submit" disabled={props.isPending}>
							Zarejestruj się
						</Button>
						<SocialText>Lub zarejestruj&nbsp;się przez:</SocialText>
						<SocialMedia>
							<SocialIcon href="#" className="social-icon">
								<FaFacebook />
							</SocialIcon>
							<SocialIcon href="" className="social-icon">
								<FaXTwitter />
							</SocialIcon>
							<SocialIcon href="" className="social-icon">
								<FaGoogle />
							</SocialIcon>
							<SocialIcon href="" className="social-icon">
								<FaLinkedinIn />
							</SocialIcon>
						</SocialMedia>
						<AccountText>
							Masz już konto ?{' '}
							<a
								href="#"
								id="sign-in-btn2"
								onClick={() => setIsSignUpMode2(false)}
							>
								Zaloguj&nbsp;się
							</a>
						</AccountText>
					</Form>
				)}
			</SignInSignUp>
			<PanelsContainer className="panels-container">
				{!isSignUpMode ? (
					<Panel className="panel left-panel"></Panel>
				) : (
					<Panel className="panel left-panel">
						<div className="content">
							<h3>Masz już konto&nbsp;?</h3>
							<p>Możesz się zalogować</p>
							<Button
								className="btn"
								id="sign-in-btn"
								onClick={() => setIsSignUpMode(false)}
							>
								Zaloguj&nbsp;się
							</Button>
						</div>
						<img src="signin.svg" alt="" className="image" />
					</Panel>
				)}
				{isSignUpMode ? (
					<Panel className="panel right-panel"></Panel>
				) : (
					<Panel className="panel right-panel">
						<div className="content">
							<h3>Nie masz konta&nbsp;?</h3>
							<p>Możesz zarejestrować&nbsp;się za&nbsp;darmo</p>
							<Button
								id="sign-up-btn"
								className="btn"
								onClick={() => setIsSignUpMode(true)}
							>
								Zarejestruj&nbsp;się
							</Button>
						</div>
						<img src="signup.svg" alt="" className="image" />
					</Panel>
				)}
			</PanelsContainer>
		</Container>
	);
}
