import ReactSelect, {
	StylesConfig,
	components,
	ThemeConfig,
	Theme,
	CSSObjectWithLabel,
	ControlProps,
	MultiValue,
	SingleValue,
} from 'react-select';
import styled, { DefaultTheme } from 'styled-components';

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

const styles: StylesConfig<SelectOption, false> = {
	control: (
		base: CSSObjectWithLabel,
		state: ControlProps<SelectOption, false>
	) => {
		const { borderColor } = base;
		return {
			...base,
			minHeight: 56,
			boxShadow: 'none',
			outline: state.isFocused ? '0.1rem solid' : 'none',
			outlineColor: borderColor as string,
		};
	},
	menu: (base: CSSObjectWithLabel) => {
		return {
			...base,
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
	color: ${(props: {
		$isfloating?: boolean;
		$hasvalue?: boolean;
		theme: DefaultTheme;
	}) =>
		props.$isfloating
			? props.theme.palette.element.primary.default
			: props.theme.palette.text.secondary};
	top: ${(props: { $isfloating?: boolean; $hasvalue?: boolean }) =>
		props.$isfloating || props.$hasvalue ? `-0.7rem` : `1.9rem`};
	left: 0.8rem;

	font-size: ${(props: { $isfloating?: boolean; $hasvalue?: boolean }) =>
		props.$isfloating || props.$hasvalue ? `1.2rem` : `1.6rem`};
`;

const NoOptionsMessage = (props: any) => {
	return (
		<components.NoOptionsMessage {...props}>
			Brak opcji
		</components.NoOptionsMessage>
	);
};

export interface SelectOption {
	value: string;
	label: string;
}

interface SelectProps {
	isMulti?: boolean;
	isRequired?: boolean;
	isClearable?: boolean;
	label: string;
	options: SelectOption[];
	value: MultiValue<SelectOption> | SingleValue<SelectOption>;
	onChange: (
		newValue: MultiValue<SelectOption> | SingleValue<SelectOption>
	) => void;
}

export function Select(props: SelectProps) {
	const Control = (controlProps: ControlProps<SelectOption, boolean>) => {
		return (
			<>
				<Label
					$isfloating={controlProps.isFocused}
					$hasvalue={controlProps.hasValue}
				>
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
			components={{ Control, NoOptionsMessage }} // Dodano NoOptionsMessage
			placeholder=""
			isMulti={props.isMulti}
		/>
	);
}
