/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, SelectOption } from '../../../components/atoms/Select';
import { Labels } from '../../../components/atoms/Labels';
import { FieldContainer } from '../FieldContainer';
import { TextField } from '../../../components/atoms/TextField';
import styled from 'styled-components';
import { Button } from '../Button';
import { ButtonContainer } from '../ButtonContainer';
import { Checkbox } from '../../../components/atoms/Checkbox';

const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	border: 1px solid #ddd;
	border-radius: 0.5rem;
	padding: 1rem 0.5rem;

	& > div {
		display: flex;
		flex-direction: column;
		padding: 1rem 0.5rem;
		border-radius: 0.5rem;
		border: 1px solid #f5f5f5;
	}
	& > div:nth-child(even) {
		background-color: #f9f9f9;
	}
`;

export interface FieldInterface {
	tab: number;
	type: string;
	field: string;
	label: { en: string; pl: string };
	required: boolean;
	defaultValue: any;
}

interface FieldsEditorProps {
	fields: FieldInterface[];
	setFields: (Fields: FieldInterface[]) => void;
	label: string;
}

type FieldValue = string | { en: string; pl: string } | number | boolean;

const newField: FieldInterface = {
	tab: 0,
	type: 'text',
	field: '',
	label: { en: '', pl: '' },
	required: false,
	defaultValue: '',
};

export function FieldsEditor(props: FieldsEditorProps) {
	const handleFieldChange = (
		index: number,
		key: keyof FieldInterface,
		value: FieldValue
	) => {
		const newFields = [...props.fields];
		if (key === 'tab') {
			newFields[index][key] = value as number;
		} else if (key === 'type' || key === 'field' || key === 'defaultValue') {
			newFields[index][key] = value as string;
		} else if (key === 'required') {
			newFields[index][key] = value as boolean;
		} else if (key === 'label') {
			newFields[index][key] = value as { en: string; pl: string };
		} else {
			console.error('Invalid key');
		}

		props.setFields(newFields);
	};

	const addField = () => {
		const newFields = [...props.fields, newField];
		props.setFields(newFields);
	};

	const removeField = (index: number) => {
		if (index < 0 || index >= props.fields.length) {
			console.error('Index out of range');
			return;
		}
		const newFields = props.fields.filter((_, i) => i !== index);
		props.setFields(newFields);
	};

	const insertField = (index: number) => {
		const newFields = [
			...props.fields.slice(0, index + 1),
			newField,
			...props.fields.slice(index + 1),
		];
		props.setFields(newFields);
	};

	const moveFieldUp = (index: number) => {
		if (index > 0) {
			const newFields = [...props.fields];
			[newFields[index - 1], newFields[index]] = [
				newFields[index],
				newFields[index - 1],
			];
			props.setFields(newFields);
		}
	};

	const moveFieldDown = (index: number) => {
		if (index < props.fields.length - 1) {
			const newFields = [...props.fields];
			[newFields[index], newFields[index + 1]] = [
				newFields[index + 1],
				newFields[index],
			];
			props.setFields(newFields);
		}
	};

	if (!props.fields) {
		return (
			<StyledContainer>
				<Button
					onClick={addField}
					label="Dodaj nowe pole"
					variant="secondary"
				/>
			</StyledContainer>
		);
	}

	return (
		<StyledContainer>
			{props.fields.map((field, index) => (
				<div key={index}>
					<ButtonContainer>
						<b>Pole {index + 1}</b>
						<Button
							onClick={() => removeField(index)}
							label="Usuń"
							variant="secondary"
						/>
						<Button
							onClick={() => insertField(index)}
							label="Wstaw"
							variant="secondary"
						/>
						<Button
							onClick={() => moveFieldUp(index)}
							disabled={index === 0}
							label="↑"
							variant="secondary"
						/>
						<Button
							onClick={() => moveFieldDown(index)}
							disabled={index === props.fields.length - 1}
							label="↓"
							variant="secondary"
						/>
					</ButtonContainer>
					<FieldContainer>
						<TextField
							controlled
							label="Zakładka"
							type="number"
							value={field.tab}
							onChange={(e) =>
								handleFieldChange(index, 'tab', parseInt(e.target.value))
							}
						/>
					</FieldContainer>
					<FieldContainer>
						<Select
							label="Typ pola"
							value={{
								value: field.type,
								label: field.type || '',
							}}
							onChange={(option) => {
								if (!Array.isArray(option)) {
									handleFieldChange(
										index,
										'type',
										(option as SelectOption)?.value
									);
								}
							}}
							options={[
								{ value: 'text', label: 'text' },
								{ value: 'number', label: 'number' },
							]}
							isMulti={false}
						/>
					</FieldContainer>
					<FieldContainer>
						<TextField
							controlled
							label="Pole tabeli"
							type="text"
							value={field.field || ''}
							onChange={(e) =>
								handleFieldChange(index, 'field', e.target.value)
							}
						/>
					</FieldContainer>
					<FieldContainer>
						<Labels
							label="Labelka"
							value={field.label}
							onChange={(newLabels) =>
								handleFieldChange(index, 'label', {
									en: newLabels.en || '',
									pl: newLabels.pl || '',
								})
							}
						/>
					</FieldContainer>
					<FieldContainer>
						<Checkbox
							checked={field.required}
							onChange={(checked: boolean) =>
								handleFieldChange(index, 'required', checked)
							}
							label="Wymagane"
							controlled
						/>
					</FieldContainer>
					<FieldContainer>
						<TextField
							controlled
							label="Domyślna wartość"
							type="text"
							value={field.defaultValue || ''}
							onChange={(e) =>
								handleFieldChange(index, 'defaultValue', e.target.value)
							}
						/>
					</FieldContainer>
				</div>
			))}
			<Button
				onClick={addField}
				label="Dodaj nową kolumnę"
				variant="secondary"
			/>
		</StyledContainer>
	);
}
