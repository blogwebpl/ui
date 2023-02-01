/* eslint-disable no-alert */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import { MdDirectionsCar } from 'react-icons/md';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppBar } from '../../components/atoms/AppBar';

import { DeviceItem } from '../../components/atoms/DeviceItem';
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
			date={new Date()}
			checked={false}
			toggleChecked={() => {}}
			onClick={() => {}}
			toggleCenter={() => {}}
			center={false}
		/>
	);
};

interface Device {
	vid: string;
	name: string;
	date: Date;
	checked: boolean;
	center: boolean;
}

const devicesList: Device[] = [
	{ vid: 'oa', name: 'Opel', date: new Date(), checked: false, center: false },
	{ vid: 'm3', name: 'Mazda', date: new Date(), checked: false, center: false },
];

export const InSidebar: ComponentStory<typeof DeviceItem> = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [devices, setDevices] = useState(devicesList);

	const handleToggleChecked = (vid: string) => {
		const newDevices = [...devices];
		const index = newDevices.findIndex((device) => device.vid === vid);
		newDevices[index].checked = !newDevices[index].checked;
		setDevices(newDevices);
	};

	const handleToggleCenter = (vid: string) => {
		const newDevices = [...devices];
		const index = newDevices.findIndex((device) => device.vid === vid);
		newDevices[index].center = !newDevices[index].center;
		setDevices(newDevices);
	};

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
			<Sidebar isSidebarOpen={isSidebarOpen}>
				{devices.map((device) => (
					<DeviceItem
						vid={device.vid}
						name={device.name}
						date={device.date}
						checked={device.checked}
						toggleChecked={handleToggleChecked}
						onClick={(vid: string) => alert(vid)}
						toggleCenter={handleToggleCenter}
						center={device.center}
					/>
				))}
			</Sidebar>
		</Router>
	);
};
