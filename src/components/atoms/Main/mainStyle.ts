import styled from 'styled-components';

export const StyledMain = styled.main<{
	isDrawerOpen: boolean;
	isCovered: boolean;
	background?: string;
}>`
	@media (orientation: landscape) {
		top: 48px;
	}
	@media (orientation: portrait) {
		top: 56px;
	}
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		left: ${(props) => (props.isDrawerOpen && !props.isCovered ? '320px' : '0')};
		top: 64px;
	}
	background-color: ${(props) => props.theme.palette.background.paper};
	background-image: url(${(props) => props.background});
	background-size: cover;
	align-items: center;
	bottom: 0;
	display: flex;
	justify-content: center;
	left: 0;
	position: fixed;
	right: 0;
	transition: all linear 0.25s;
	&:after {
		@media (orientation: landscape) {
			top: 48px;
		}
		@media (orientation: portrait) {
			top: 56px;
		}
		@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
			top: 64px;
		}
		background-color: rgba(0, 0, 0, 0.2);
		bottom: 0;
		content: '';
		display: ${(props) => (props.isDrawerOpen ? 'block' : 'none')};
		left: 0;
		position: fixed;
		right: 0;
		z-index: 100;
		@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
			display: ${(props) => (props.isDrawerOpen && props.isCovered ? 'block' : 'none')};
		}
	}
`;
