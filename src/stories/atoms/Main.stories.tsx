import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Main } from '../../components/atoms/Main';

export default {
	title: 'atoms/Main',
	component: Main,
	args: {
		isDrawerOpen: false,
		isCovered: true,
	},
} as ComponentMeta<typeof Main>;

const Template: ComponentStory<typeof Main> = (args) => {
	return <Main {...args}>{args.children}</Main>;
};

export const Default = Template.bind({});
