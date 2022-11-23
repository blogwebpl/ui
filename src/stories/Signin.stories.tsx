import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Signin } from '../components/Signin';
import logo from '../assets/logo.svg';
import { Main } from '../components/atoms/Main';

const handleSubmit = ({ email, password }: { email: string; password: string }) => {
	console.log(email, password);
};

export default {
	title: 'Signin',
	component: Signin,
	args: { logo, handleSubmit },
} as ComponentMeta<typeof Signin>;

const Template: ComponentStory<typeof Signin> = (args) => {
	return (
		<Main isCovered={true} isDrawerOpen={false} setIsDrawerOpen={() => {}}>
			<Signin {...args} />
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
	alertText: 'Nieprawidłowy email lub hasło.',
};
