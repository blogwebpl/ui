import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Card } from '../../components/atoms/Card';

export default {
	title: 'atoms/Card',
	component: Card,
	args: { minWidth: '32rem', padding: true },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => {
	return <Card {...args}> </Card>;
};

export const Default = Template.bind({});
