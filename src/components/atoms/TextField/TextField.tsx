import { KeyboardEventHandler, LegacyRef, FocusEventHandler } from 'react';
import { IconType } from 'react-icons';
import { StyledContainer } from './textFieldStyle';

export interface TextFieldProps {
	id?: string;
	label: string;
	required?: boolean;
	type: string;
	value?: any;
	setValue?: any;
	forwardedRef?: LegacyRef<HTMLInputElement>;
	onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onFocus?: FocusEventHandler<HTMLInputElement>;
	onBlur?: FocusEventHandler<HTMLInputElement>;
	autoComplete?: string;
	autoFocus?: boolean;
	disabled?: boolean;
	controlled?: boolean;
	icon?: IconType;
	slim?: boolean;
	min?: string;
}

export function TextField(props: TextFieldProps) {
	if (props.controlled)
		return (
			<StyledContainer $icon={props.icon !== undefined} $slim={props.slim}>
				<input
					id={props.id}
					type={props.type}
					value={props.value}
					onChange={
						props.onChange
							? props.onChange
							: (e) => {
									if (props.type === 'number') {
										props.setValue(Number(e.target.value));
									} else {
										props.setValue(e.target.value);
									}
								}
					}
					required={props.required}
					ref={props.forwardedRef}
					onKeyPress={props.onKeyPress}
					onFocus={props.onFocus}
					onBlur={props.onBlur}
					autoComplete={props.autoComplete}
					autoFocus={props.autoFocus}
					disabled={props.disabled}
					placeholder=" "
					spellCheck="false"
					min={props.min}
				/>
				{props.label && (
					<label htmlFor={props.id}>
						{props.label}
						{props.required ? ' *' : null}
					</label>
				)}
				{props.icon && <props.icon size="2.4rem" className="icon" />}
			</StyledContainer>
		);
	return (
		<StyledContainer $icon={props.icon !== undefined} $slim={props.slim}>
			<input
				id={props.id}
				type={props.type}
				defaultValue={props.value}
				className={props.value ? 'used' : ''}
				required={props.required}
				ref={props.forwardedRef}
				onKeyPress={props.onKeyPress}
				onFocus={props.onFocus}
				onBlur={props.onBlur}
				autoComplete={props.autoComplete}
				autoFocus={props.autoFocus}
				disabled={props.disabled}
				placeholder=" "
				spellCheck="false"
				min={props.min}
			/>
			{props.label && (
				<label htmlFor={props.id}>
					{props.label}
					{props.required ? ' *' : null}
				</label>
			)}
			{props.icon && <props.icon size="2.4rem" className="icon" />}
		</StyledContainer>
	);
}
