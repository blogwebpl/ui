/* eslint-disable no-alert */
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { useState } from 'react';
import { Profile } from '../components/Profile';
import { Main } from '../components/atoms/Main';

export default {
	title: 'Profile',
	component: Profile,
	args: {},
} as ComponentMeta<typeof Profile>;

const roles = [
	{ value: '1', label: 'Admin' },
	{ value: '2', label: 'User' },
];

const email = 'tomek@blogweb.pl';

const Template: ComponentStory<typeof Profile> = () => {
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
				onChange={handleRoleChange}
				email={email}
				changePassword={handleChangePassword}
				logout={handleLogout}
			/>
		</Main>
	);
};

export const Default = Template.bind({});
