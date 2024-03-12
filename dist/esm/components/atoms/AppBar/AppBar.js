import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MdClose as CloseIcon, MdLock as LockIcon, MdMenu as MenuIcon, MdPerson as PersonIcon, } from 'react-icons/md';
import { IconButton } from '../IconButton';
import { Typography } from '../Typography';
import { StyledAppBar, StyledIconContainer, StyledTitleContainer } from './appBarStyle';
export function AppBar(props) {
    const handleMenuIconClick = () => {
        if (props.isLoggedIn && props.setIsDrawerOpen) {
            props.setIsDrawerOpen(!props.isDrawerOpen);
        }
    };
    const handleSidebarIconClick = () => {
        if (props.isLoggedIn && props.setIsSidebarOpen) {
            props.setIsSidebarOpen(!props.isSidebarOpen);
        }
    };
    return (_jsxs(StyledAppBar, { children: [_jsx(IconButton, { label: "", ariaLabel: "menu", isLightColor: true, margin: "0 1.6rem 0 -1.2rem", onClick: handleMenuIconClick, disabled: !props.isLoggedIn, children: props.isDrawerOpen ? _jsx(CloseIcon, { size: "2.4rem" }) : _jsx(MenuIcon, { size: "2.4rem" }) }), _jsx(StyledTitleContainer, { children: _jsx(Typography, { component: "h6", userSelect: "none", children: props.title }) }), _jsxs(StyledIconContainer, { children: [_jsx(IconButton, { label: "", ariaLabel: "profile", disabled: !props.isLoggedIn, isLightColor: true, onClick: props.handleProfileClick || (() => { }), children: props.isLoggedIn ? _jsx(PersonIcon, { size: "2.4rem" }) : _jsx(LockIcon, { size: "2.4rem" }) }), props.isLoggedIn && props.ActionIcon && (_jsx(IconButton, { label: "", ariaLabel: "action", isLightColor: true, onClick: props.handleActionClick, children: _jsx(props.ActionIcon, { size: "2.4rem" }) })), props.isLoggedIn && props.SidebarIcon && (_jsx(IconButton, { label: "", "data-label": "sidebar", isLightColor: true, onClick: handleSidebarIconClick, children: props.isSidebarOpen ? (_jsx(CloseIcon, { size: "2.4rem" })) : (_jsx(props.SidebarIcon, { size: "2.4rem" })) }))] })] }));
}
//# sourceMappingURL=AppBar.js.map