import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MdPerson } from 'react-icons/md';
import { IconButton } from '../../components/atoms/IconButton';

export default {
	title: 'atoms/IconButton',
	component: IconButton,
	args: {},
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = () => {
	return (
		<IconButton color="#000000">
			<MdPerson size={24} />
		</IconButton>
	);
};

export const Default = Template.bind({});
Default.args = {};
