/* eslint-disable no-alert */
import {
	MdSortByAlpha as SortIcon,
	MdPrint as PrintIcon,
	MdAddCircle as AddIcon,
} from 'react-icons/md';

import { FaFileExcel as ExcelIcon } from 'react-icons/fa';

import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Table, TableColumn } from '../../components/atoms/Table';
import { tableData } from './table.data';
import { Action } from '../../components/atoms/Tools';

const actions: Action[] = [
	{
		id: 'sort',
		icon: SortIcon,
		hint: { pl: 'kol.sort.', en: 'sort' },
		disabled: false,
		onClick: () => {
			alert('kolejnosc sortowania');
		},
	},
	{
		id: 'print',
		icon: PrintIcon,
		hint: { pl: 'drukuj', en: 'print' },
		disabled: false,
		onClick: () => {
			alert('drukuj');
		},
	},
	{
		id: 'excel',
		icon: ExcelIcon,
		hint: { pl: 'do excela', en: 'to excel' },
		disabled: false,
		onClick: () => {
			alert('excel');
		},
	},
	{
		id: 'add',
		icon: AddIcon,
		hint: { pl: 'dodaj', en: 'add' },
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
		width: '12rem',
		sort: 'asc',
		sortOrder: 2,
		type: 'text',
	},
	{
		field: 'lastName',
		label: { pl: 'Nazwisko', en: 'Last name' },
		width: '15rem',
		sort: 'asc',
		sortOrder: 1,
		type: 'text',
	},
	{
		field: 'age',
		label: { pl: 'Wiek', en: 'Age' },
		width: '12rem',
		sort: 'desc',
		sortOrder: 3,
		type: 'number',
	},
	{
		field: 'user.test2',
		label: { pl: 'Test', en: 'Test' },
		width: '10rem',
		sort: 'desc',
		sortOrder: 4,
		type: 'number',
	},
	{
		field: 'testb',
		label: { pl: 'TestB', en: 'TestB' },
		width: '10rem',
		sort: 'desc',
		sortOrder: 5,
		type: 'boolean',
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
				mobileWidth={660}
			/>
		</Router>
	);
};

export default { component: Template, title: 'Atoms/Table' };
export const Default = {};
