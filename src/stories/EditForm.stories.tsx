import React from 'react';
import { EditForm } from '../components/EditForm';
import { Main } from '../components/atoms/Main';

const fields = [
	{
		key: 'name',
		type: 'text',
		tab: 'Tab 1',
		required: true,
		label: 'Imię',
	},
	{
		key: 'surname',
		type: 'text',
		tab: 'Tab 1',
		required: false,
		label: 'Nazwisko',
	},
	{
		key: 'age',
		type: 'number',
		tab: 'Tab 1',
		required: false,
		label: 'Wiek',
	},
	{ key: 'date', type: 'date', tab: 'Tab 2', required: true, label: 'Data' },
];

const Template = (props: any) => {
	const [tabs, setTabs] = React.useState([
		{ label: 'Tab 1', active: true },
		{ label: 'Tab 2', active: false },
	]);
	const setActiveTab = (e: React.MouseEvent<HTMLAnchorElement>) => {
		const dataIndex = Number(e.currentTarget.getAttribute('data-index'));
		console.log(dataIndex);
		const newTabs = tabs.map((tab, index) => {
			if (index === dataIndex) {
				return { ...tab, active: true };
			}
			return { ...tab, active: false };
		});
		setTabs(newTabs);
	};
	return (
		<Main isCovered={true} isDrawerOpen={false} setIsDrawerOpen={() => {}}>
			<EditForm {...props} setActiveTab={setActiveTab} tabs={tabs} fields={fields} />
		</Main>
	);
};

export default { component: Template, title: 'EditForm' };
export const Default = { args: { test: true } };
