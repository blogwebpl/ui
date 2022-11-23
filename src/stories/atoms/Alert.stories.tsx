import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Alert } from '../../components/atoms/Alert';

export default {
	title: 'atoms/Alert',
	component: Alert,
	args: {},
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = () => {
	return <Alert>Test Alert</Alert>;
};

export const Default = Template.bind({});
