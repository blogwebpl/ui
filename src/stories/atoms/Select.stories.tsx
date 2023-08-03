import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import { Card } from '../../components/atoms/Card';
import { Main } from '../../components/atoms/Main';
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
		<Main isCovered={false} isDrawerOpen={false} setIsDrawerOpen={undefined}>
			<Card minWidth="42rem" padding={true}>
				<br />
				<br />
				<Select
					{...args}
					label="Select Field"
					isRequired={true}
					options={options}
					value={value}
					onChange={setValue}
				/>
				<br />
				<br />
			</Card>
		</Main>
	);
};

export const Default = Template.bind({});
export const MultiSelect = Template.bind({});
MultiSelect.args = { isMulti: true };
