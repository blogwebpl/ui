import { useState } from 'react';
import { Card } from '../../components/atoms/Card';
import { Main } from '../../components/atoms/Main';
import { Select } from '../../components/atoms/Select';

const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' },
];

const Template = (args: any) => {
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

export default { component: Template, title: 'Atoms/Select' };
export const Default = {};
export const MultiSelect = { args: { isMulti: true } };
