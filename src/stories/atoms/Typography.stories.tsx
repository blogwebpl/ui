import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Typography } from '../../components/atoms/Typography';

export default {
	title: 'atoms/Typography',
	component: Typography,
	args: {},
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (args) => {
	return <Typography {...args}>{args.children}</Typography>;
};

export const H6 = Template.bind({});
H6.args = { component: 'h6', children: 'Test Typography H6', color: '#000000' };
