/* eslint-disable no-alert */
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {
	MdSortByAlpha as SortIcon,
	MdPrint as PrintIcon,
	MdAddCircle as AddIcon,
} from 'react-icons/md';
import { FaFileExcel as ExcelIcon } from 'react-icons/fa';
import { Action, Tools } from '../../components/atoms/Tools';

export default {
	title: 'atoms/Tools',
	component: Tools,
	args: {},
} as ComponentMeta<typeof Tools>;

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

const Template: ComponentStory<typeof Tools> = () => {
	return <Tools actions={actions} />;
};

export const Default = Template.bind({});
