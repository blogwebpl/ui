import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SignIn } from '../components/SignIn';
import logo from '../assets/logo.svg';
import { Main } from '../components/atoms/Main';

const handleSubmit = ({ email, password }: { email: string; password: string }) => {
	console.log(email, password);
};

export default {
	title: 'SignIn',
	component: SignIn,
	args: { logo, handleSubmit, isLoading: false },
} as ComponentMeta<typeof SignIn>;

const Template: ComponentStory<typeof SignIn> = (args) => {
	return (
		<Main isCovered={true} isDrawerOpen={false} setIsDrawerOpen={() => {}}>
			<SignIn {...args} />
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
