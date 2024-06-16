import { useState } from 'react';
import { Card } from '../../components/atoms/Card';
import { Main } from '../../components/atoms/Main';
import { IconSelect } from '../../components/atoms/IconSelect';

const Template = (args: Record<string, unknown>) => {
	const [value, setValue] = useState<string | null>(null);
	return (
		<Main isCovered={false} isDrawerOpen={false} setIsDrawerOpen={null}>
			<Card width="42rem" padding={true}>
				<br />
				<br />
				<IconSelect
					{...args}
					label="Select Icon"
					isRequired={true}
					value={value ?? ''}
					onChange={(newValue: string) => setValue(newValue)}
				/>
				<br />
				<br />
			</Card>
		</Main>
	);
};

export default { component: Template, title: 'Atoms/IconSelect' };
export const Default = {};
