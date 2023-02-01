/* eslint-disable no-alert */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';

import { MdDirectionsCar } from 'react-icons/md';
import { AppBar } from '../../components/atoms/AppBar';

export default {
	title: 'atoms/AppBar',
	component: AppBar,
	args: {
		title: 'przewoznik.info',
		isDrawerOpen: false,
		isLoggedin: true,
	},
	argTypes: {
		isDrawerOpen: { control: false },
		isLoggedin: { control: { type: 'boolean' } },
	},
} as ComponentMeta<typeof AppBar>;

export const Default: ComponentStory<typeof AppBar> = (args) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(args.isDrawerOpen);
	return (
		<AppBar
			{...args}
			handleProfileClick={() => {
				alert('profile');
			}}
			setIsDrawerOpen={setIsDrawerOpen}
			isDrawerOpen={isDrawerOpen}
		/>
	);
};

export const WithRightMenuIcon: ComponentStory<typeof AppBar> = (args) => {
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
		/>
	);
};
