/* eslint-disable no-alert */

import { useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import { Profile } from '../components/Profile';
import { Main } from '../components/atoms/Main';
import { SelectOption } from '../components/atoms/Select';

const roles = [
	{ value: '1', label: 'Admin' },
	{ value: '2', label: 'User' },
];

const email = 'tomek@blogweb.pl';

const Template = () => {
	const [role, setRole] = useState(roles[1]);

	const handleRoleChange = (newRole: { value: string; label: string }) => {
		setRole(newRole);
	};

	const handleChangePassword = () => {
		alert('Change password.');
	};

	const handleLogout = () => {
		alert('Logout');
	};

	return (
		<Main isCovered={true} isDrawerOpen={false} setIsDrawerOpen={() => {}}>
			<Profile
				roles={roles}
				role={role}
				onChange={(newValue: MultiValue<SelectOption> | SingleValue<SelectOption>) =>
					handleRoleChange(newValue as SelectOption)
				}
				email={email}
				changePassword={handleChangePassword}
				logout={handleLogout}
			/>
		</Main>
	);
};

export default { component: Template, title: 'Profile' };
export const Default = {};
