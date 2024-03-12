import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from 'styled-components';
import { getIconComponent } from '../IconSelect';
const StyledUl = styled.ul `
	padding: 0;
	margin: 0.8rem 0 0.8rem 0;
	li {
		color: #000000;
		list-style: none;
		display: flex;
		padding: 0.8rem 0;
		&:hover,
		&:focus {
			background-color: ${(props) => `#000000${props.theme.opacity.actions.hover * 100}`};
		}
	}
`;
const StyledIconContainer = styled.span `
	width: 3.2rem;
	hegiht: 4.8rem;
	display: flex;
	align-items: center;
	cursor: pointer;
`;
const StyledLabelContainer = styled.span `
	width: auto;
	hegiht: 4.8rem;
	display: flex;
	align-items: center;
	cursor: pointer;
`;
export function CardMenu(props) {
    return (_jsx(StyledUl, { children: props.items.map((item) => {
            if (item.icon === null)
                return null;
            const IconComponent = getIconComponent(item.icon);
            return (_jsxs("li", { onClick: item.onClick, children: [IconComponent && (_jsx(StyledIconContainer, { children: _jsx(IconComponent, { size: "2.4rem" }) })), _jsx(StyledLabelContainer, { children: item.label[props.language] })] }, item.id));
        }) }));
}
//# sourceMappingURL=CardMenu.js.map