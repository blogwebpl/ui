import { Button } from '../../components/atoms/Button';

const Template = (args: any) => {
	return <Button {...args} />;
};

export default {
	title: 'atoms/Button',
	component: Template,
};

export const Default = {
	args: {
		label: 'Button',
		width: '25rem',
		disabled: false,
		variant: 'primary',
	},
};

export const Primary = {
	args: {
		variant: 'primary',
	},
};

export const Secondary = {
	args: {
		variant: 'secondary',
	},
};

export const Accent = {
	args: {
		variant: 'accent',
	},
};
