/* eslint-disable no-alert */
import {
	MdSortByAlpha as SortIcon,
	MdPrint as PrintIcon,
	MdAddCircle as AddIcon,
} from 'react-icons/md';

import { FaFileExcel as ExcelIcon } from 'react-icons/fa';

import { Table, TableAction, TableColumn } from '../../components/atoms/Table';
import { data } from './table.data';

const actions: TableAction[] = [
	{
		id: 'sort',
		icon: SortIcon,
		hint: 'kol.sort.',
		isDisabled: false,
		onClick: () => {
			alert('kolejnosc sortowania');
		},
	},
	{
		id: 'print',
		icon: PrintIcon,
		hint: 'drukuj',
		isDisabled: false,
		onClick: () => {
			alert('drukuj');
		},
	},
	{
		id: 'excel',
		icon: ExcelIcon,
		hint: 'do excela',
		isDisabled: false,
		onClick: () => {
			alert('excel');
		},
	},
	{
		id: 'add',
		icon: AddIcon,
		hint: 'dodaj',
		isDisabled: false,
		onClick: () => {
			alert('dodaj');
		},
	},
];

const columns: TableColumn[] = [
	{
		field: 'firstName',
		label: {
			pl: 'Imię',
			en: 'First name',
		},
		width: '10rem',
		sort: 'asc',
		sortOrder: 2,
	},
	{
		field: 'lastName',
		label: { pl: 'Nazwisko', en: 'Last name' },
		width: '10rem',
		sort: 'asc',
		sortOrder: 1,
	},
	{
		field: 'age',
		label: { pl: 'Wiek', en: 'Age' },
		width: '5rem',
		sort: 'desc',
		sortOrder: 3,
	},
	{
		field: 'user.test2',
		label: { pl: 'Test', en: 'Test' },
		width: '5rem',
		sort: 'desc',
		sortOrder: 4,
	},
];

const Template = () => {
	return (
		<Table
			width="72rem"
			title={{ pl: 'Użytkownicy', en: 'Users' }}
			actions={actions}
			columns={columns}
			data={data}
			rowsPerPage={0}
			pageNumber={1}
			readOnly={false}
			language="pl"
		/>
	);
};

export default { component: Template, title: 'Atoms/Table' };
export const Default = {};
