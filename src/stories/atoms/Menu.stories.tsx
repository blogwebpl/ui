import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MdSettings as IconSettings, MdMap as IconMap } from 'react-icons/md';
import { BrowserRouter as Router } from 'react-router-dom';
import { Menu } from '../../components/atoms/Menu';

export default {
	title: 'atoms/Menu',
	component: Menu,
	args: {},
} as ComponentMeta<typeof Menu>;

const menuItems = [
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

const Template: ComponentStory<typeof Menu> = () => {
	return (
		<Router>
			<Menu items={menuItems} />
		</Router>
	);
};

export const Default = Template.bind({});
