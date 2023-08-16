/* eslint-disable no-alert */
import {
	MdSortByAlpha as SortIcon,
	MdPrint as PrintIcon,
	MdAddCircle as AddIcon,
} from 'react-icons/md';

import { FaFileExcel as ExcelIcon } from 'react-icons/fa';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Table, TableAction, TableColumn } from '../../components/atoms/Table';
import { data } from './table.data';

export default {
	title: 'atoms/Table',
	component: Table,
	args: {},
} as ComponentMeta<typeof Table>;

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
		id: 'firstName',
		label: 'Imię',
		width: '10rem',
		sort: 'asc',
		sortOrder: 2,
	},
	{
		id: 'lastName',
		label: 'Nazwisko',
		width: '10rem',
		sort: 'asc',
		sortOrder: 1,
	},
	{
		id: 'age',
		label: 'Wiek',
		width: '5rem',
		sort: 'desc',
		sortOrder: 3,
	},
];

const Template: ComponentStory<typeof Table> = () => {
	return (
		<Table
			width="72rem"
			title="Użytkownicy"
			actions={actions}
			columns={columns}
			data={data}
			rowsPerPage={0}
			pageNumber={1}
			readOnly={false}
		/>
	);
};

export const Default = Template.bind({});
