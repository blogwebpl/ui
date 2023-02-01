import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MdSettings as IconSettings, MdMap as IconMap } from 'react-icons/md';
import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Drawer } from '../components/Drawer';
import { Item } from '../components/atoms/Menu';
import { Main } from '../components/atoms/Main';
import { AppBar } from '../components/atoms/AppBar';

export default {
	title: 'Drawer',
	component: Drawer,
	args: {},
} as ComponentMeta<typeof Drawer>;

const menuItems: Item[] = [
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

const Template: ComponentStory<typeof Drawer> = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(true);
	const closeDrawer = () => {
		setIsDrawerOpen(false);
	};
	return (
		<Router>
			<AppBar
				handleProfileClick={() => {}}
				isDrawerOpen={isDrawerOpen}
				isSidebarOpen={false}
				isLogin={true}
				setIsDrawerOpen={setIsDrawerOpen}
				setIsSidebarOpen={() => {}}
				title={''}
			/>
			<Main isCovered={true} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}>
				&nbsp;
			</Main>
			<Drawer
				isDrawerOpen={isDrawerOpen}
				closeDrawer={closeDrawer}
				menuItems={menuItems}
				closeOnClick={true}
			/>
		</Router>
	);
};

export const Default = Template.bind({});
