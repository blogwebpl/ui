import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from 'styled-components';
import { MdOutlineNfc } from 'react-icons/md';
const StyledWriteTag = styled.div `
	display: flex;
	color: red;
	width: 100%;
	height: 6.4rem;
	padding: 0.8rem;
	align-items: center;
	justify-content: flex-start;
	border: 1px solid black;
	svg {
		width: 4.8rem;
		height: 4.8rem;
	}

	button {
		font-weight: 700;
		width: 12rem;
		height: 3rem;
	}
`;
export function WriteTag(props) {
    return (_jsxs(StyledWriteTag, { children: [_jsx(MdOutlineNfc, {}), _jsx("button", { onClick: () => props.writeTagFunction(props.data), children: "ZAPISZ" })] }));
}
//# sourceMappingURL=WriteTag.js.map