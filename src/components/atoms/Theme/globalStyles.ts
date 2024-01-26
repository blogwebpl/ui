import { createGlobalStyle } from 'styled-components';

import { defaultTheme } from './themes';

export const GlobalStyles = createGlobalStyle<{ theme?: typeof defaultTheme }>`

	html {
		font-size: 62.5%;
	}

	html, body, #app, #root {
		box-sizing: border-box;
		height: 100%;
		margin:0;
		padding:0;
	}

	*,
	*:before,
	*:after {
		box-sizing: inherit;
	}

	body,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	ol,
	ul {
		margin: 0;
		padding: 0;
		font-size: 1.6rem;
		font-weight: normal;
	}

	body {
		background-color: ${(props) => props.theme.palette.background.default};
		font-family: ${(props) => props.theme.typography.fontFamily};
		font-size: ${(props) => props.theme.typography.fontSize.normal};
		-webkit-font-smoothing: antialiased;
		font-weight: ${(props) => props.theme.typography.fontWeightRegular};
		margin: 0 !important;
		padding: 0 !important;
		overflow-y: scroll !important;
	}
	h6 {
		display: inline-block;
		font-size:${(props) => props.theme.typography.h6.fontSize};
		font-weight: ${(props) => props.theme.typography.h6.fontWeight};
		letter-spacing: ${(props) => props.theme.typography.h6.letterSpacing};
		line-height: ${(props) => props.theme.typography.h6.lineHeight};
		margin: 0;
		padding: 0
	}
	.marker-label-red {
		color: #363640;
		font-size: 1.15rem;
	}
	.marker-label-blue {
		color: blue;
		font-size: 1.15rem;
	}
	ul {
		list-style: none;
	}
	#swal2-html-container {
		font-size: 1.6rem;
		margin: 1rem 0 2rem 0;
	}
	.swal2-confirm, .swal2-cancel {
		font-size: 1.6rem !important;
	}
`;
