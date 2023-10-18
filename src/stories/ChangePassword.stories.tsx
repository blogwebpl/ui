/* eslint-disable no-alert */
import { ChangePassword } from '../components/ChangePassword';
import { Main } from '../components/atoms/Main';

const email = 'tomek@blogweb.pl';

const Template = () => {
	const handleChangePassword = async (password: string): Promise<boolean> => {
		console.log(password);
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(true);
			}, 1000);
		});
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
			/>
		</Main>
	);
};

export default { component: Template, title: 'ChangePassword' };
export const Default = {};
