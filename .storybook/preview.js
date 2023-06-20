import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../src/components/atoms/Theme/themes';
import { GlobalStyles } from '../src/components/atoms/Theme/globalStyles';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};

export const decorators = [
	withThemeFromJSXProvider({
		themes: {
		  light: defaultTheme,		  
		},
		Provider: ThemeProvider,
		GlobalStyles,
	}),
];
