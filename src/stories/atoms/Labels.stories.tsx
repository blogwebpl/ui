import { useState } from 'react';
import { Card } from '../../components/atoms/Card';
import { Main } from '../../components/atoms/Main';

import { Labels } from '../../components/atoms/Labels';
import { Translations } from '../../components/types';

const Template = (args: Record<string, unknown>) => {
	const [value, setValue] = useState<Translations>({
		pl: 'Użytownik',
		en: 'User',
	});
	return (
		<Main isCovered={false} isDrawerOpen={false} setIsDrawerOpen={null}>
			<Card width="42rem" padding={true}>
				<Labels
					{...args}
					value={value || args.value}
					onChange={setValue}
					label="Labels"
				/>
			</Card>
		</Main>
	);
};
export default {
	title: 'atoms/Labels',
	component: Template,
	args: {},
	// decorators: [withContainer],
};
export const Slim = { args: { type: 'text', slim: true } };
