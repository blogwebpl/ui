import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Profile } from '../components/Profile';
import { Main } from '../components/atoms/Main';

export default {
	title: 'Profile',
	component: Profile,
	args: {},
} as ComponentMeta<typeof Profile>;

const Template: ComponentStory<typeof Profile> = () => {
	return (
		<Main isCovered={true} isDrawerOpen={false} setIsDrawerOpen={() => {}}>
			<Profile />
		</Main>
	);
};

export const Default = Template.bind({});
