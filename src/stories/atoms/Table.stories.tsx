import {
	MdSearch as SearchIcon,
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
		icon: SearchIcon,
		hint: 'filtruj',
		isDisabled: false,
		onClick: () => {
			alert('filtruj');
		},
	},
	{
		icon: SortIcon,
		hint: 'kol.sort.',
		isDisabled: false,
		onClick: () => {
			alert('kolejnosc sortowania');
		},
	},
	{
		icon: PrintIcon,
		hint: 'drukuj',
		isDisabled: false,
		onClick: () => {
			alert('drukuj');
		},
	},
	{
		icon: ExcelIcon,
		hint: 'do excela',
		isDisabled: false,
		onClick: () => {
			alert('excel');
		},
	},
	{
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
