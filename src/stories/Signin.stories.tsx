import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Login } from '../components/Login';
import logo from '../assets/logo.svg';
import { Main } from '../components/atoms/Main';

const handleSubmit = ({ email, password }: { email: string; password: string }) => {
	console.log(email, password);
};

export default {
	title: 'Login',
	component: Login,
	args: { logo, handleSubmit, isLoading: false },
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = (args) => {
	return (
		<Main isCovered={true} isDrawerOpen={false} setIsDrawerOpen={() => {}}>
			<Login {...args} />
		</Main>
	);
};

export const Default = Template.bind({});

export const WithoutLogo = Template.bind({});
WithoutLogo.args = {
	logo: undefined,
};

export const WithAlert = Template.bind({});
WithAlert.args = {
	isLoading: false,
	error: 'Brak komunikacji z serwerem.',
};
