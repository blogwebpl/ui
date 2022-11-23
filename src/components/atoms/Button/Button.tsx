import { MouseEventHandler } from 'react';
import { StyledButton } from './buttonStyle';

export interface ButtonProps {
	disabled?: boolean;
	id?: string;
	label: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	variant: 'primary' | 'secondary' | 'accent';
	tabIndex?: number;
	type?: 'button' | 'submit' | 'reset' | undefined;
	width?: string;
}

export function Button(props: ButtonProps) {
	return <StyledButton {...props}>{props.label}</StyledButton>;
}
