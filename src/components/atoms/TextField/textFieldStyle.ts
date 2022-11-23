import styled from 'styled-components';

export const StyledContainer = styled.fieldset`
	border: 0;
	margin: 0;
	padding: 0;
	position: relative;
	input {
		border-color: ${(props) => props.theme.palette.text.hint};
		border-radius: ${(props) => props.theme.shape.borderRadious || 0};
		border-style: solid;
		border-width: 1px;
		box-sizing: border-box;
		color: ${(props) => props.theme.palette.text.primary};
		font-family: ${(props) => props.theme.typography.fontFamily};
		font-size: ${(props) => props.theme.typography.fontSize.normal};
		font-weight: ${(props) => props.theme.typography.fontWeightRegular};
		height: 56px;
		padding: 14px 13px;
		width: 100%;
	}
	input:hover {
		border-color: ${(props) => props.theme.palette.text.primary};
	}
	input:focus {
		border-color: ${(props) => props.theme.palette.element.primary.default};
		border-width: 2px;
		outline: 0;
		padding: 17px 12px;
	}
	label {
		background-color: ${(props) => props.theme.palette.background.default};
		font-family: ${(props) => props.theme.typography.fontFamily};
		font-size: ${(props) => props.theme.typography.fontSize.normal};
		font-weight: ${(props) => props.theme.typography.fontWeightRegular};
		left: 0;
		margin: 0;
		padding: 0 5px;
		position: absolute;
		top: 0;
		user-select: none;
	}
	input ~ label {
		color: ${(props) => props.theme.palette.text.secondary};
		pointer-events: none;
		transform: translate(8px, 19px) scale(1);
		transition: all linear 0.2s;
	}
	input:focus ~ label {
		color: ${(props) => props.theme.palette.element.primary.default};
	}
	input:focus ~ label,
	input:not(:placeholder-shown) ~ label {
		outline: 0;
		transform: translate(2px, -9px) scale(0.75);
		transition: all linear 0.2s;
	}
`;
