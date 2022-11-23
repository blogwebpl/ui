import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Checkbox } from '../../components/atoms/Checkbox';

export default {
	title: 'atoms/Checkbox',
	component: Checkbox,
	args: {},
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => {
	return <Checkbox {...args} />;
};

export const Default = Template.bind({});
Default.args = {
	label: 'Default label',
};

export const Checked = Template.bind({});
Checked.args = { checked: true, label: 'Default label' };

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {};
