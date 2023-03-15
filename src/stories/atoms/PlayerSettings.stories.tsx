import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Main } from '../../components/atoms/Main';
import { devicesList } from './devicesList';
import { PlayerSettings } from '../../components/atoms/PlayerSettings';

export default {
	title: 'atoms/PlayerSettings',
	component: PlayerSettings,
	args: {},
} as ComponentMeta<typeof PlayerSettings>;

const Template: ComponentStory<typeof PlayerSettings> = () => {
	return (
		<Main isCovered={false} isDrawerOpen={false} setIsDrawerOpen={undefined}>
			<PlayerSettings devices={devicesList} />
		</Main>
	);
};

export const Default = Template.bind({});
