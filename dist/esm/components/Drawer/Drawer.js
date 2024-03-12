import { jsx as _jsx } from "react/jsx-runtime";
import styled from 'styled-components';
import { Menu } from '../atoms/Menu';
const StyledDrawer = styled.div `
	background-color: ${(props) => props.theme.palette.background.default};
	bottom: 0;
	box-shadow: ${(props) => props.theme.shadows[3]};
	left: 0;
	max-width: calc(100% - 5.6rem);
	overflow: hidden;
	position: fixed;
	transform: ${(props) => (props.$isdraweropen ? 'translate(0)' : 'translate(-101%)')};
	transition: transform 0.25s ease-in-out 0s;
	width: 32rem;
	@media (orientation: landscape) {
		top: 4.8rem;
	}
	@media (orientation: portrait) {
		top: 5.6rem;
	}
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		top: 6.4rem;
	}
`;
export function Drawer(props) {
    return (_jsx(StyledDrawer, { className: "drawer", "$isdraweropen": props.isDrawerOpen, onClick: (e) => {
            if (!props.closeOnClick) {
                return;
            }
            const target = e.target;
            const isDrawer = target.classList.contains('drawer');
            const isMenu = target.classList.contains('menu');
            const hasLinkChildren = target.querySelectorAll('.link').length > 0;
            const isLink = target.classList.contains('link');
            if ((!isDrawer && !isMenu && hasLinkChildren) || isLink) {
                props.closeDrawer();
            }
        }, children: _jsx(Menu, { menuElements: props.menuElements, language: props.language }) }));
}
//# sourceMappingURL=Drawer.js.map