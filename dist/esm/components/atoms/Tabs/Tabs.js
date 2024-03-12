import { jsx as _jsx } from "react/jsx-runtime";
import styled from 'styled-components';
const StyledTabs = styled.div `
	user-select: none;
	display: flex;
	width: 100%;
	height: 4rem;
	font-size: 1.4rem;
	font-weight: bold;
	color: ${(props) => props.theme.palette.text.primary};
	background-color: #eee;
	padding: 0 1.6rem;
	margin-top: 1rem;
	position: absolute;
	left: 0;
	text-transform: uppercase;
	a {
		line-height: 4rem;
		cursor: pointer;
		border-bottom: 0.3rem;
		padding: 0 1rem;
		&:hover {
			border-bottom: 0.3rem solid #ccc;
			background-color: #ddd;
		}
		&.active {
			color: ${(props) => props.theme.palette.element.accent.default};
			border-bottom: 0.3rem solid ${(props) => props.theme.palette.element.accent.border};
			background-color: #ddd;
		}
	}
`;
export function Tabs({ tabs, language, activeTab, setActiveTab }) {
    return (_jsx(StyledTabs, { children: tabs.map((tab, index) => (_jsx("a", { "data-index": index, className: index === activeTab ? 'active' : '', onClick: () => setActiveTab(index), children: tab[language] }, tab[language]))) }));
}
//# sourceMappingURL=Tabs.js.map