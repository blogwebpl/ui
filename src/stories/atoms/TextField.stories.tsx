import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import { MdSearch as SearchIcon } from 'react-icons/md';
import { Card } from '../../components/atoms/Card';
import { Main } from '../../components/atoms/Main';

import { TextField } from '../../components/atoms/TextField';

const withContainer = (StoryFn: any) => {
	return (
		<div style={{ maxWidth: '320px' }}>
			<StoryFn />
		</div>
	);
};

export default {
	title: 'atoms/TextField',
	component: TextField,
	args: {
		label: 'Field',
		required: true,
	},
	decorators: [withContainer],
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => {
	const [value, setValue] = useState('');
	return (
		<Main isCovered={false} isDrawerOpen={false} setIsDrawerOpen={undefined}>
			<Card minWidth="420px" padding={true}>
				<TextField {...args} value={value || args.value} setValue={setValue} />
			</Card>
		</Main>
	);
};

export const Text = Template.bind({});
Text.args = { type: 'text' };

export const Password = Template.bind({});
Password.args = { type: 'password' };

export const Number = Template.bind({});
Number.args = { type: 'number' };

export const WithIcon = Template.bind({});
WithIcon.args = { type: 'text', icon: SearchIcon };

export const Slim = Template.bind({});
Slim.args = { type: 'text', slim: true, icon: SearchIcon };

export const Disabled = Template.bind({});
Disabled.args = { type: 'text', disabled: true, value: 'Text in disabled' };
