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
	return (
		<StyledButton
			{...{ ...props, disabled: undefined, variant: undefined, width: undefined }}
			$variant={props.variant}
			$width={props.width}
			disabled={props.disabled}
		>
			{props.label}
		</StyledButton>
	);
}
