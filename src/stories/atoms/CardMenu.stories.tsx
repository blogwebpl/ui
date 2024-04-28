/* eslint-disable no-alert */

import { CardMenu } from '../../components/atoms/CardMenu';
import { Action } from '../../components/atoms/Tools';
import {
	MdPerson as IconPerson,
	MdLock as IconLock,
} from 'react-icons/md';

const items: Action[] = [
	{
		id: 'person',
		icon: IconPerson,
		hint: { en: 'Person Link', pl: 'Person Link' },
		onClick: () => alert('Person'),
	},
	{
		id: 'lock',
		icon: IconLock,
		hint: { en: 'Lock Link', pl: 'Lock Link' },
		onClick: () => alert('Lock'),
	},
];

const Template = () => {
	return <CardMenu items={items} language="pl" />;
};

export default {
	title: 'atoms/CardMenu',
	component: Template,
};

export const Default = {};
