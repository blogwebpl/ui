import styled from 'styled-components';

export const StyledMain = styled.main<{
	$isdraweropen: boolean;
	$iscovered: boolean;
	$background?: string;
}>`
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
	bottom: 0;
	display: flex;
	justify-content: center;
	left: 0;
	position: fixed;
	right: 0;
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
		z-index: 100;
		@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
			display: ${(props) => (props.$isdraweropen && props.$iscovered ? 'block' : 'none')};
		}
	}
`;
