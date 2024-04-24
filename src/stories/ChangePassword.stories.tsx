import { Meta, StoryObj } from '@storybook/react';
import { ChangePassword } from '../components/ChangePassword';
import { Main } from '../components/atoms/Main';

const email = 'tomek@blogweb.pl';

const meta: Meta<typeof ChangePassword> = {
	title: 'ChangePassword',
	component: ChangePassword,
	argTypes: {
		onSubmit: { action: 'submitted' },
		onCancel: { action: 'cancelled' }
	},
};

export default meta;

export const Default: StoryObj<typeof ChangePassword> = {
	render: (args) => (
		<Main isCovered={true} isDrawerOpen={false} setIsDrawerOpen={() => {}}>
			<ChangePassword {...args} email={email} error="" />
		</Main>
	),
};

