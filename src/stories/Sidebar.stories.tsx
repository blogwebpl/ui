/* eslint-disable no-alert */
import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MdDirectionsCar } from 'react-icons/md';
import { TbRoad } from 'react-icons/tb';
import { Sidebar } from '../components/atoms/Sidebar';
import { AppBar } from '../components/atoms/AppBar';
import { Main } from '../components/atoms/Main';

const Template = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	return (
		<Router>
			<AppBar
				handleProfileClick={() => {}}
				isDrawerOpen={false}
				isLoggedIn={true}
				title="przewoznik.info"
				setIsDrawerOpen={() => {}}
				SidebarIcon={MdDirectionsCar}
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
				ActionIcon={TbRoad}
				handleActionClick={() => {
					alert('action');
				}}
			/>
			<Main isCovered={true} setIsDrawerOpen={() => {}} isDrawerOpen={false}>
				&nbsp;
			</Main>
			<Sidebar isSidebarOpen={isSidebarOpen}>...</Sidebar>
		</Router>
	);
};

export default { component: Template, title: 'Sidebar' };
export const Default = {};
