/* eslint-disable no-alert */

import {
	MdSortByAlpha as SortIcon,
	MdPrint as PrintIcon,
	MdAddCircle as AddIcon,
} from 'react-icons/md';
import { FaFileExcel as ExcelIcon } from 'react-icons/fa';
import { Action, Tools } from '../../components/atoms/Tools';

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

const Template = () => {
	return <Tools actions={actions} language="pl" />;
};

export default { component: Template, title: 'Atoms/Tools' };
export const Default = {};
