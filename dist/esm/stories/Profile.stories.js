import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable no-alert */
import { useState } from 'react';
import { Profile } from '../components/Profile';
import { Main } from '../components/atoms/Main';
const roles = [
    { value: '1', label: 'Admin' },
    { value: '2', label: 'User' },
];
const email = 'tomek@blogweb.pl';
const Template = () => {
    const [role, setRole] = useState(roles[1]);
    const handleRoleChange = (newRole) => {
        setRole(newRole);
    };
    const handleChangePassword = () => {
        alert('Change password.');
    };
    const handleLogout = () => {
        alert('Logout');
    };
    return (_jsx(Main, { isCovered: true, isDrawerOpen: false, setIsDrawerOpen: () => { }, children: _jsx(Profile, { roles: roles, role: role, onChange: (newValue) => handleRoleChange(newValue), email: email, changePassword: handleChangePassword, logout: handleLogout }) }));
};
export default { component: Template, title: 'Profile' };
export const Default = {};
//# sourceMappingURL=Profile.stories.js.map