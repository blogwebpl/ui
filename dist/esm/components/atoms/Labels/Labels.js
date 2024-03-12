import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from 'styled-components';
import { TextField } from '../TextField';
import { labelsDefault, languages } from '../../types';
const StyledLabel = styled.div `
	padding: 0rem 1.4rem 1rem 1.4rem;
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
	border: 1px solid #c0c0c0;
	border-radius: 0.4rem;
	label:first-child {
		padding: 0.6rem 0.4rem;
		background-color: white;
		top: -1.3rem;
		left: -0.2rem;
		position: relative;
		font-size: 1.2rem;
		color: #00000080;
		display: inline-block;
		width: fit-content;
	}
`;
export function Labels(props) {
    return (_jsxs(StyledLabel, { children: [_jsx("label", { children: props.label }), languages.map((language) => {
                var _a;
                return (_jsx(TextField, { label: language.toUpperCase(), type: "text", value: ((_a = props.value) === null || _a === void 0 ? void 0 : _a[language]) || labelsDefault[language], onChange: (e) => props.onChange && props.onChange(Object.assign(Object.assign({}, props.value), { [language]: e.target.value })), controlled: true }, language));
            })] }));
}
//# sourceMappingURL=Labels.js.map