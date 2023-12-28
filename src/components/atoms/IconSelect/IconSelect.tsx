import ReactSelect, { StylesConfig, components, ThemeConfig, Theme } from 'react-select';
import styled from 'styled-components';
import { SelectOption } from '../Select';

const theme: ThemeConfig = (t: Theme) => {
	return {
		...t,
		colors: {
			...t.colors,
			primary: '#3f51b5',
			neutral30: 'rgba(0, 0, 0, 0.87)',
			text: 'black',
		},
		fontSize: '1.6rem',
	};
};

const styles: StylesConfig = {
	control: (baseStyles: any, state: any) => {
		const { borderColor } = baseStyles;
		return {
			...baseStyles,
			minHeight: 56,
			// paddingLeft: state.isFocused ? 8 : 9,
			boxShadow: 'none',
			// borderWidth: state.isFocused ? 2 : 1,
			outline: state.isFocused ? '0.1rem solid' : 'none',
			outlineColor: borderColor,
		};
	},
	menu: (baseStyles: any) => {
		console.log(baseStyles);
		return {
			...baseStyles,
			zIndex: 2,
		};
	},
};

const Label = styled.label<{ $isfloating?: boolean; $hasvalue?: boolean }>`
	background: white;
	padding: 0 0.5rem;
	pointer-events: none;
	position: absolute;
	transition: 0.2s ease all;
	z-index: 1;
	color: ${(props: any) =>
		props.$isfloating
			? props.theme.palette.element.primary.default
			: props.theme.palette.text.secondary};
	top: ${(props: any) => (props.$isfloating || props.$hasvalue ? `-0.7rem` : `1.9rem`)};
	left: 0.8rem;

	font-size: ${(props: any) => (props.$isfloating || props.$hasvalue ? `1.2rem` : `1.6rem`)};
`;

interface SelectProps {
	isMulti?: boolean;
	isRequired?: boolean;
	isClearable?: boolean;
	label: string;
	options: any;
	value: SelectOption[] | SelectOption | null;
	onChange: React.Dispatch<React.SetStateAction<any>>;
}

export function IconSelect(props: SelectProps) {
	const Control = (controlProps: any) => {
		return (
			<>
				<Label $isfloating={controlProps.isFocused} $hasvalue={controlProps.hasValue}>
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
