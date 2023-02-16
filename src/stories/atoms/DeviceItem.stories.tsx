/* eslint-disable no-alert */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import { MdDirectionsCar } from 'react-icons/md';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppBar } from '../../components/atoms/AppBar';

import { Device, DeviceItem } from '../../components/atoms/DeviceItem';
import { Main } from '../../components/atoms/Main';
import { Sidebar } from '../../components/atoms/Sidebar';

export default {
	title: 'atoms/DeviceItem',
	component: DeviceItem,
	args: {},
} as ComponentMeta<typeof DeviceItem>;

export const Default: ComponentStory<typeof DeviceItem> = () => {
	return (
		<DeviceItem
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
		/>
	);
};

const devicesList: Device[] = [
	{
		_id: '',
		vid: 'oa',
		name: 'Opel',
		time: new Date(),
		show: false,
		follow: false,
		info: false,
		gps: {},
		io: {},
		st: new Date(),
	},
	{
		_id: '',
		vid: 'm3',
		name: 'Mazda',
		time: new Date(),
		show: false,
		follow: false,
		info: false,
		gps: {},
		io: {},
		st: new Date(),
	},
];

export const InSidebar: ComponentStory<typeof DeviceItem> = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [devices, setDevices] = useState(devicesList);

	const handleShowClick = (vid: string) => {
		const newDevices = [...devices];
		const index = newDevices.findIndex((device) => device.vid === vid);
		newDevices[index].show = !newDevices[index].show;
		setDevices(newDevices);
	};

	const handleFollowClick = (vid: string) => {
		const newDevices = [...devices];
		const index = newDevices.findIndex((device) => device.vid === vid);
		newDevices[index].follow = !newDevices[index].follow;
		setDevices(newDevices);
	};

	const handleInfoClick = (vid: string) => {
		const newDevices = [...devices];
		const index = newDevices.findIndex((device) => device.vid === vid);
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
					/>
				))}
			</Sidebar>
		</Router>
	);
};
