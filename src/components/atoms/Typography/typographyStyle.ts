import styled from 'styled-components';

export const StyledTypography = styled.div<{ component: string; userSelect?: string }>`
	font-size: ${(props) => props.theme.typography[props.component].fontSize};
	font-weight: ${(props) => props.theme.typography[props.component].fontWeight};
	letter-spacing: ${(props) => props.theme.typography[props.component].letterSpacing};
	line-height: ${(props) => props.theme.typography[props.component].lineHeight};
	user-select: ${(props) => props.userSelect || 'auto'};
	color: ${(props) => props.color || props.theme.palette.element.primary.text};
	display: inline-block;
	margin: 0;
	padding: 0;
`;
