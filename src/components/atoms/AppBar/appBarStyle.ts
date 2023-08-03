import styled from 'styled-components';

export const StyledAppBar = styled.header`
	align-items: center;
	background-color: ${(props) => props.theme.palette.element.primary.default};
	color: ${(props) => props.theme.palette.element.primary.text};
	display: flex;
	padding: 0 2.4rem;

	@media (orientation: landscape) {
		height: 4.8rem;
	}
	@media (orientation: portrait) {
		height: 5.6rem;
	}
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		height: 6.4rem;
	}
`;

export const StyledTitleContainer = styled.div`
	flex-grow: 1;
	overflow: hidden;
`;

export const StyledIconContainer = styled.div`
	display: flex;
	margin-right: -1.2rem;
`;
