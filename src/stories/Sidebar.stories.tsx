import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MdDirectionsCar } from 'react-icons/md';
import { Sidebar } from '../components/atoms/Sidebar';
import { AppBar } from '../components/atoms/AppBar';
import { Main } from '../components/atoms/Main';

export default {
	title: 'Sidebar',
	component: Sidebar,
	args: {},
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	return (
		<Router>
			<AppBar
				handleProfileClick={() => {}}
				isDrawerOpen={false}
				isLogin={true}
				title="przewoznik.info"
				setIsDrawerOpen={() => {}}
				SidebarIcon={MdDirectionsCar}
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
			/>
			<Main isCovered={true} setIsDrawerOpen={() => {}} isDrawerOpen={false}>
				&nbsp;
			</Main>
			<Sidebar isSidebarOpen={isSidebarOpen}>...</Sidebar>
		</Router>
	);
};

export const Default = Template.bind({});
