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
		isSignIn: true,
	},
	argTypes: {
		isDrawerOpen: { control: false },
		isSignIn: { control: { type: 'boolean' } },
	},
} as ComponentMeta<typeof AppBar>;

export const Default: ComponentStory<typeof AppBar> = (args) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(args.isDrawerOpen);
	return (
		<AppBar
			{...args}
			handleProfileClick={() => {}}
			setIsDrawerOpen={setIsDrawerOpen}
			isDrawerOpen={isDrawerOpen}
		/>
	);
};

export const WithRightMenuIcon: ComponentStory<typeof AppBar> = (args) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(args.isDrawerOpen);
	const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
	return (
		<AppBar
			{...args}
			handleProfileClick={() => {}}
			setIsDrawerOpen={setIsDrawerOpen}
			isDrawerOpen={isDrawerOpen}
			SidebarIcon={MdDirectionsCar}
			isSideMenuOpen={isSideMenuOpen}
			setIsSidebarOpen={setIsSideMenuOpen}
		/>
	);
};
