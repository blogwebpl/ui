import ReactSelect, {
	StylesConfig,
	components,
	ThemeConfig,
	Theme,
	OptionProps,
	ControlProps,
	CSSObjectWithLabel,
} from 'react-select';
import styled, { DefaultTheme } from 'styled-components';
import {
	MdSettings as IconSettings,
	MdMap as IconMap,
	MdViewList as IconRecord,
	MdMenu as IconMenu,
	MdOutlineInventory as IconInventory,
	MdPerson as IconPerson,
	MdLock as IconLock,
	MdCreate as IconEdit,
} from 'react-icons/md';
import { IconType } from 'react-icons';
import { SelectOption } from '../Select';

const { Option } = components;

const StyledIconOption = styled.div`
	display: flex;
	align-items: center;
	span {
		margin-left: 0.8rem;
	}
`;

interface IconOptionProps extends OptionProps<SelectOption, false> {
	data: SelectOption;
}

const iconComponents: { [key: string]: IconType } = {
	Settings: IconSettings,
	Map: IconMap,
	Record: IconRecord,
	Menu: IconMenu,
	Inventory: IconInventory,
	Person: IconPerson,
	Lock: IconLock,
	Edit: IconEdit,
};

export const getIconComponent = (iconName: string | undefined): IconType | null => {
	return iconName ? iconComponents[iconName] || null : null;
};

const IconOption: React.FC<IconOptionProps> = ({ data, ...rest }) => {
	const IconComponent = getIconComponent(data.label);
	return (
		<Option data={data} {...rest}>
			<StyledIconOption>
				{IconComponent && <IconComponent />}
				<span>{data.label}</span>
			</StyledIconOption>
		</Option>
	);
};

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
	control: (base: CSSObjectWithLabel, state: ControlProps<SelectOption, false>) => {
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

interface IconSelectProps {
	isRequired?: boolean;
	label: string;
	value: SelectOption[] | SelectOption | null;
	onChange: React.Dispatch<React.SetStateAction<SelectOption[] | SelectOption | null>>;
}

export function IconSelect(props: IconSelectProps) {
	const Control = (controlProps: ControlProps<SelectOption, false>) => {
		return (
			<>
				<Label $isfloating={controlProps.isFocused} $hasvalue={controlProps.hasValue}>
					{props.label} {props.isRequired ? '*' : ''}
				</Label>
				<components.Control {...controlProps} />
			</>
		);
	};

	const options = [
		{ value: 'Settings', label: 'Settings' },
		{ value: 'Map', label: 'Map' },
		{ value: 'Record', label: 'Record' },
		{ value: 'Menu', label: 'Menu' },
		{ value: 'Inventory', label: 'Inventory' },
		{ value: 'Person', label: 'Person' },
		{ value: 'Lock', label: 'Lock' },
		{ value: 'Edit', label: 'Edit' },
	];

	return (
		<ReactSelect
			isClearable={true}
			theme={theme}
			styles={styles}
			value={props.value}
			onChange={props.onChange}
			options={options.sort((a, b) => (a.label > b.label ? 1 : -1))}
			placeholder=""
			isMulti={false}
			components={{ Control, Option: (prps) => <IconOption {...(prps as IconOptionProps)} /> }}
		/>
	);
}
