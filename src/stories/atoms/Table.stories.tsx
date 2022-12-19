/* eslint-disable no-alert */
import {
	MdSortByAlpha as SortIcon,
	MdPrint as PrintIcon,
	MdAddCircle as AddIcon,
} from 'react-icons/md';

import { FaFileExcel as ExcelIcon } from 'react-icons/fa';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Table, TableAction } from '../../components/atoms/Table';

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

const Template: ComponentStory<typeof Table> = () => {
	return <Table title="Użytkownicy" actions={actions} />;
};

export const Default = Template.bind({});
