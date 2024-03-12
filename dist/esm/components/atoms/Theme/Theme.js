import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './themes';
import { GlobalStyles } from './globalStyles';
export function Theme({ children }) {
    return (_jsxs(ThemeProvider, { theme: defaultTheme, children: [_jsx(GlobalStyles, {}), children] }));
}
//# sourceMappingURL=Theme.js.map