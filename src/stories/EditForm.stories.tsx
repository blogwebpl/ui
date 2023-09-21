import React from 'react';
import { EditForm, Field } from '../components/EditForm';
import { Main } from '../components/atoms/Main';

const fields: Field[] = [
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
	const values = { name: 'Tomasz', surname: 'Durałek', age: 42, date: '2023-01-01' };
	const setActiveTab = (e: React.MouseEvent<HTMLAnchorElement>) => {
		const dataIndex = Number(e.currentTarget.getAttribute('data-index'));
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
			<EditForm
				{...props}
				setActiveTab={setActiveTab}
				tabs={tabs}
				fields={fields}
				values={values}
			/>
		</Main>
	);
};

export default { component: Template, title: 'EditForm' };
export const Default = {};
