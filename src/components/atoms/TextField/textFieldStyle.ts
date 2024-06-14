import styled, { css, keyframes } from 'styled-components';

const outlineFadeOut = keyframes`
  0% {
    outline-width: 0.1rem;
    outline-style: solid;
	border-color: #3f51b5;
	outline-color: #3f51b5;
  }
  100% {
    outline-width: 0;
    outline-style: none;
	border-color: rgba(0, 0, 0, 0.38);
	olnie-color:rgba(0, 0, 0, 0.38);
  }
`;

export const StyledContainer = styled.fieldset<{ $icon: boolean; $slim?: boolean }>`
	width: 100%;
	border: 0;
	margin: 0;
	padding: 0;
	position: relative;
	display: flex;
	align-items: center;
	input {
		width: 100%;
		border-color: ${(props) => props.theme.palette.text.hint};
		border-radius: ${(props) => props.theme.shape.borderRadious || 0};
		border-style: solid;
		border-width: 0.1rem;
		box-sizing: border-box;
		color: ${(props) => props.theme.palette.text.primary};
		font-family: ${(props) => props.theme.typography.fontFamily};
		font-size: ${(props) => props.theme.typography.fontSize.normal};
		font-weight: ${(props) => props.theme.typography.fontWeightRegular};
		height: 5.6rem;
		padding: 1.4rem 1.3rem;
		${(props) =>
			props.$slim &&
			css`
				padding: 1rem 1.3rem;
				height: auto;
			`}
		${(props) =>
			props.$icon &&
			css`
				padding-right: 4rem;
			`}
	}
	input:hover {
		border-color: ${(props) => props.theme.palette.text.primary};
	}
	input:hover {
		border-color: ${(props) => props.theme.palette.text.primary};
	}
	input:focus,
	input:focus-within,
	input:focus-visible {
		border-color: ${(props) => props.theme.palette.element.primary.default};
		outline-width: 0.1rem;
		outline-style: solid;
		outline-color: ${(props) => props.theme.palette.element.primary.default};

	}
	input:not(:focus) {
		animation: ${outlineFadeOut} 0.40s forwards;
	}

	label {
		// background-color: ${(props) => props.theme.palette.background.default};
		font-family: ${(props) => props.theme.typography.fontFamily};
		font-size: ${(props) => props.theme.typography.fontSize.normal};
		font-weight: ${(props) => props.theme.typography.fontWeightRegular};
		left: 0;
		margin: 0;
		padding: 0 0.5rem;
		position: absolute;
		top: 0;
		user-select: none;
	}
	label::before {
		content: ''; 
		position: absolute;
		left: 0; 
		right: 0; 
		height: 0.5rem;
		background-color: rgba(255, 255, 255, 0.95); 
		top: 50%; 
		transform: translateY(-50%);
		z-index: -1; 
	}
	input ~ label {
		color: ${(props) => props.theme.palette.text.secondary};
		pointer-events: none;
		transform: translate(0.8rem, 1.9rem) scale(1);
		${(props) =>
			props.$slim &&
			css`
				transform: translate(0.8rem, 1.1rem) scale(1);
			`}
		transition: all linear 0.2s;
	}
	input:focus ~ label {
		color: ${(props) => props.theme.palette.element.primary.default};
	}
	input:focus ~ label,
	input:not(:placeholder-shown) ~ label {
		// outline-width: 0;
		// outline-style: none;
		// outline-color: none;
		transform: translate(0.6rem, -0.7rem) scale(0.75);
		transition: all linear 0.2s;
		transform-origin: 0 0;
	}

	.icon {
		position: absolute;
		right: 1rem;
		color: ${(props) => props.theme.palette.text.secondary};
	}
	input[type='number'] {
		-moz-appearance: textfield; /* Firefox */
		appearance: textfield; /* Chrome, Safari, Edge, Opera */
	}

	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none; /* Chrome, Safari, Edge, Opera */
		margin: 0;
	}
`;
