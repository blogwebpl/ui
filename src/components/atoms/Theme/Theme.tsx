import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './themes';
import { GlobalStyles } from './globalStyles';

interface ThemeProps {
	children: React.ReactNode;
}

export function Theme({ children }: ThemeProps) {
	return (
		<ThemeProvider theme={defaultTheme}>
			<GlobalStyles />
			{children}
		</ThemeProvider>
	);
}
