import { Main } from '../../components/atoms/Main';

const Template = (args: any) => {
	return <Main {...args}>{args.children}</Main>;
};

export default {
	title: 'atoms/Main',
	component: Template,
};

export const Default = {
	args: {
		isDrawerOpen: false,
		isCovered: true,
	},
};
