import { jsx as _jsx } from "react/jsx-runtime";
import styled from 'styled-components';
const StyledInventory = styled.div `
	min-width: 32rem;
	max-width: 64rem;
	width: 100%;
	height: calc(100vh - 20rem);
	display: flex;
	flex-direction: column;
	justify-content: center;
`;
export function Inventory() {
    return (_jsx(StyledInventory, { children: _jsx("h1", { children: "Inventory" }) }));
}
//# sourceMappingURL=Inventory.js.map