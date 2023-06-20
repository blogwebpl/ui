export const defaultTheme = {
	name: 'lightTheme',
	breakpoints: {
		xs: '480px',
		sm: '768px',
		md: '1024px',
		lg: '1200px',
		xl: '1920px',
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
		'0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
		'0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
		'0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
	],
	shape: {
		borderRadious: '4px',
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
