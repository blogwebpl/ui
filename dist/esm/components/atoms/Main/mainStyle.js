import styled from 'styled-components';
export const StyledMain = styled.main `
	overflow: auto;
	left: 0;
	position: fixed;
	right: 0;
	bottom: 0;
	@media (orientation: landscape) {
		top: 4.8rem;
	}
	@media (orientation: portrait) {
		top: 5.6rem;
	}
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		left: ${(props) => (props.$isdraweropen && !props.$iscovered ? '32rem' : '0')};
		top: 6.4rem;
	}
	background-color: ${(props) => props.theme.palette.background.paper};
	background-image: url(${(props) => props.$background});
	background-size: cover;
	align-items: center;
	display: flex;
	justify-content: center;

	transition: all linear 0.25s;
	&:after {
		@media (orientation: landscape) {
			top: 4.8rem;
		}
		@media (orientation: portrait) {
			top: 5.6rem;
		}
		@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
			top: 6.4rem;
		}
		background-color: rgba(0, 0, 0, 0.2);
		bottom: 0;
		content: '';
		display: ${(props) => (props.$isdraweropen ? 'block' : 'none')};
		left: 0;
		position: fixed;
		right: 0;
		z-index: 10000;
		@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
			display: ${(props) => (props.$isdraweropen && props.$iscovered ? 'block' : 'none')};
		}
	}
`;
//# sourceMappingURL=mainStyle.js.map