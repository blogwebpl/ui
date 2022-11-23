import styled from 'styled-components';

export const StyledAlert = styled.div`
	font-size: 0.9em;
	font-weight: ${(props) => props.theme.typography.fontWeightBold};
	box-sizing: border-box;
	background-color: ${(props) => props.theme.palette.background.alert};
	border-radius: ${(props) => props.theme.shape.borderRadious};
	color: ${(props) => props.theme.palette.text.alert};
	border: 1px solid currentColor;
	display: inline-block;
	padding: 16px;
	width: 100%;
	margin: 16px 0 8px 0;
`;
