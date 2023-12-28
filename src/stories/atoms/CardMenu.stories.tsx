/* eslint-disable no-alert */

import { CardMenu, ICardMenuItem } from '../../components/atoms/CardMenu';

const items: ICardMenuItem[] = [
	{
		id: 'person',
		icon: 'Person',
		label: { en: 'Person Link', pl: 'Person Link' },
		onClick: () => alert('Person'),
	},
	{
		id: 'lock',
		icon: 'Lock',
		label: { en: 'Lock Link', pl: 'Lock Link' },
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
