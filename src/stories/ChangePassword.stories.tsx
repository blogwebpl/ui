/* eslint-disable no-alert */
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ChangePassword } from '../components/ChangePassword';
import { Main } from '../components/atoms/Main';

export default {
	title: 'ChangePassword',
	component: ChangePassword,
	args: {},
} as ComponentMeta<typeof ChangePassword>;

const email = 'tomek@blogweb.pl';

const Template: ComponentStory<typeof ChangePassword> = () => {
	const handleChangePassword = (password: string) => {
		alert(`Change password ${password}`);
	};
	const handleCancel = () => {
		alert('Change cancel');
	};

	return (
		<Main isCovered={true} isDrawerOpen={false} setIsDrawerOpen={() => {}}>
			<ChangePassword
				onSubmit={handleChangePassword}
				onCancel={handleCancel}
				email={email}
				error=""
				isLoading={false}
			/>
		</Main>
	);
};

export const Default = Template.bind({});
