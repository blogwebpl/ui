import { KeyboardEventHandler, LegacyRef } from 'react';
import { IconType } from 'react-icons';
import { StyledContainer } from './textFieldStyle';

export interface TextFieldProps {
	id?: string;
	label: string;
	required?: boolean;
	type: string;
	value?: string | number;
	setValue?: any;
	forwardedRef?: LegacyRef<HTMLInputElement>;
	onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
	autoComplete?: string;
	autoFocus?: boolean;
	disabled?: boolean;
	controlled?: boolean;
	icon?: IconType;
	slim?: boolean;
}

export function TextField(props: TextFieldProps) {
	if (props.controlled)
		return (
			<StyledContainer icon={props.icon !== undefined} slim={props.slim}>
				<input
					id={props.id}
					type={props.type}
					value={props.value}
					onChange={(e) => {
						props.setValue(e.target.value);
					}}
					required={props.required}
					ref={props.forwardedRef}
					onKeyPress={props.onKeyPress}
					autoComplete={props.autoComplete}
					autoFocus={props.autoFocus}
					disabled={props.disabled}
					placeholder=" "
				/>
				<label htmlFor={props.id}>
					{props.label}
					{props.required ? ' *' : null}
				</label>
			</StyledContainer>
		);
	return (
		<StyledContainer icon={props.icon !== undefined} slim={props.slim}>
			<input
				id={props.id}
				type={props.type}
				defaultValue={props.value}
				className={props.value ? 'used' : ''}
				required={props.required}
				ref={props.forwardedRef}
				onKeyPress={props.onKeyPress}
				autoComplete={props.autoComplete}
				autoFocus={props.autoFocus}
				disabled={props.disabled}
				placeholder=" "
			/>
			<label htmlFor={props.id}>
				{props.label}
				{props.required ? ' *' : null}
			</label>
			{props.icon && <props.icon size="2.4rem" className="icon" />}
		</StyledContainer>
	);
}
