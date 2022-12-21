import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import { Select } from '../../components/atoms/Select';

export default {
	title: 'atoms/Select',
	component: Select,
	args: {},
} as ComponentMeta<typeof Select>;

const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' },
];

const Template: ComponentStory<typeof Select> = (args) => {
	const [value, setValue] = useState(null);
	return (
		<Select
			{...args}
			label="Select Field"
			isRequired={true}
			options={options}
			value={value}
			onChange={setValue}
		/>
	);
};

export const Default = Template.bind({});
export const MultiSelect = Template.bind({});
MultiSelect.args = { isMulti: true };
