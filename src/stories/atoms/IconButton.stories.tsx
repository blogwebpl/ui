import { MdPerson } from 'react-icons/md';
import { IconButton } from '../../components/atoms/IconButton';

const Template = () => {
	return (
		<IconButton color="#000000" label="person" ariaLabel="person">
			<MdPerson size="2.4rem" />
		</IconButton>
	);
};

export default {
	title: 'atoms/IconButton',
	component: Template,
};

export const Default = {};
