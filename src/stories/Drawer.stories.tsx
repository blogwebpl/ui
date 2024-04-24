import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react';
import { TbRoad } from 'react-icons/tb';
import { Drawer } from '../components/Drawer';
import { Main } from '../components/atoms/Main';
import { AppBar } from '../components/atoms/AppBar';
import { menuElements } from './atoms/Menu.stories';

const meta: Meta<typeof Drawer> = {
	title: 'Drawer',
	component: Drawer,
};

export default meta;

const Template: StoryObj<typeof Drawer> = {
	render: (args) => {
		const [isDrawerOpen, setIsDrawerOpen] = useState(true);
		const closeDrawer = () => setIsDrawerOpen(false);

		return (
			<Router>
				<AppBar
					handleProfileClick={() => {}}
					isDrawerOpen={isDrawerOpen}
					isSidebarOpen={false}
					isLoggedIn={true}
					setIsDrawerOpen={setIsDrawerOpen}
					setIsSidebarOpen={() => {}}
					title=""
					ActionIcon={TbRoad}
					handleActionClick={() => alert('action')}
				/>
				<Main isCovered={true} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}>
          &nbsp;
				</Main>
				<Drawer
					{...args}
					isDrawerOpen={isDrawerOpen}
					closeDrawer={closeDrawer}
					menuElements={menuElements}
					closeOnClick={true}
					language="en"
				/>
			</Router>
		);
	},
	args: {
		// Domyślne argumenty
	},
};

export const DefaultDrawer: StoryObj<typeof Drawer> = Template;
