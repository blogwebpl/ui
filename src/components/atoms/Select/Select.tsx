import ReactSelect, { StylesConfig, components, ThemeConfig, Theme } from 'react-select';
import styled from 'styled-components';

const theme: ThemeConfig = (t: Theme) => {
	return {
		...t,
		colors: {
			...t.colors,
			primary: '#3f51b5',
			neutral30: 'rgba(0, 0, 0, 0.87)',
			text: 'black',
		},
	};
};

const styles: StylesConfig = {
	control: (baseStyles, state) => {
		const { borderColor } = baseStyles;
		return {
			...baseStyles,
			minHeight: 56,
			// paddingLeft: state.isFocused ? 8 : 9,
			boxShadow: 'none',
			// borderWidth: state.isFocused ? 2 : 1,
			outline: state.isFocused ? '1px solid' : 'none',
			outlineColor: borderColor,
		};
	},
};

const Label = styled.label<{ isFloating?: boolean; hasValue?: boolean }>`
	background: white;
	padding: 0 5px;
	pointer-events: none;
	position: absolute;
	transition: 0.2s ease all;
	z-index: 1;
	color: ${(props) =>
		props.isFloating
			? props.theme.palette.element.primary.default
			: props.theme.palette.text.secondary};
	top: ${(props) => (props.isFloating || props.hasValue ? `-7px` : `19px`)};
	left: ${(props) => (props.isFloating || props.hasValue ? `8px` : `8px`)};

	font-size: ${(props) => (props.isFloating || props.hasValue ? `0.75rem` : `1rem`)};
`;

export interface SelectOption {
	value: string;
	label: string;
}

interface SelectProps {
	isMulti?: boolean;
	isRequired?: boolean;
	isClearable?: boolean;
	label: string;
	options: any;
	value: SelectOption[] | SelectOption | null;
	onChange: React.Dispatch<React.SetStateAction<any>>;
}

export function Select(props: SelectProps) {
	const Control = (controlProps: any) => {
		return (
			<>
				<Label isFloating={controlProps.isFocused} hasValue={controlProps.hasValue}>
					{props.label} {props.isRequired ? '*' : ''}
				</Label>
				<components.Control {...controlProps} />
			</>
		);
	};

	return (
		<ReactSelect
			isClearable={props.isClearable}
			theme={theme}
			styles={styles}
			value={props.value}
			onChange={props.onChange}
			options={props.options}
			components={{ Control }}
			placeholder=""
			isMulti={props.isMulti}
		/>
	);
}
