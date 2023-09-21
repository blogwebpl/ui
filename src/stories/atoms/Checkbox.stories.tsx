import { Checkbox } from '../../components/atoms/Checkbox';

const Template = (args: any) => <Checkbox {...args} />;

export default {
	title: 'atoms/Checkbox',
	component: Template,
};

export const Default = {
	args: {
		label: 'Default label',
	},
};

export const Checked = { args: { checked: true, label: 'Default label' } };

export const WithoutLabel = {};
