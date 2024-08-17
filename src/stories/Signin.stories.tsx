import { Login } from '../components/Login';
import logo from '../assets/logo.svg';
import { Main } from '../components/atoms/Main';

const handleSubmit = ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	console.log(email, password);
};

const Template = (args: any) => {
	return (
		<Main isCovered={true} isDrawerOpen={false} setIsDrawerOpen={() => {}}>
			<Login {...args} />
		</Main>
	);
};

export default { component: Template, title: 'Login' };
export const Default = { args: { logo, handleSubmit, isPending: false } };
export const WithoutLogo = {
	args: { logo: undefined, handleSubmit, isPending: false },
};
export const WithAlert = {
	args: {
		logo: undefined,
		handleSubmit,
		isPending: false,
		error: 'Brak komunikacji z serwerem.',
	},
};
