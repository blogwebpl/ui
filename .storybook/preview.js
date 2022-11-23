import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../src/components/atoms/Theme/themes";
import { GlobalStyles } from "../src/components/atoms/Theme/globalStyles";
import { addDecorator } from '@storybook/react';
import { withThemes } from '@react-theming/storybook-addon';

addDecorator(s => <><GlobalStyles />{s()}</>);
addDecorator(withThemes(ThemeProvider, [defaultTheme]));


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
