/* eslint-disable no-alert */

import { MdPerson as IconPerson, MdLock as IconLock } from 'react-icons/md';
import { CardMenu, MenuItem } from '../../components/atoms/CardMenu';

const items: MenuItem[] = [
	{ id: 'person', icon: IconPerson, label: 'Person Link', onClick: () => alert('Person') },
	{ id: 'lock', icon: IconLock, label: 'Lock Link', onClick: () => alert('Lock') },
];

const Template = () => {
	return <CardMenu items={items} />;
};

export default {
	title: 'atoms/CardMenu',
	component: Template,
};

export const Default = {};
