import { MenuEditor, IMenuItem, IMenu } from '../components/MenuEditor';

export const menuItems: IMenuItem[] = [
	{
		id: '6502e7f2a9c5fc31bb21f453',
		link: '/roles',
		label: {
			en: 'Roles',
			pl: 'Grupy',
		},
		icon: null,
	},
	{
		id: '6502e7f2a9c5fc31bb21f452',
		link: '/users',
		label: {
			en: 'Users',
			pl: 'Użytkownicy',
		},
		icon: null,
	},
	{
		id: '6502e7f2a9c5fc31bb21f451',
		link: null,
		label: {
			en: 'Settings',
			pl: 'Ustawienia',
		},
		icon: 'settings',
	},
	{
		id: '6502e827a9c5fc31bb21f454',
		link: '/map',
		label: {
			en: 'Map',
			pl: 'Mapa',
		},
		icon: 'map',
	},
];

export const menu: IMenu = {
	id: '6502e9f8a9c5fc31bb21f455',
	name: 'Admin menu',
	menuItems: [
		{
			item: '6502e7f2a9c5fc31bb21f451',
		},
		{
			parent: '6502e7f2a9c5fc31bb21f451',
			item: '6502e7f2a9c5fc31bb21f452',
		},
		{
			parent: '6502e7f2a9c5fc31bb21f451',
			item: '6502e7f2a9c5fc31bb21f453',
		},
		{
			item: '6502e827a9c5fc31bb21f454',
		},
	],
};

const Template = () => {
	return <MenuEditor menuItems={menuItems} menu={menu} language="pl" />;
};

export default { component: Template, title: 'MenuEditor' };
export const Default = { args: {} };
