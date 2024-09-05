/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { EditForm, Field } from '../components/EditForm';
import { Main } from '../components/atoms/Main';
import { menuItems, menuItemsInMenu } from './MenuEditor.stories';
import { exampleInventoryItems } from './atoms/InventoryItems.data';
import { columnsEditorData } from './atoms/ColumnsEditor.stories';

export const users = [
	{
		id: '65bce2d61e5d33ddb6c2e121',
		name: 'John Doe',
		email: 'john.doe@example.com',
	},
	{
		id: '65bce2d61e5d33ddb6c2e122',
		name: 'Jane Doe',
		email: 'jane.doe@example.com',
	},
	{
		id: '65bce2d61e5d33ddb6c2e123',
		name: 'Tom Smith',
		email: 'tom.smith@example.com',
	},
];

const editFields: Field[] = [
	{
		field: 'name',
		type: 'text',
		tab: 0,
		required: true,
		label: { pl: 'Imię', en: 'First name' },
		defaultValue: '',
	},
	{
		field: 'surname',
		type: 'text',
		tab: 0,
		required: false,
		label: { pl: 'Nazwisko', en: 'Last name' },
		defaultValue: '',
	},
	{
		field: 'age',
		type: 'number',
		tab: 0,
		required: false,
		label: { pl: 'Wiek', en: 'Age' },
		defaultValue: 0,
	},
	{
		field: 'bool',
		type: 'checkbox',
		tab: 0,
		required: false,
		label: { pl: 'Boolean', en: 'Boolean' },
		defaultValue: false,
	},
	{
		field: 'crud',
		type: 'crud',
		tab: 0,
		required: false,
		label: { pl: 'CRUD', en: 'CRUD' },
		defaultValue: '1',
	},
	{
		field: 'date',
		type: 'date',
		tab: 1,
		required: true,
		label: { pl: 'Data', en: 'Date' },
		defaultValue: '',
	},
	{
		field: 'roles',
		type: 'roles',
		tab: 1,
		required: true,
		label: { pl: 'Grupy', en: 'Roles' },
		defaultValue: [],
	},
	{
		field: 'permissions',
		type: 'permissions',
		tab: 1,
		required: true,
		label: { pl: 'Uprawnienia', en: 'Permissions' },
		defaultValue: [],
	},
	{
		field: 'menu',
		type: 'menu',
		tab: 1,
		required: true,
		label: { pl: 'Menu', en: 'Menu' },
		defaultValue: {},
	},
	{
		field: 'userId',
		type: 'user',
		tab: 1,
		required: true,
		label: { pl: 'Użytkownik', en: 'User' },
		defaultValue: '',
	},
	{
		field: 'menuE',
		type: 'menuEditor',
		tab: 2,
		required: true,
		label: { pl: 'Menu Edytor', en: 'Menu Editor' },
		defaultValue: {},
	},
	{
		field: 'icon',
		type: 'icon',
		tab: 3,
		required: true,
		label: { pl: 'Ikona', en: 'Icon' },
		defaultValue: '',
	},
	{
		field: 'label',
		type: 'labels',
		tab: 3,
		required: true,
		label: { pl: 'Etykiety', en: 'Labels' },
		defaultValue: { pl: '', en: '' },
	},
	{
		field: 'inventoryItems',
		type: 'inventoryItems',
		tab: 4,
		required: true,
		label: { pl: 'Przedmioty', en: 'Items' },
		defaultValue: [],
	},
	{
		field: 'users',
		type: 'users',
		tab: 5,
		required: true,
		label: { pl: 'Użytkownicy', en: 'Users' },
		defaultValue: [],
	},
	{
		field: 'columns',
		type: 'columnsEditor',
		tab: 6,
		required: true,
		label: { pl: 'Kolumny', en: 'Columns' },
		defaultValue: [],
	},
	{
		field: 'tabs',
		type: 'tabsEditor',
		tab: 7,
		required: true,
		label: { pl: 'Zakładki', en: 'Tabs' },
		defaultValue: [],
	},
	{
		field: 'fields',
		type: 'fieldsEditor',
		tab: 8,
		required: true,
		label: { pl: 'Pola', en: 'Fields' },
		defaultValue: [],
	},
];

const roles = [
	{ value: 'admin', label: 'Admin' },
	{ value: 'user', label: 'User' },
];

const permissions = [
	{ value: 'perm1', label: 'Permission1' },
	{ value: 'perm2', label: 'Permission2' },
];

const menus = [
	{
		value: 'menu',
		label: 'Menu',
	},
	{
		value: 'menu2',
		label: 'Menu2',
	},
	{
		value: 'menu3',
		label: 'Menu3',
	},
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (props: any) => {
	const tabs = [
		{ pl: 'Tab1', en: 'Tab1' },
		{ pl: 'Tab2', en: 'Tab2' },
		{ pl: 'Tab3', en: 'Tab3' },
		{ pl: 'Tab4', en: 'Tab4' },
		{ pl: 'Tab5', en: 'Tab5' },
		{ pl: 'Tab6', en: 'Tab6' },
		{ pl: 'Tab7', en: 'Tab7' },
		{ pl: 'Tab8', en: 'Tab8' },
		{ pl: 'Tab9', en: 'Tab9' },
	];
	const [fields, setFields] = useState<Field[]>([]);
	const [values, setValues] = useState({});

	useEffect(() => {
		setTimeout(() => {
			setValues({
				name: 'Tomasz',
				surname: 'Durałek',
				age: 42,
				date: '2023-01-01',
				roles: ['admin'],
				permissions: ['perm1'],
				menu: 'menu2',
				menuE: menuItemsInMenu,
				icon: 'Settings',
				label: { pl: 'Etykieta', en: 'Label' },
				columns: columnsEditorData,
				crud: 12,
				tabs: [
					{ pl: 'Zakładka1', en: 'Tab1' },
					{ pl: 'Zakładka2', en: 'Tab2' },
				],
				fields: [
					{
						field: 'field1',
						type: 'text',
						tab: 0,
						required: true,
						label: { pl: 'Pole1', en: 'Field1' },
						defaultValue: '',
					},
				],
				userId: '65bce2d61e5d33ddb6c2e121',
			});
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
					menuItems={menuItems}
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
					inventoryItems={exampleInventoryItems}
					width="90rem"
					users={users}
				/>
			</Main>
		</Router>
	);
};

export default { component: Template, title: 'EditForm' };
export const Default = {};
export const ReadOnly = { args: { mode: 'view' } };
