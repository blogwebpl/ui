module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@react-theming/storybook-addon',
		'@storybook/addon-a11y',
		'@storybook/addon-styling',
		{
			name: '@storybook/addon-styling',
			options: {},
		},
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	docs: {
		autodocs: true,
	},
	webpackFinal: async (config, { configType }) => {
		config.mode = configType === 'DEVELOPMENT' ? 'development' : 'production';
		return config;
	  },
};
