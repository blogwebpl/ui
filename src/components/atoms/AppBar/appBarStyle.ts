import styled from 'styled-components';

export const StyledAppBar = styled.header`
	align-items: center;
	background-color: ${(props) => props.theme.palette.element.primary.default};
	color: ${(props) => props.theme.palette.element.primary.text};
	display: flex;
	padding: 0 24px;

	@media (orientation: landscape) {
		height: 48px;
	}
	@media (orientation: portrait) {
		height: 56px;
	}
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		height: 64px;
	}
`;

export const StyledTitleContainer = styled.div`
	flex-grow: 1;
	overflow: hidden;
`;

export const StyledIconContainer = styled.div`
	display: flex;
	margin-right: -12px;
`;
