import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '../../components/atoms/Button';

export default {
	title: 'atoms/Button',
	component: Button,
	args: {
		label: 'Button',
		width: '250px',
		disabled: false,
		variant: 'primary',
	},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => {
	return <Button {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
	variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
	variant: 'secondary',
};

export const Accent = Template.bind({});
Accent.args = {
	variant: 'accent',
};
