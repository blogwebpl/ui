import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
import { useState } from 'react';
import { MdDirectionsCar } from 'react-icons/md';
import { BrowserRouter as Router } from 'react-router-dom';
import { TbRoad } from 'react-icons/tb';
import { AppBar } from '../../components/atoms/AppBar';
import { DeviceItem } from '../../components/atoms/DeviceItem';
import { Main } from '../../components/atoms/Main';
import { Sidebar } from '../../components/atoms/Sidebar';
import { devicesList } from './devicesList';
export const Template = () => {
    return (_jsx(DeviceItem, { deviceId: "123", name: "Mazda", time: new Date(), show: false, handleShowClick: () => { }, handleNameClick: () => { }, handleFollowClick: () => { }, follow: false, info: false, handleInfoClick: () => { }, pos: [18, 53] }));
};
const InSidebarComponent = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [devices, setDevices] = useState(devicesList);
    const handleShowClick = (deviceId) => {
        const newDevices = [...devices];
        const index = newDevices.findIndex((device) => device.deviceId === deviceId);
        newDevices[index].show = !newDevices[index].show;
        setDevices(newDevices);
    };
    const handleFollowClick = (deviceId) => {
        const newDevices = [...devices];
        const index = newDevices.findIndex((device) => device.deviceId === deviceId);
        newDevices[index].follow = !newDevices[index].follow;
        setDevices(newDevices);
    };
    const handleInfoClick = (deviceId) => {
        const newDevices = [...devices];
        const index = newDevices.findIndex((device) => device.deviceId === deviceId);
        newDevices[index].info = !newDevices[index].info;
        setDevices(newDevices);
    };
    return (_jsxs(Router, { children: [_jsx(AppBar, { handleProfileClick: () => { }, isDrawerOpen: false, isLoggedIn: true, isSidebarOpen: isSidebarOpen, setIsDrawerOpen: () => { }, setIsSidebarOpen: setIsSidebarOpen, SidebarIcon: MdDirectionsCar, title: "przewoznik.info", ActionIcon: TbRoad, handleActionClick: () => {
                    alert('action');
                } }), _jsx(Main, { isCovered: true, setIsDrawerOpen: () => { }, isDrawerOpen: false, children: "\u00A0" }), _jsx(Sidebar, { isSidebarOpen: isSidebarOpen, children: devices.map((device) => (_jsx(DeviceItem, { follow: device.follow, handleFollowClick: handleFollowClick, handleInfoClick: handleInfoClick, handleNameClick: (vid) => alert(vid), handleShowClick: handleShowClick, info: device.info, name: device.name, show: device.show, time: device.time, deviceId: device.deviceId, pos: [18, 53], io: device.io }))) })] }));
};
export default {
    title: 'atoms/DeviceItem',
    component: InSidebarComponent,
};
export const Default = {};
//# sourceMappingURL=DeviceItem.stories.js.map