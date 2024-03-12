import styled from 'styled-components';
export const StyledAlert = styled.div `
	font-size: 0.9em;
	font-weight: ${(props) => props.theme.typography.fontWeightBold};
	box-sizing: border-box;
	background-color: ${(props) => props.theme.palette.background.alert};
	border-radius: ${(props) => props.theme.shape.borderRadious};
	color: ${(props) => props.theme.palette.text.alert};
	border: 0.1rem solid currentColor;
	display: inline-block;
	padding: 1.6rem;
	width: 100%;
	margin: 1.6em 0 0.8rem 0;
`;
//# sourceMappingURL=alertStyle.js.map