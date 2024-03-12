import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import ReactSelect, { components, } from 'react-select';
import styled from 'styled-components';
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
export function Select(props) {
    const Control = (controlProps) => {
        return (_jsxs(_Fragment, { children: [_jsxs(Label, { "$isfloating": controlProps.isFocused, "$hasvalue": controlProps.hasValue, children: [props.label, " ", props.isRequired ? '*' : ''] }), _jsx(components.Control, Object.assign({}, controlProps))] }));
    };
    return (_jsx(ReactSelect, { isClearable: props.isClearable, theme: theme, styles: styles, value: props.value, onChange: props.onChange, options: props.options, components: { Control }, placeholder: "", isMulti: props.isMulti }));
}
//# sourceMappingURL=Select.js.map