import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import styled from 'styled-components';
import { MdArrowRight as IconRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getIconComponent } from '../IconSelect/IconSelect'; // Import funkcji getIconComponent
const StyledMenu = styled.ul `
	li {
		border-bottom: 0.1rem solid #eeeeee;
		padding: 0.8rem;
	}
`;
const StyledSubmenu = styled.div `
	font-size: 1.4rem;
	height: auto;
	max-height: ${(props) => (props.$isopen ? `${4.4 * props.$elementsLength}rem` : '0')};
	overflow: hidden;
	a {
		text-decoration: none;
	}
	opacity: ${(props) => (props.$isopen ? '1' : '0')};
	transition:
		opacity 0.25s ease-out,
		max-height 0.25s ease-out;
`;
const StyledItem = styled.div `
	align-items: center;
	color: ${(props) => props.$issub ? props.theme.palette.text.menuSecondary : props.theme.palette.text.menuPrimary};
	display: flex;
	font-size: 1.4rem;
	font-weight: 500;
	height: auto;
	margin: 0;
	padding: ${(props) => (props.$issub ? '0.4rem 1.6rem' : '0.8rem 1.6rem')};
	user-select: none;
	cursor: pointer;
`;
const StyledIconContainer = styled.div `
	height: 2.4rem;
	margin-right: 3.2rem;
	width: 2.4rem;
`;
const StyledLabel = styled.div `
	flex-grow: 1;
`;
const StyledChevronContainer = styled.div `
	height: 2.4rem;
	transform: ${(props) => (props.$isopen ? 'rotate(90deg)' : 'rotate(0)')};
	transition: transform ease-out 0.35s;
	width: 2.4rem;
`;
function MenuItem({ id, label, icon, isOpen = false, setOpenedItem = () => { }, link, isSub = false, }) {
    const navigate = useNavigate();
    const IconComponent = getIconComponent(icon);
    return (_jsxs(StyledItem, { "$issub": isSub, "$isopen": isOpen, onClick: () => {
            if (link) {
                navigate(link);
            }
            else {
                setOpenedItem(isOpen ? '' : id);
            }
        }, children: [_jsx(StyledIconContainer, { children: IconComponent ? _jsx(IconComponent, { size: "2.4rem" }) : null }), _jsx(StyledLabel, { className: link ? 'link' : '', children: label }), link ? null : (_jsx(StyledChevronContainer, { "$isopen": isOpen, children: _jsx(IconRight, { size: "2.4rem" }) }))] }));
}
export function Submenu({ children, isOpen, elementsLength }) {
    return (_jsx(StyledSubmenu, { "$elementsLength": elementsLength, "$isopen": isOpen, children: children }));
}
export function Menu(props) {
    const [openedItem, setOpenedItem] = useState('');
    return (_jsx(StyledMenu, { className: "menu", children: props.menuElements.map((menuElement) => (_jsxs("li", { children: [_jsx(MenuItem, { id: menuElement.id, icon: menuElement.icon, isOpen: openedItem === menuElement.id, setOpenedItem: setOpenedItem, label: menuElement.label[props.language], link: menuElement.children.length === 0 ? menuElement.link : null }), menuElement.children.length > 0 ? (_jsx(Submenu, { elementsLength: menuElement.children.length, isOpen: openedItem === menuElement.id, children: menuElement.children.map((subItem) => (_jsx(MenuItem, { id: subItem.id, label: subItem.label[props.language], link: subItem.link, isSub: true }, subItem.id))) })) : null] }, menuElement.id))) }));
}
//# sourceMappingURL=Menu.js.map