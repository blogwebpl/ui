import { Card } from '../../components/atoms/Card';

const Template = (args: any) => {
	return <Card {...args}> </Card>;
};

export default {
	title: 'atoms/Card',
	component: Template,
};

export const Default = { args: { minWidth: '32rem', padding: true } };
