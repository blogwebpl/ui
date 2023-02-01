import styled from 'styled-components';

const StyledSidebar = styled.div<{ isSidebarOpen: boolean }>`
	background-color: ${(props) => props.theme.palette.background.default};
	bottom: 0;
	box-shadow: ${(props) => props.theme.shadows[3]};
	right: 0;
	max-width: calc(100% - 56px);
	overflow-y: auto;
	position: fixed;
	transform: ${(props) => (props.isSidebarOpen ? 'translate(0px)' : 'translate(101%)')};
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

const StyledContent = styled.div``;

interface SidebarProps {
	isSidebarOpen: boolean;
	children: React.ReactNode;
}

export function Sidebar(props: SidebarProps) {
	return (
		<StyledSidebar className="sidebar" isSidebarOpen={props.isSidebarOpen}>
			<StyledContent>{props.children}</StyledContent>
		</StyledSidebar>
	);
}
