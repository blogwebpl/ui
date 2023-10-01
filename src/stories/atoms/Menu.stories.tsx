import {
	MdSettings as IconSettings,
	MdMap as IconMap,
	MdViewList as IconRecord,
} from 'react-icons/md';

import { BrowserRouter as Router } from 'react-router-dom';
import { Menu } from '../../components/atoms/Menu';

export const menuItems = [
	{
		id: 'records',
		icon: IconRecord,
		label: {
			pl: 'Kartoteki',
			en: 'Records',
		},
		slug: '',
		children: [
			{
				id: 'vehicles',
				label: { pl: 'Kartoteka pojazdów', en: 'Vehicles' },
				slug: '/vehicles',
			},
			{
				id: 'users',
				label: { pl: 'Kartoteka użytkowników', en: 'Users' },
				slug: '/users',
			},
		],
	},
	{
		id: 'settings',
		icon: IconSettings,
		label: { pl: 'Ustawienia', en: 'Settings' },
		slug: '',
		children: [
			{
				id: 'users',
				label: 'Użytkownicy',
				slug: '/users',
			},
			{
				id: 'roles',
				label: 'Grupy',
				slug: '/roles',
			},
		],
	},
	{
		id: 'map',
		icon: IconMap,
		label: { pl: 'Mapa', en: 'Map' },
		slug: '/map',
		children: [],
	},
];

const Template = () => {
	return (
		<Router>
			<Menu items={menuItems} language="en" />
		</Router>
	);
};

export default {
	title: 'atoms/Menu',
	component: Template,
};

export const Default = {};
