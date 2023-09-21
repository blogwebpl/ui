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

const Template = () => {
	return <Tools actions={actions} />;
};

export default { component: Template, title: 'Atoms/Tools' };
export const Default = {};
