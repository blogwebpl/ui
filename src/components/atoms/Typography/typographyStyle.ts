import styled from 'styled-components';

export const StyledTypography = styled.div<{
	$component: string;
	$userselect?: string;
	$width?: string;
	$color?: string;
}>`
	font-size: 1.6rem;
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		font-size: ${(props) => props.theme.typography[props.$component].fontSize};
	}
	font-weight: ${(props) => props.theme.typography[props.$component].fontWeight};
	letter-spacing: ${(props) => props.theme.typography[props.$component].letterSpacing};
	line-height: ${(props) => props.theme.typography[props.$component].lineHeight};
	user-select: ${(props) => props.$userselect || 'auto'};
	color: ${(props) => props.$color || props.theme.palette.element.primary.text};
	display: inline-block;
	margin: 0;
	padding: 0;
	width: ${(props) => (props.$width ? props.$width : 'auto')};
`;
