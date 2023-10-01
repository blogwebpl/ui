/* eslint-disable no-alert */
// import {
// 	MdSettings as IconSettings,
// 	MdMap as IconMap,
// 	MdViewList as IconRecord,
// } from 'react-icons/md';
import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { TbRoad } from 'react-icons/tb';
import { Drawer } from '../components/Drawer';
// import { Item } from '../components/atoms/Menu';
import { Main } from '../components/atoms/Main';
import { AppBar } from '../components/atoms/AppBar';
import { menuItems } from './atoms/Menu.stories';

// const menuItems: Item[] = [
// 	{
// 		id: 'records',
// 		icon: IconRecord,
// 		label: 'Kartoteki',
// 		slug: '',
// 		children: [
// 			{
// 				id: 'vehicles',
// 				label: 'Kartoteka pojazdów',
// 				slug: '/vehicles',
// 			},
// 			{
// 				id: 'users',
// 				label: 'Kartoteka użytkowników',
// 				slug: '/users',
// 			},
// 		],
// 	},
// 	{
// 		id: 'settings',
// 		icon: IconSettings,
// 		label: 'Ustawienia',
// 		slug: '',
// 		children: [
// 			{
// 				id: 'users',
// 				label: 'Użytkownicy',
// 				slug: '/users',
// 			},
// 			{
// 				id: 'roles',
// 				label: 'Grupy',
// 				slug: '/roles',
// 			},
// 		],
// 	},
// 	{
// 		id: 'map',
// 		icon: IconMap,
// 		label: 'Mapa',
// 		slug: '/map',
// 		children: [],
// 	},
// ];

const Template = () => {
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
				isLoggedIn={true}
				setIsDrawerOpen={setIsDrawerOpen}
				setIsSidebarOpen={() => {}}
				title={''}
				ActionIcon={TbRoad}
				handleActionClick={() => {
					alert('action');
				}}
			/>
			<Main isCovered={true} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}>
				&nbsp;
			</Main>
			<Drawer
				isDrawerOpen={isDrawerOpen}
				closeDrawer={closeDrawer}
				menuItems={menuItems}
				closeOnClick={true}
				language="en"
			/>
		</Router>
	);
};

export default { component: Template, title: 'Drawer' };
export const Default = {};
