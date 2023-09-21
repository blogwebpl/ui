import {
	MdSettings as IconSettings,
	MdMap as IconMap,
	MdViewList as IconRecord,
} from 'react-icons/md';

import { BrowserRouter as Router } from 'react-router-dom';
import { Menu } from '../../components/atoms/Menu';

const menuItems = [
	{
		id: 'records',
		icon: IconRecord,
		label: 'Kartoteki',
		slug: '',
		children: [
			{
				id: 'vehicles',
				label: 'Kartoteka pojazdów',
				slug: '/vehicles',
			},
			{
				id: 'users',
				label: 'Kartoteka użytkowników',
				slug: '/users',
			},
		],
	},
	{
		id: 'settings',
		icon: IconSettings,
		label: 'Ustawienia',
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
		label: 'Mapa',
		slug: '/map',
		children: [],
	},
];

const Template = () => {
	return (
		<Router>
			<Menu items={menuItems} />
		</Router>
	);
};

export default {
	title: 'atoms/Menu',
	component: Template,
};

export const Default = {};
