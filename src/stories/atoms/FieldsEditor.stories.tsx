import { FieldsEditor } from '../../components/atoms/FieldsEditor';

export default {
	title: 'Atoms/FieldsEditor',
	component: FieldsEditor,
};

export const Default = {
	args: {
		// Add default args here
	},
};

export const fieldsEditorData = [
	{
		tab: 0,
		type: 'text',
		field: 'field1',
		label: { pl: 'Pole1', en: 'Field1' },
		required: true,
		defaultValue: '',
	},
];
