export const defaultTheme = {
	name: 'lightTheme',
	breakpoints: {
		xs: '30rem',
		sm: '48rem',
		md: '64rem',
		lg: '75rem',
		xl: '120rem',
	},
	opacity: {
		actions: {
			active: '0.20',
			hover: '0.10',
			focus: '0.08',
		},
	},
	palette: {
		background: {
			default: '#fff',
			paper: '#ededed',
			paperDark: '#cdcdcd',
			alert: '#FFCDD1',
		},
		element: {
			primary: {
				default: '#3f51b5',
				action: '#303F9F',
				text: '#fff',
				textDark: '#000',
				border: '#3f51b5',
			},
			secondary: {
				default: '#fff',
				action: '#eee',
				text: '#3f51b5',
				border: '#3f51b5',
			},
			accent: {
				default: '#e91e63',
				action: '#b0003a',
				text: '#fff',
				border: '#e91e63',
			},
		},
		text: {
			primary: 'rgba(0, 0, 0, 0.87)',
			secondary: 'rgba(0, 0, 0, 0.54)',
			hint: 'rgba(0, 0, 0, 0.38)',
			alert: '#e91e63',
			menuPrimary: '#444444',
			menuSecondary: '#7D7D7d',
		},
	},
	shadows: [
		'none',
		'0 0.2rem 0.1rem -0.1rem rgba(0,0,0,0.2),0 0.1rem 0.1rem 0 rgba(0,0,0,0.14),0 0.1rem 0.3rem 0 rgba(0,0,0,0.12)',
		'0 0.3rem 0.1rem -0.2rem rgba(0,0,0,0.2),0 0.2rem 0.2rem 0 rgba(0,0,0,0.14),0 0.1rem 0.5rem 0 rgba(0,0,0,0.12)',
		'0 0.3rem 0.3rem -0.2rem rgba(0,0,0,0.2),0 0.3rem 0.4rem 0 rgba(0,0,0,0.14),0 0.1rem 0.8rem 0 rgba(0,0,0,0.12)',
	],
	shape: {
		borderRadious: '0.5rem',
	},
	typography: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-ServiceUIFrameContext',
		fontSize: {
			normal: '1.6rem',
		},
		fontWeightLight: '300',
		fontWeightRegular: '400',
		fontWeightMedium: '500',
		fontWeightBold: '700',
		h6: {
			fontWeight: '500',
			fontSize: '2rem',
			lineHeight: '1.6',
			letterSpacing: '0.012rem',
		},
		subtitle1: {
			fontWeight: '500',
			fontSize: '1em',
			lineHeight: '1.25',
			letterSpacing: '0.24rem',
		},
	},
};
