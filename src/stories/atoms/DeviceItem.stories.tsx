/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import { MdDirectionsCar } from 'react-icons/md';
import { BrowserRouter as Router } from 'react-router-dom';
import { TbRoad } from 'react-icons/tb';
import { AppBar } from '../../components/atoms/AppBar';

import { DeviceItem } from '../../components/atoms/DeviceItem';
import { Main } from '../../components/atoms/Main';
import { Sidebar } from '../../components/atoms/Sidebar';
import { devicesList } from './devicesList';

export default {
	title: 'atoms/DeviceItem',
	component: DeviceItem,
	args: {},
} as ComponentMeta<typeof DeviceItem>;

export const Default: ComponentStory<typeof DeviceItem> = () => {
	return (
		<DeviceItem
			id="123"
			vid="m3"
			name="Mazda"
			time={new Date()}
			show={false}
			handleShowClick={() => {}}
			handleNameClick={() => {}}
			handleFollowClick={() => {}}
			follow={false}
			info={false}
			handleInfoClick={() => {}}
			pos={[18, 53]}
		/>
	);
};

export const InSidebar: ComponentStory<typeof DeviceItem> = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [devices, setDevices] = useState(devicesList);

	const handleShowClick = (_id: string) => {
		const newDevices = [...devices];
		const index = newDevices.findIndex((device) => device._id === _id);
		newDevices[index].show = !newDevices[index].show;
		setDevices(newDevices);
	};

	const handleFollowClick = (_id: string) => {
		const newDevices = [...devices];
		const index = newDevices.findIndex((device) => device._id === _id);
		newDevices[index].follow = !newDevices[index].follow;
		setDevices(newDevices);
	};

	const handleInfoClick = (_id: string) => {
		const newDevices = [...devices];
		const index = newDevices.findIndex((device) => device._id === _id);
		newDevices[index].info = !newDevices[index].info;
		setDevices(newDevices);
	};

	return (
		<Router>
			<AppBar
				handleProfileClick={() => {}}
				isDrawerOpen={false}
				isLoggedin={true}
				isSidebarOpen={isSidebarOpen}
				setIsDrawerOpen={() => {}}
				setIsSidebarOpen={setIsSidebarOpen}
				SidebarIcon={MdDirectionsCar}
				title="przewoznik.info"
				ActionIcon={TbRoad}
				handleActionClick={() => {
					alert('action');
				}}
			/>
			<Main isCovered={true} setIsDrawerOpen={() => {}} isDrawerOpen={false}>
				&nbsp;
			</Main>
			<Sidebar isSidebarOpen={isSidebarOpen}>
				{devices.map((device) => (
					<DeviceItem
						follow={device.follow}
						handleFollowClick={handleFollowClick}
						handleInfoClick={handleInfoClick}
						handleNameClick={(vid: string) => alert(vid)}
						handleShowClick={handleShowClick}
						info={device.info}
						name={device.name}
						show={device.show}
						time={device.time}
						vid={device.vid}
						id={device._id}
						pos={[18, 53]}
						io={device.io}
					/>
				))}
			</Sidebar>
		</Router>
	);
};
