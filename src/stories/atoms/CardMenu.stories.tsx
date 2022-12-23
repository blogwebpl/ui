/* eslint-disable no-alert */
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MdPerson as IconPerson, MdLock as IconLock } from 'react-icons/md';
import { CardMenu } from '../../components/atoms/CardMenu';

export default {
	title: 'atoms/CardMenu',
	component: CardMenu,
	args: {},
} as ComponentMeta<typeof CardMenu>;

const options = [
	{ id: 'person', icon: IconPerson, label: 'Person Link', onClick: () => alert('Person') },
	{ id: 'lock', icon: IconLock, label: 'Lock Link', onClick: () => alert('Lock') },
];

const Template: ComponentStory<typeof CardMenu> = () => {
	return <CardMenu options={options} />;
};

export const Default = Template.bind({});
Default.args = {};
