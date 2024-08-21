import styled, { css } from 'styled-components';

export const StyledAlert = styled.div<{
	$centerText?: boolean;
	$variant?: 'info' | 'error' | 'warning' | 'success';
}>`
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
	z-index: 100000;
	margin: 1.6em 0 0.8rem 0;
	text-align: ${(props) => (props.$centerText ? 'center' : 'left')};
	position: relative; /* Added to position the close button */
	${(props) =>
		props.$variant === 'info' &&
		css`
			background-color: #2196f3;
			color: white;
		`}
`;

export const CloseButton = styled.button`
	position: absolute;
	top: 1.2rem;
	right: 1rem;
	background: none;
	border: none;
	font-size: 2rem;
	cursor: pointer;
	color: ${(props) => props.theme.palette.text.alert};
`;
