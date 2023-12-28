import { useState } from 'react';
import { Card } from '../../components/atoms/Card';
import { Main } from '../../components/atoms/Main';
import { IconSelect } from '../../components/atoms/IconSelect';

const Template = (args: any) => {
	const [value, setValue] = useState(null);
	return (
		<Main isCovered={false} isDrawerOpen={false} setIsDrawerOpen={undefined}>
			<Card minWidth="42rem" padding={true}>
				<br />
				<br />
				<IconSelect
					{...args}
					label="Select Icon"
					isRequired={true}
					value={value}
					onChange={setValue}
				/>
				<br />
				<br />
			</Card>
		</Main>
	);
};

export default { component: Template, title: 'Atoms/IconSelect' };
export const Default = {};
