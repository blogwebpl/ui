import { useState } from 'react';
import { Card } from '../../components/atoms/Card';
import { Main } from '../../components/atoms/Main';
import { UserSelect } from '../../components/atoms/UserSelect';

export const users = [
	{
		id: '65bce2d61e5d33ddb6c2e121',
		name: 'John Doe',
	},
	{
		id: '65bce2d61e5d33ddb6c2e122',
		name: 'Jane Doe',
	},
	{
		id: '65bce2d61e5d33ddb6c2e123',
		name: 'Tom Smith',
	},
];

const Template = (args: any) => {
	const [value, setValue] = useState(null);
	return (
		<Main isCovered={false} isDrawerOpen={false} setIsDrawerOpen={undefined}>
			<Card minWidth="42rem" padding={true}>
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
