import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable no-alert */
// import {
// 	MdSettings as IconSettings,
// 	MdMap as IconMap,
// 	MdViewList as IconRecord,
// } from 'react-icons/md';
import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { TbRoad } from 'react-icons/tb';
import { Drawer } from '../components/Drawer';
// import { Item } from '../components/atoms/Menu';
import { Main } from '../components/atoms/Main';
import { AppBar } from '../components/atoms/AppBar';
import { menuElements } from './atoms/Menu.stories';
const Template = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };
    return (_jsxs(Router, { children: [_jsx(AppBar, { handleProfileClick: () => { }, isDrawerOpen: isDrawerOpen, isSidebarOpen: false, isLoggedIn: true, setIsDrawerOpen: setIsDrawerOpen, setIsSidebarOpen: () => { }, title: '', ActionIcon: TbRoad, handleActionClick: () => {
                    alert('action');
                } }), _jsx(Main, { isCovered: true, isDrawerOpen: isDrawerOpen, setIsDrawerOpen: setIsDrawerOpen, children: "\u00A0" }), _jsx(Drawer, { isDrawerOpen: isDrawerOpen, closeDrawer: closeDrawer, menuElements: menuElements, closeOnClick: true, language: "en" })] }));
};
export default { component: Template, title: 'Drawer' };
export const Default = {};
//# sourceMappingURL=Drawer.stories.js.map