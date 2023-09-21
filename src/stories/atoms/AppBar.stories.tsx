/* eslint-disable no-alert */
import { useState } from 'react';

import { MdDirectionsCar } from 'react-icons/md';
import { TbRoad } from 'react-icons/tb';

import { AppBar } from '../../components/atoms/AppBar';

// const Default = (args: any) => {
// 	const [isDrawerOpen, setIsDrawerOpen] = useState(args.isDrawerOpen);
// 	return (
// 		<AppBar
// 			{...args}
// 			handleProfileClick={() => {
// 				alert('profile');
// 			}}
// 			setIsDrawerOpen={setIsDrawerOpen}
// 			isDrawerOpen={isDrawerOpen}
// 		/>
// 	);
// };

const WithRightMenuIcon = (args: any) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(args.isDrawerOpen);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	return (
		<AppBar
			{...args}
			handleProfileClick={() => alert('profile')}
			setIsDrawerOpen={setIsDrawerOpen}
			isDrawerOpen={isDrawerOpen}
			SidebarIcon={MdDirectionsCar}
			isSidebarOpen={isSidebarOpen}
			setIsSidebarOpen={setIsSidebarOpen}
			ActionIcon={TbRoad}
			handleActionClick={() => {
				alert('action');
			}}
		/>
	);
};

export default {
	title: 'atoms/AppBar',
	component: WithRightMenuIcon,

	argTypes: {
		isDrawerOpen: { control: false },
		isLoggedIn: { control: { type: 'boolean' } },
	},
};

export const Default = {
	args: {
		title: 'przewoznik.info',
		isDrawerOpen: false,
		isLoggedIn: true,
	},
};
