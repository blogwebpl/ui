/* eslint-disable no-alert */
import { ChangePassword } from '../components/ChangePassword';
import { Main } from '../components/atoms/Main';

const email = 'tomek@blogweb.pl';

const Template = () => {
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

export default { component: Template, title: 'ChangePassword' };
export const Default = {};
