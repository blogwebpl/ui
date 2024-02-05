import Select, {
	StylesConfig,
	components,
	ControlProps,
	CSSObjectWithLabel,
	ThemeConfig,
	Theme,
} from 'react-select';
import styled, { DefaultTheme } from 'styled-components';

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

const styles: StylesConfig<SelectOption, true> = {
	control: (base: CSSObjectWithLabel, state: ControlProps<SelectOption, true>) => {
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
	color: ${(props: { $isfloating?: boolean; $hasvalue?: boolean; theme: DefaultTheme }) =>
		props.$isfloating
			? props.theme.palette.element.primary.default
			: props.theme.palette.text.secondary};
	top: ${(props: { $isfloating?: boolean; $hasvalue?: boolean }) =>
		props.$isfloating || props.$hasvalue ? `-0.7rem` : `1.9rem`};
	left: 0.8rem;

	font-size: ${(props: { $isfloating?: boolean; $hasvalue?: boolean }) =>
		props.$isfloating || props.$hasvalue ? `1.2rem` : `1.6rem`};
`;

interface UserSelectProps {
	isRequired?: boolean;
	label: string;
	value: string[];
	onChange: (newValue: string[]) => void; // Changed the type of newValue to string[]
	hidden?: boolean;
	users: { id: string; name: string }[];
}

export function UserSelect(props: UserSelectProps) {
	const Control = (controlProps: ControlProps<SelectOption, true>) => {
		return (
			<>
				<Label $isfloating={controlProps.isFocused} $hasvalue={controlProps.hasValue}>
					{props.label} {props.isRequired ? '*' : ''}
				</Label>
				<components.Control {...controlProps} />
			</>
		);
	};

	const options = props.users.map((user) => ({ value: user.id, label: user.name }));

	if (props.hidden) return null;

	return (
		<Select
			isClearable={true}
			styles={styles}
			theme={theme}
			value={
				props.value
					? props.value.map((id) => ({
							value: id,
							label: props.users.find((user) => user.id === id)?.name || '',
						}))
					: null
			}
			onChange={(o) => {
				props.onChange((o as SelectOption[]).map((user: SelectOption) => user.value));
			}}
			options={options.sort((a, b) => (a.label > b.label ? 1 : -1))}
			placeholder=""
			isMulti={true}
			components={{ Control }}
		/>
	);
}
