import { LoginModern } from '../components/LoginModern';
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
			<LoginModern {...args} />
		</Main>
	);
};

export default { component: Template, title: 'LoginModern' };
export const Default = { args: { logo, handleSubmit, isPending: false } };

export const WithAlert = {
	args: {
		logo,
		handleSubmit,
		isPending: false,
		signInError: 'Podano nieprawidłowy e-mail lub hasło.',
	},
};
