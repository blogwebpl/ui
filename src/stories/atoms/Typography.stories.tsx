import { Typography } from '../../components/atoms/Typography';

const Template = (args: any) => {
	return <Typography {...args}>{args.children}</Typography>;
};

export default { component: Template, title: 'Atoms/Typography' };
export const H6 = { args: { component: 'h6', children: 'Test Typography H6', color: '#000000' } };
