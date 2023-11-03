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
	{ field: 'roles', type: 'roles', tab: 1, required: true, label: { pl: 'Grupy', en: 'Roles' } },
	{ field: 'permissions', type: 'permissions', tab: 1, required: true, label: { pl: 'Uprawnienia', en: 'Permissions' } },
	{ field: 'menu', type: 'menu', tab: 1, required: true, label: { pl: 'Menu', en: 'Menu' }}
];

const roles = [
	{ value: 'admin', label: 'Admin' },
	{ value: 'user', label: 'User' },
];


const permissions = [
	{ value: 'perm1', label: 'Permission1' },
	{ value: 'perm2', label: 'Permission2' },
];

const menus = [{
	value: 'menu',
	label: 'Menu',
},{
	value: 'menu2',
	label: 'Menu2',
}];

const Template = (props: any) => {
	const tabs = [
		{ pl: 'Tab1', en: 'Tab1' },
		{ pl: 'Tab2', en: 'Tab2' },
	];
	const [fields, setFields] = useState<Field[]>([]);
	const [values, setValues] = useState({});

	useEffect(() => {
		setTimeout(() => {
			setValues({ name: 'Tomasz', surname: 'Durałek', age: 42, date: '2023-01-01', roles: ['admin'], permissions: ['perm1'], menu: 'menu' });
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
					title={{ pl: 'Edycja', en: 'Edit' }}
					tabs={tabs}
					activeTab={0}
					fields={fields}
					values={values}
					language="en"
					collection="test"
					roles={roles}
					permissions={permissions}
					menus={menus}
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
