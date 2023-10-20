/* eslint-disable no-alert */
import {
	MdSortByAlpha as SortIcon,
	MdPrint as PrintIcon,
	MdAddCircle as AddIcon,
} from 'react-icons/md';

import { FaFileExcel as ExcelIcon } from 'react-icons/fa';

import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Table, TableAction, TableColumn } from '../../components/atoms/Table';
import { tableData } from './table.data';

const actions: TableAction[] = [
	{
		id: 'sort',
		icon: SortIcon,
		hint: 'kol.sort.',
		disabled: false,
		onClick: () => {
			alert('kolejnosc sortowania');
		},
	},
	{
		id: 'print',
		icon: PrintIcon,
		hint: 'drukuj',
		disabled: false,
		onClick: () => {
			alert('drukuj');
		},
	},
	{
		id: 'excel',
		icon: ExcelIcon,
		hint: 'do excela',
		disabled: false,
		onClick: () => {
			alert('excel');
		},
	},
	{
		id: 'add',
		icon: AddIcon,
		hint: 'dodaj',
		disabled: false,
		onClick: () => {
			alert('dodaj');
		},
	},
];

const tableColumns: TableColumn[] = [
	{
		field: 'firstName',
		label: {
			pl: 'Imię',
			en: 'First name',
		},
		width: '10rem',
		sort: 'asc',
		sortOrder: 2,
		type: 'string',
	},
	{
		field: 'lastName',
		label: { pl: 'Nazwisko', en: 'Last name' },
		width: '10rem',
		sort: 'asc',
		sortOrder: 1,
		type: 'string',
	},
	{
		field: 'age',
		label: { pl: 'Wiek', en: 'Age' },
		width: '5rem',
		sort: 'desc',
		sortOrder: 3,
		type: 'number',
	},
	{
		field: 'user.test2',
		label: { pl: 'Test', en: 'Test' },
		width: '5rem',
		sort: 'desc',
		sortOrder: 4,
		type: 'number',
	},
];

const Template = () => {
	const [data, setData] = useState<any[]>([]);
	const [columns, setColumns] = useState<TableColumn[]>([]);
	useEffect(() => {
		setTimeout(() => {
			setData(tableData);
			setColumns(tableColumns);
		}, 1000);
	}, []);
	return (
		<Router>
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
				crud={15}
				collection="users"
			/>
		</Router>
	);
};

export default { component: Template, title: 'Atoms/Table' };
export const Default = {};
