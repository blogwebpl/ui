import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { EditForm, Field } from '../components/EditForm';
import { Main } from '../components/atoms/Main';

const editFields: Field[] = [
	{
		field: 'name',
		type: 'text',
		tab: 0,
		required: true,
		label: { pl: 'Imię', en: 'First name' },
	},
	{
		field: 'surname',
		type: 'text',
		tab: 0,
		required: false,
		label: { pl: 'Nazwisko', en: 'Last name' },
	},
	{
		field: 'age',
		type: 'number',
		tab: 0,
		required: false,
		label: { pl: 'Wiek', en: 'Age' },
	},
	{ field: 'date', type: 'date', tab: 1, required: true, label: { pl: 'Data', en: 'Date' } },
];

const Template = (props: any) => {
	const tabs = [
		{ pl: 'Tab1', en: 'Tab1' },
		{ pl: 'Tab2', en: 'Tab2' },
	];
	const [fields, setFields] = useState<Field[]>([]);
	const [values, setValues] = useState({});

	useEffect(() => {
		setTimeout(() => {
			setValues({ name: 'Tomasz', surname: 'Durałek', age: 42, date: '2023-01-01' });
		}, 300);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setFields(editFields);
		}, 100);
	}, []);

	return (
		<Router>
			<Main isCovered={true} isDrawerOpen={false} setIsDrawerOpen={() => {}}>
				<EditForm
					{...props}
					tabs={tabs}
					activeTab={0}
					fields={fields}
					values={values}
					language="en"
					collection="test"
					saveData={(data: any) => {
						console.log(data);
						return new Promise((resolve) => {
							setTimeout(() => {
								resolve(true);
							}, 1000);
						});
					}}
				/>
			</Main>
		</Router>
	);
};

export default { component: Template, title: 'EditForm' };
export const Default = {};
