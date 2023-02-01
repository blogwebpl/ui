import { LegacyRef } from 'react';
import styled from 'styled-components';

const StyledCheckbox = styled.label`
	z-index: 0;
	position: relative;
	display: inline-block;
	color: ${(props) => props.theme.palette.text.secondary};
	font-size: ${(props) => props.theme.typography.fontSize.normal};
	line-height: 1.6;
	& > input {
		appearance: none;
		z-index: -1;
		position: absolute;
		left: -10px;
		top: -12px;
		display: block;
		margin: 0;
		border-radius: 50%;
		width: 48px;
		height: 48px;
		background-color: ${(props) => props.theme.palette.element.accent.default};
		box-shadow: none;
		outline: none;
		opacity: 0;

		pointer-events: none;
		transition: opacity 0.3s, transform 0.2s;
	}
	& > span {
		display: inline-block;
		width: 100%;
		cursor: pointer;
		user-select: none;
	}

	& > span::before {
		content: '';
		display: inline-block;
		box-sizing: border-box;
		margin: 3px 15px 3px 5px;
		color: ${(props) => props.theme.palette.text.secondary};
		border: solid 2px currentColor;
		border-radius: 2px;
		width: 18px;
		height: 18px;
		vertical-align: top;
		transition: border-color 0.2s, background-color 0.2s;
	}

	& > span::after {
		content: '';
		display: block;
		position: absolute;
		top: 3px;
		left: 5px;
		width: 10px;
		height: 5px;
		border: solid 2px transparent;
		border-right: none;
		border-top: none;
		transform: translate(3px, 4px) rotate(-45deg);
	}

	& > input:checked,
	& > input:indeterminate {
		background-color: ${(props) => props.theme.palette.element.accent.default};
	}

	& > input:checked + span::before,
	& > input:indeterminate + span::before {
		border-color: ${(props) => props.theme.palette.element.accent.default};
		background-color: ${(props) => props.theme.palette.element.accent.default};
	}

	& > input:checked + span::after,
	& > input:indeterminate + span::after {
		border-color: white;
	}

	& > input:indeterminate + span::after {
		border-left: none;
		transform: translate(4px, 3px);
	}

	&:hover > input {
		opacity: ${(props) => props.theme.opacity.actions.hover};
	}

	& > input:focus {
		opacity: ${(props) => props.theme.opacity.actions.focus};
	}

	&:hover > input:focus {
		${(props) => props.theme.opacity.actions.focus};
	}

	& > input:active + span::before {
		border-color: ${(props) => props.theme.palette.element.accent.default};
	}

	& > input:disabled {
		opacity: 0;
	}

	& > input:disabled + span {
		color: ${(props) => props.theme.palette.element.accent.default};
		cursor: initial;
	}

	& > input:disabled + span::before {
		border-color: currentColor;
	}

	& > input:checked:disabled + span::before,
	& > input:indeterminate:disabled + span::before {
		border-color: transparent;
		background-color: currentColor;
	}
`;

interface CheckboxProps {
	id?: string;
	label?: string;
	checked?: boolean;
	onChange?: any;
	controlled?: boolean;
	forwardedRef?: LegacyRef<HTMLInputElement>;
}

export function Checkbox(props: CheckboxProps) {
	if (props.controlled)
		return (
			<StyledCheckbox className="checkbox">
				<input
					type="checkbox"
					checked={props.checked}
					onChange={(e) => props.onChange(e.target.value)}
					ref={props.forwardedRef}
				/>
				<span>{props.label}</span>
			</StyledCheckbox>
		);
	return (
		<StyledCheckbox>
			<input type="checkbox" defaultChecked={props.checked} ref={props.forwardedRef} />
			<span>{props.label}</span>
		</StyledCheckbox>
	);
}
