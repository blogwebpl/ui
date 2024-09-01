import { ColumnsEditor } from '../../components/atoms/ColumnsEditor';

export default {
	title: 'Atoms/ColumnsEditor',
	component: ColumnsEditor,
};

export const Default = {
	args: {
		// Add default args here
	},
};

export const columnsEditorData = [
	{
		sort: 'asc',
		type: 'text',
		field: 'name',
		label: { en: 'Name', pl: 'Imię' },
		width: '10rem',
		sortOrder: 0,
	},
	{
		sort: 'desc',
		type: 'number',
		field: 'age',
		label: { en: 'Age', pl: 'Wiek' },
		width: '15rem',
		sortOrder: 1,
	},
	{
		sort: 'desc',
		type: 'text',
		field: 'email',
		label: { en: 'Email', pl: 'Email' },
		width: '12rem',
		sortOrder: 2,
	},
];
