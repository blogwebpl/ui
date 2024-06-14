import React, { LegacyRef } from 'react';
import styled from 'styled-components';

const StyledCheckbox = styled.label`
	z-index: 0;
	position: relative;
	display: inline-block;
	color: ${(props) => props.theme.palette.text.secondary};
	font-size: ${(props) => props.theme.typography.fontSize.normal};
	// line-height: 1.6;
	& > input {
		appearance: none;
		z-index: -1;
		position: absolute;
		left: -1rem;
		top: -1.2rem;
		display: block;
		margin: 0;
		border-radius: 50%;
		width: 4.8rem;
		height: 4.8rem;
		background-color: ${(props) => props.theme.palette.element.accent.default};
		box-shadow: none;
		outline: none;
		opacity: 0;

		pointer-events: none;
		transition:
			opacity 0.3s,
			transform 0.2s;
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
		margin: 0.3rem 1.5rem 0.3rem 0.5rem;
		color: ${(props) => props.theme.palette.text.secondary};
		border: solid 0.2rem currentColor;
		border-radius: 0.2rem;
		width: 1.8rem;
		height: 1.8rem;
		vertical-align: top;
		transition:
			border-color 0.2s,
			background-color 0.2s;
	}

	& > span::after {
		content: '';
		display: block;
		position: absolute;
		top: 0.3rem;
		left: 0.5rem;
		width: 1rem;
		height: 0.5rem;
		border: solid 0.2rem transparent;
		border-right: none;
		border-top: none;
		transform: translate(0.3rem, 0.4rem) rotate(-45deg);
		box-sizing: content-box;
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
		transform: translate(0.4rem, 0.3rem);
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

export const Checkbox = React.memo((props: CheckboxProps) => {
	if (props.controlled) {

		return (
			<StyledCheckbox className="checkbox">
				<input
					type="checkbox"
					checked={props.checked}
					onChange={(e: any) => {
					
							props.onChange(e.target.checked);
			
						
					}}
					ref={props.forwardedRef}
					onClick={(e: React.MouseEvent<HTMLInputElement>) => {
						e.stopPropagation();
					}}
				/>
				<span>{props.label}</span>
			</StyledCheckbox>
		);
	}
	return (
		<StyledCheckbox className="checkbox">
			<input
				type="checkbox"
				defaultChecked={props.checked}
				ref={props.forwardedRef}
				onClick={(e: React.MouseEvent<HTMLInputElement>) => {
					e.stopPropagation();
				}}
			/>
			<span>{props.label}</span>
		</StyledCheckbox>
	);
});
