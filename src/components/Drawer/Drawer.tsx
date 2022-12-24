import styled from 'styled-components';
import { Item, Menu } from '../atoms/Menu';

const StyledDrawer = styled.div<{ isDrawerOpen: boolean }>`
	background-color: ${(props) => props.theme.palette.background.default};
	bottom: 0;
	box-shadow: ${(props) => props.theme.shadows[3]};
	left: 0;
	max-width: calc(100% - 56px);
	overflow: hidden;
	position: fixed;
	transform: ${(props) => (props.isDrawerOpen ? 'translate(0px)' : 'translate(-101%)')};
	transition: transform 0.25s ease-in-out 0s;
	width: 320px;
	@media (orientation: landscape) {
		top: 48px;
	}
	@media (orientation: portrait) {
		top: 56px;
	}
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		top: 64px;
	}
`;

interface DrawerProps {
	isDrawerOpen: boolean;
	closeOnClick: boolean;
	closeDrawer: () => void;
	menuItems: Item[];
}

export function Drawer(props: DrawerProps) {
	return (
		<StyledDrawer
			className="drawer"
			isDrawerOpen={props.isDrawerOpen}
			onClick={(e) => {
				if (!props.closeOnClick) {
					return;
				}
				const target = e.target as Element;
				const isDrawer = target.classList.contains('drawer');
				const isMenu = target.classList.contains('menu');
				const hasLinkChildren = target.querySelectorAll('.link').length > 0;
				const isLink = target.classList.contains('link');
				if ((!isDrawer && !isMenu && hasLinkChildren) || isLink) {
					props.closeDrawer();
				}
			}}
		>
			<Menu items={props.menuItems} />
		</StyledDrawer>
	);
}
