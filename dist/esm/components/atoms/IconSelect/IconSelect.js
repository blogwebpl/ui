import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import ReactSelect, { components, } from 'react-select';
import styled from 'styled-components';
import { MdSettings as IconSettings, MdMap as IconMap, MdViewList as IconRecord, MdMenu as IconMenu, MdOutlineInventory as IconInventory, MdPerson as IconPerson, MdLock as IconLock, MdCreate as IconEdit, } from 'react-icons/md';
const { Option } = components;
const StyledIconOption = styled.div `
	display: flex;
	align-items: center;
	span {
		margin-left: 0.8rem;
	}
`;
const iconComponents = {
    Settings: IconSettings,
    Map: IconMap,
    Record: IconRecord,
    Menu: IconMenu,
    Inventory: IconInventory,
    Person: IconPerson,
    Lock: IconLock,
    Edit: IconEdit,
};
export const getIconComponent = (iconName) => {
    return iconName ? iconComponents[iconName] || null : null;
};
const IconOption = (_a) => {
    var { data } = _a, rest = __rest(_a, ["data"]);
    const IconComponent = getIconComponent(data.label);
    return (_jsx(Option, Object.assign({ data: data }, rest, { children: _jsxs(StyledIconOption, { children: [IconComponent && _jsx(IconComponent, {}), _jsx("span", { children: data.label })] }) })));
};
const theme = (t) => {
    return Object.assign(Object.assign({}, t), { colors: Object.assign(Object.assign({}, t.colors), { primary: '#3f51b5', neutral30: 'rgba(0, 0, 0, 0.87)', text: 'black' }), fontSize: '1.6rem' });
};
const styles = {
    control: (base, state) => {
        const { borderColor } = base;
        return Object.assign(Object.assign({}, base), { minHeight: 56, boxShadow: 'none', outline: state.isFocused ? '0.1rem solid' : 'none', outlineColor: borderColor });
    },
    menu: (base) => {
        return Object.assign(Object.assign({}, base), { zIndex: 2 });
    },
};
const Label = styled.label `
	background: white;
	padding: 0 0.5rem;
	pointer-events: none;
	position: absolute;
	transition: 0.2s ease all;
	z-index: 1;
	color: ${(props) => props.$isfloating
    ? props.theme.palette.element.primary.default
    : props.theme.palette.text.secondary};
	top: ${(props) => props.$isfloating || props.$hasvalue ? `-0.7rem` : `1.9rem`};
	left: 0.8rem;

	font-size: ${(props) => props.$isfloating || props.$hasvalue ? `1.2rem` : `1.6rem`};
`;
export function IconSelect(props) {
    const Control = (controlProps) => {
        return (_jsxs(_Fragment, { children: [_jsxs(Label, { "$isfloating": controlProps.isFocused, "$hasvalue": controlProps.hasValue, children: [props.label, " ", props.isRequired ? '*' : ''] }), _jsx(components.Control, Object.assign({}, controlProps))] }));
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
    if (props.hidden)
        return null;
    return (_jsx(ReactSelect, { isClearable: true, theme: theme, styles: styles, value: props.value ? { value: props.value, label: props.value } : null, onChange: (option) => props.onChange(option ? option.value : ''), options: options.sort((a, b) => (a.label > b.label ? 1 : -1)), placeholder: "", isMulti: false, components: { Control, Option: (prps) => _jsx(IconOption, Object.assign({}, prps)) } }));
}
//# sourceMappingURL=IconSelect.js.map