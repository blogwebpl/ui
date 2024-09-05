import { useState } from 'react';
import { Card } from '../../components/atoms/Card';
import { Main } from '../../components/atoms/Main';
import { UserSelect } from '../../components/atoms/UserSelect';

const users = [
	{
		value: '65bce2d61e5d33ddb6c2e121',
		label: 'John Doe',
	},
	{
		value: '65bce2d61e5d33ddb6c2e122',
		label: 'Jane Doe',
	},
	{
		value: '65bce2d61e5d33ddb6c2e123',
		label: 'Tom Smith',
	},
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any) => {
	const [value, setValue] = useState(null);
	return (
		<Main isCovered={false} isDrawerOpen={false} setIsDrawerOpen={null}>
			<Card width="42rem" padding={true}>
				<br />
				<br />
				<UserSelect
					{...args}
					label="Select Users"
					isRequired={true}
					value={value}
					onChange={setValue}
					users={users}
				/>
				<br />
				<br />
			</Card>
		</Main>
	);
};

export default { component: Template, title: 'Atoms/UserSelect' };
export const Default = {};
