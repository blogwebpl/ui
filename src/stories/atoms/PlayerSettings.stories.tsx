/* eslint-disable no-alert */
import { Main } from '../../components/atoms/Main';
import { devicesList } from './devicesList';
import { PlayerSettings } from '../../components/atoms/PlayerSettings';

const Template = () => {
	return (
		<Main isCovered={false} isDrawerOpen={false} setIsDrawerOpen={null}>
			<PlayerSettings
				devices={devicesList}
				onLoad={() => {
					alert('on load');
				}}
				onClose={() => {
					alert('on close');
				}}
			/>
		</Main>
	);
};

export default { component: Template, title: 'Atoms/PlayerSettings' };
export const Default = {};
