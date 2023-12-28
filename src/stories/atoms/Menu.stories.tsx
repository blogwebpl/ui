import { BrowserRouter as Router } from 'react-router-dom';
import { MenuElement, Menu } from '../../components/atoms/Menu';

export const menuElements: MenuElement[] = [
	{
		id: 'records',
		icon: 'Record',
		label: {
			pl: 'Kartoteki',
			en: 'Records',
		},
		link: '',
		children: [
			{
				id: 'vehicles',
				label: { pl: 'Kartoteka pojazdów', en: 'Vehicles' },
				link: '/vehicles',
			},
			{
				id: 'users',
				label: { pl: 'Kartoteka użytkowników', en: 'Users' },
				link: '/users',
			},
		],
	},
	{
		id: 'settings',
		icon: 'Settings',
		label: { pl: 'Ustawienia', en: 'Settings' },
		link: '',
		children: [
			{
				id: 'users',
				label: { pl: 'Użytkownicy', en: 'Users' },
				link: '/users',
			},
			{
				id: 'roles',
				label: { pl: 'Grupy', en: 'Roles' },
				link: '/roles',
			},
		],
	},
	{
		id: 'map',
		icon: 'Map',
		label: { pl: 'Mapa', en: 'Map' },
		link: '/map',
		children: [],
	},
];

const Template = () => {
	return (
		<Router>
			<Menu menuElements={menuElements} language="en" />
		</Router>
	);
};

export default {
	title: 'atoms/Menu',
	component: Template,
};

export const Default = {};
