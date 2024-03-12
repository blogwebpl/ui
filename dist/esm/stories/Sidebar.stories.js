import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs(Router, { children: [_jsx(AppBar, { handleProfileClick: () => { }, isDrawerOpen: false, isLoggedIn: true, title: "przewoznik.info", setIsDrawerOpen: () => { }, SidebarIcon: MdDirectionsCar, isSidebarOpen: isSidebarOpen, setIsSidebarOpen: setIsSidebarOpen, ActionIcon: TbRoad, handleActionClick: () => {
                    alert('action');
                } }), _jsx(Main, { isCovered: true, setIsDrawerOpen: () => { }, isDrawerOpen: false, children: "\u00A0" }), _jsx(Sidebar, { isSidebarOpen: isSidebarOpen, children: "..." })] }));
};
export default { component: Template, title: 'Sidebar' };
export const Default = {};
//# sourceMappingURL=Sidebar.stories.js.map