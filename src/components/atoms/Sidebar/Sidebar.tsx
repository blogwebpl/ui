import styled from 'styled-components';

const StyledSidebar = styled.div<{ $issidebaropen: boolean }>`
	background-color: ${(props) => props.theme.palette.background.default};
	bottom: 0;
	box-shadow: ${(props) => props.theme.shadows[3]};
	right: 0;
	max-width: calc(100% - 5.6rem);
	overflow-y: auto;
	position: fixed;
	transform: ${(props) => (props.$issidebaropen ? 'translate(0)' : 'translate(101%)')};
	transition: transform 0.25s ease-in-out 0s;
	width: 32rem;
	z-index: 10000;
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

const StyledContent = styled.div``;

interface SidebarProps {
	isSidebarOpen: boolean;
	children: React.ReactNode;
}

export function Sidebar(props: SidebarProps) {
	return (
		<StyledSidebar className="sidebar" $issidebaropen={props.isSidebarOpen}>
			<StyledContent>{props.children}</StyledContent>
		</StyledSidebar>
	);
}
