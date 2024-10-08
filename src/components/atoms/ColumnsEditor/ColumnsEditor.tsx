/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, SelectOption } from '../../../components/atoms/Select';
import { Labels } from '../../../components/atoms/Labels';
import { FieldContainer } from '../FieldContainer';
import { TextField } from '../../../components/atoms/TextField';
import styled from 'styled-components';
import { Button } from '../Button';
import { ButtonContainer } from '../ButtonContainer';

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

export interface ColumnInterface {
	sort: string;
	type: string;
	field: string;
	label: { en: string; pl: string };
	width: string;
	sortOrder: number;
}

interface ColumnsEditorProps {
	columns: ColumnInterface[];
	setColumns: (columns: ColumnInterface[]) => void;
	label: string;
}

type ColumnValue = string | { en: string; pl: string } | number;

const newColumn = {
	sort: 'asc',
	type: 'text',
	field: '',
	label: { en: '', pl: '' },
	width: '',
	sortOrder: 0,
};

export function ColumnsEditor(props: ColumnsEditorProps) {
	const handleColumnChange = (
		index: number,
		key: keyof ColumnInterface,
		value: ColumnValue
	) => {
		const newColumns = [...props.columns];
		if (
			key === 'sort' ||
			key === 'type' ||
			key === 'field' ||
			key === 'width'
		) {
			newColumns[index][key] = value as string;
		} else if (key === 'sortOrder') {
			newColumns[index][key] = Number(value);
		} else if (key === 'label') {
			newColumns[index][key] = value as { en: string; pl: string };
		} else {
			console.error('Invalid key');
		}

		console.log({ newColumns });

		props.setColumns(newColumns);
	};

	const addColumn = () => {
		const newColumns = [...props.columns, newColumn];
		props.setColumns(newColumns);
	};

	const removeColumn = (index: number) => {
		if (index < 0 || index >= props.columns.length) {
			console.error('Index out of range');
			return;
		}
		const newColumns = props.columns.filter((_, i) => i !== index);
		props.setColumns(newColumns);
	};

	const insertColumn = (index: number) => {
		const newColumns = [
			...props.columns.slice(0, index + 1),
			newColumn,
			...props.columns.slice(index + 1),
		];
		props.setColumns(newColumns);
	};

	const moveColumnUp = (index: number) => {
		if (index > 0) {
			const newColumns = [...props.columns];
			[newColumns[index - 1], newColumns[index]] = [
				newColumns[index],
				newColumns[index - 1],
			];
			props.setColumns(newColumns);
		}
	};

	const moveColumnDown = (index: number) => {
		if (index < props.columns.length - 1) {
			const newColumns = [...props.columns];
			[newColumns[index], newColumns[index + 1]] = [
				newColumns[index + 1],
				newColumns[index],
			];
			props.setColumns(newColumns);
		}
	};

	if (!props.columns) {
		return (
			<StyledContainer>
				<Button
					onClick={addColumn}
					label="Dodaj nową kolumnę"
					variant="secondary"
				/>
			</StyledContainer>
		);
	}

	return (
		<StyledContainer>
			{props.columns.map((column, index) => (
				<div key={index}>
					<ButtonContainer>
						<b>Kolumna {index + 1}</b>
						<Button
							onClick={() => removeColumn(index)}
							label="Usuń"
							variant="secondary"
						/>
						<Button
							onClick={() => insertColumn(index)}
							label="Wstaw"
							variant="secondary"
						/>
						<Button
							onClick={() => moveColumnUp(index)}
							disabled={index === 0}
							label="↑"
							variant="secondary"
						/>
						<Button
							onClick={() => moveColumnDown(index)}
							disabled={index === props.columns.length - 1}
							label="↓"
							variant="secondary"
						/>
					</ButtonContainer>
					<FieldContainer>
						<Select
							label="Sortowanie"
							value={{
								value: column.sort,
								label: column.sort || '',
							}}
							onChange={(option) => {
								if (!Array.isArray(option)) {
									handleColumnChange(
										index,
										'sort',
										(option as SelectOption)?.value
									);
								}
							}}
							options={[
								{ value: 'asc', label: 'asc' },
								{ value: 'desc', label: 'desc' },
							]}
							isMulti={false}
						/>
					</FieldContainer>
					<FieldContainer>
						<Select
							label="Typ pola"
							value={{
								value: column.type,
								label: column.type || '',
							}}
							onChange={(option) => {
								if (!Array.isArray(option)) {
									handleColumnChange(
										index,
										'type',
										(option as SelectOption)?.value
									);
								}
							}}
							options={[
								{ value: 'checkbox', label: 'checkbox' },
								{ value: 'columnsEditor', label: 'columnsEditor' },
								{ value: 'crud', label: 'crud' },
								{ value: 'date', label: 'date' },
								{ value: 'datetime-local', label: 'datetime-local' },
								{ value: 'email', label: 'email' },
								{ value: 'fieldsEditor', label: 'fieldsEditor' },
								{ value: 'icon', label: 'icon' },
								{ value: 'labels', label: 'labels' },
								{ value: 'menu', label: 'menu' },
								{ value: 'menuEditor', label: 'menuEditor' },
								{ value: 'number', label: 'number' },
								{ value: 'password', label: 'password' },
								{ value: 'permissions', label: 'permissions' },
								{ value: 'roles', label: 'roles' },
								{ value: 'tabsEditor', label: 'tabsEditor' },
								{ value: 'text', label: 'text' },
								{ value: 'users', label: 'users' },
							]}
							isMulti={false}
						/>
					</FieldContainer>
					<FieldContainer>
						<TextField
							controlled
							label="Pole tabeli"
							type="text"
							value={column.field || ''}
							onChange={(e) =>
								handleColumnChange(index, 'field', e.target.value)
							}
						/>
					</FieldContainer>
					<FieldContainer>
						<Labels
							label="Labelka"
							value={column.label}
							onChange={(newLabels) =>
								handleColumnChange(index, 'label', {
									en: newLabels.en || '',
									pl: newLabels.pl || '',
								})
							}
						/>
					</FieldContainer>
					<FieldContainer>
						<TextField
							controlled
							label="Szerokość"
							type="text"
							value={column.width || ''}
							onChange={(e) =>
								handleColumnChange(index, 'width', e.target.value)
							}
						/>
					</FieldContainer>
					<FieldContainer>
						<TextField
							controlled
							label="Kolejność sortowania"
							type="number"
							value={column.sortOrder}
							onChange={(e) =>
								handleColumnChange(index, 'sortOrder', e.target.value)
							}
						/>
					</FieldContainer>
				</div>
			))}
			<Button
				onClick={addColumn}
				label="Dodaj nową kolumnę"
				variant="secondary"
			/>
		</StyledContainer>
	);
}
