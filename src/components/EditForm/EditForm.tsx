import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MultiValue, SingleValue } from 'react-select';
import { Button } from '../atoms/Button';
import { ButtonContainer } from '../atoms/ButtonContainer';
import { Card } from '../atoms/Card';
import { FieldContainer } from '../atoms/FieldContainer';
import { Tabs } from '../atoms/Tabs';
import { TextField } from '../atoms/TextField';
import { Typography } from '../atoms/Typography';
import { Alert } from '../atoms/Alert';
import { Language, Translations, labelsDefault } from '../types';
import { Select, SelectOption } from '../atoms/Select';
import { WriteTag } from '../atoms/WriteTag';
import { MenuEditor } from '../MenuEditor';
import { IMenuItem, MenuItemsSchema } from '../atoms/Menu';
import { IconSelect } from '../atoms/IconSelect';
import { Labels } from '../atoms/Labels';
import { IInventoryItem } from '../types';
import { InventoryItemsSelect } from '../InventoryItemsSelect';
import { UserSelect } from '../atoms/UserSelect';
import { Checkbox } from '../atoms/Checkbox';
import { ColumnInterface, ColumnsEditor } from '../atoms/ColumnsEditor';

const StyledVerticalGap = styled.div`
	height: 5.6rem;
`;

const StyledTitle = styled.div`
	background-color: #3f51b5;
	margin: -1.6rem;
	padding: 1.6rem;
	margin-bottom: 0;
`;

const Capitalize = styled.div`
	text-transform: capitalize;
`;

export interface Field {
	field: string;
	type: string;
	tab: number;
	required: boolean;
	label: Translations;
	defaultValue: unknown;
}

interface EditFormProps {
	tabs: Translations[];
	activeTab: number;
	fields: Field[];
	values: Record<string, unknown>;
	language: Language;
	collection: string;
	title: Translations;
	mode: 'add' | 'edit' | 'view';
	roles?: SelectOption[];
	permissions?: SelectOption[];
	menus?: SelectOption[];
	menuItems?: IMenuItem[];
	inventoryItems?: IInventoryItem[];
	saveData: (formData: Record<string, unknown>) => Promise<boolean>;
	width?: string;
	writeTagFunction?: (data: Record<string, unknown>) => Promise<boolean>;
	users?: { id: string; name: string }[];
}

export function EditForm({
	tabs,
	activeTab: initialActiveTab,
	fields,
	values: initialValues,
	language,
	collection,
	title,
	mode,
	roles,
	permissions,
	menus,
	menuItems,
	saveData,
	width,
	writeTagFunction,
	inventoryItems,
	users,
}: EditFormProps) {
	if (fields.length === 0) {
		return null;
	}

	const navigate = useNavigate();

	const [error, setError] = useState('');
	const [activeTab, setActiveTab] = useState(initialActiveTab);
	const [inputValues, setInputValues] = useState<Record<string, unknown>>(
		initialValues || {}
	);
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		setInputValues(initialValues || {});
	}, [initialValues]);

	const handleSetActiveTab = useCallback((index: number) => {
		setActiveTab(index);
	}, []);

	const validateForm = useCallback(
		() =>
			fields.every(
				(field) => !field.required || inputValues[field.field] !== ''
			),
		[fields, inputValues]
	);

	const handleClickSave = useCallback(async () => {
		setIsSaving(true);
		setError('');
		if (!validateForm()) {
			setError(
				language === 'pl'
					? 'Wypełnij wszystkie wymagane pola.'
					: 'Fill all required fields.'
			);
			setIsSaving(false);
			return;
		}

		const dataToSave = Object.assign(
			{},
			...fields.map((field) => {
				if (
					(field.type === 'roles' ||
						field.type === 'permissions' ||
						field.type === 'users') &&
					!Array.isArray(inputValues[field.field])
				) {
					return {
						[field.field]: [],
					};
				}
				return { [field.field]: inputValues[field.field] };
			})
		);

		const resultOk = await saveData(dataToSave);

		setIsSaving(false);
		if (resultOk) {
			navigate(`/${collection}`);
		} else {
			setError(
				language === 'pl'
					? 'Wystąpił błąd podczas zapisu danych.'
					: 'An error occurred while saving data.'
			);
		}
	}, [
		validateForm,
		fields,
		inputValues,
		saveData,
		collection,
		navigate,
		language,
	]);

	const getTitleExtension = useCallback(() => {
		const extensions = {
			pl: { add: ' - dodawanie', edit: ' - edycja', view: ' - podgląd' },
			en: { add: ' - add', edit: ' - edit', view: ' - view' },
		};
		return extensions[language][mode] || '';
	}, [language, mode]);

	const extTitle = getTitleExtension();

	interface SpecialSelectProps {
		options: SelectOption[];
		valueIds: string | string[];
		fieldName: string;
		shouldHide: boolean;
		label: string;
		isMulti?: boolean;
	}

	const SpecialSelect = useCallback(
		({
			options,
			valueIds,
			fieldName,
			shouldHide,
			label,
			isMulti = false,
		}: SpecialSelectProps) => {
			const selectedOptions = options.filter((option) =>
				isMulti ? valueIds.includes(option.value) : option.value === valueIds
			);
			// console.log('Uruchamiam SpecialSelect');
			// console.log({
			// 	options,
			// 	valueIds,
			// 	fieldName,
			// 	shouldHide,
			// 	label,
			// 	isMulti,
			// 	selectedOptions,
			// });

			const value = isMulti ? selectedOptions : selectedOptions[0] || null;

			return (
				<FieldContainer id={fieldName} key={fieldName} hidden={shouldHide}>
					<Capitalize>
						<Select
							label={label}
							options={options}
							value={value}
							onChange={(
								newValue: MultiValue<SelectOption> | SingleValue<SelectOption>
							) => {
								setInputValues((v) => ({
									...v,
									[fieldName]: isMulti
										? (newValue as SelectOption[]).map((item) => item.value)
										: (newValue as SelectOption).value,
								}));
							}}
							isMulti={isMulti}
							isClearable={false}
						/>
					</Capitalize>
				</FieldContainer>
			);
		},
		[setInputValues]
	);

	const renderField = useCallback(
		(field: Field, index: number) => {
			const shouldHide = activeTab !== field.tab;
			const fieldKey = `${field.field}-${index}`;
			const commonProps = {
				label: field.label[language],
				required: field.required,
				id: field.field,
				value: inputValues?.[field.field],
				onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
					const value =
						field.type === 'number'
							? parseFloat(e.target.value)
							: e.target.value;
					setInputValues((v) => ({ ...v, [field.field]: value }));
				},
				autoFocus: index === 0,
				disabled: mode === 'view',
				controlled: true,
			};

			let options: SelectOption[] = [];
			let isMulti = false;
			switch (field.type) {
				case 'roles':
					options = roles || [];
					isMulti = true;
					break;
				case 'permissions':
					options = permissions || [];
					isMulti = true;
					break;
				case 'menu':
					options = menus || [];
					break;
				default:
			}

			switch (field.type) {
				case 'text':
				case 'number':
				case 'date':
				case 'password':
				case 'email':
				case 'datetime-local':
					return (
						<FieldContainer id={field.field} key={fieldKey} hidden={shouldHide}>
							<TextField
								type={field.type}
								{...commonProps}
								value={inputValues?.[field.field]}
							/>
						</FieldContainer>
					);
				case 'roles':
				case 'permissions':
				case 'menu':
					return (
						<SpecialSelect
							key={fieldKey}
							options={options}
							valueIds={
								isMulti
									? (inputValues?.[field.field] as string[]) || []
									: (inputValues?.[field.field] as string) || ''
							}
							fieldName={field.field}
							shouldHide={shouldHide}
							label={field.label[language]}
							isMulti={isMulti}
						/>
					);
				case 'inventoryItems':
					return (
						<FieldContainer id={field.field} key={fieldKey} hidden={shouldHide}>
							<InventoryItemsSelect
								items={inventoryItems || []}
								setSelectedItems={(newValue: number[]) => {
									setInputValues((values) => ({
										...values,
										[field.field]: newValue,
									}));
								}}
								{...commonProps}
								selectedItems={(inputValues?.[field.field] as number[]) || []}
								language={language}
							/>
						</FieldContainer>
					);
				case 'writeTag':
					if (writeTagFunction) {
						return (
							<WriteTag
								key={fieldKey}
								writeTagFunction={writeTagFunction}
								data={{ id: inputValues?.[field.field] || '' }}
							/>
						);
					}
					return null;
				case 'menuEditor':
					return (
						<MenuEditor
							key={fieldKey}
							menuItems={menuItems || []}
							menuItemsInMenu={inputValues?.[field.field] as MenuItemsSchema[]}
							language={language}
							hidden={shouldHide}
							onChange={(newValue) => {
								setInputValues((values) => ({
									...values,
									[field.field]: newValue,
								}));
							}}
							label={field.label[language]}
						/>
					);
				case 'icon':
					return (
						<FieldContainer id={field.field} key={fieldKey} hidden={shouldHide}>
							<IconSelect
								key={fieldKey}
								hidden={shouldHide}
								label={field.label[language]}
								value={(inputValues?.[field.field] as string) || ''}
								onChange={(newValue) =>
									setInputValues((values) => ({
										...values,
										[field.field]: newValue,
									}))
								}
							/>
						</FieldContainer>
					);
				case 'users':
					return (
						<FieldContainer id={field.field} key={fieldKey} hidden={shouldHide}>
							<UserSelect
								key={fieldKey}
								hidden={shouldHide}
								label={field.label[language]}
								value={inputValues?.[field.field] as string[]}
								onChange={(newValue) =>
									setInputValues((values) => ({
										...values,
										[field.field]: newValue,
									}))
								}
								users={users || []}
							/>
						</FieldContainer>
					);
				case 'labels':
					return (
						<FieldContainer id={field.field} key={fieldKey} hidden={shouldHide}>
							<Labels
								value={
									(inputValues?.[field.field] as Translations) || {
										...labelsDefault,
									}
								}
								onChange={(newValue) => {
									setInputValues((values) => ({
										...values,
										[field.field]: newValue,
									}));
								}}
								label={field.label[language]}
							/>
						</FieldContainer>
					);
				case 'checkbox':
					return (
						<FieldContainer id={field.field} key={fieldKey} hidden={shouldHide}>
							<Checkbox
								checked={inputValues?.[field.field] as boolean}
								onChange={(newValue: boolean) => {
									setInputValues((values) => ({
										...values,
										[field.field]: newValue,
									}));
								}}
								label={field.label[language]}
								controlled
							/>
						</FieldContainer>
					);
				case 'columnsEditor':
					return (
						<FieldContainer id={field.field} key={fieldKey} hidden={shouldHide}>
							<ColumnsEditor
								columns={inputValues?.[field.field] as ColumnInterface[]}
								setColumns={(newValue: ColumnInterface[]) => {
									setInputValues((values) => ({
										...values,
										[field.field]: newValue,
									}));
								}}
								label={field.label[language]}
							/>
						</FieldContainer>
					);
				default:
					return null;
			}
		},
		[
			activeTab,
			inputValues,
			language,
			mode,
			roles,
			permissions,
			menus,
			menuItems,
			setInputValues,
			writeTagFunction,
			inventoryItems,
		]
	);

	const renderedFields = useMemo(
		() => fields.map(renderField),
		[fields, renderField]
	);

	return (
		<Card width={width || '48rem'} padding isPending={isSaving}>
			<StyledTitle>
				<Typography component="h6" userSelect="none" color="#eee">
					{title[language] + extTitle}
				</Typography>
			</StyledTitle>
			{tabs && tabs.length > 0 && (
				<>
					<Tabs
						language={language}
						tabs={tabs}
						setActiveTab={handleSetActiveTab}
						activeTab={activeTab}
					/>
					<StyledVerticalGap />
				</>
			)}
			{error && <Alert>{error}</Alert>}

			{renderedFields}
			<ButtonContainer>
				<Button
					label="Anuluj"
					variant="secondary"
					onClick={() => navigate(-1)}
					disabled={isSaving}
				/>
				{mode !== 'view' && (
					<Button
						label="Zapisz"
						variant="primary"
						onClick={handleClickSave}
						disabled={isSaving}
					/>
				)}
			</ButtonContainer>
		</Card>
	);
}
