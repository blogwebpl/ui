import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button } from '../atoms/Button';
import { ButtonContainer } from '../atoms/ButtonContainer';
import { Card } from '../atoms/Card';
import { FieldContainer } from '../atoms/FieldContainer';
import { Tabs } from '../atoms/Tabs';
import { TextField } from '../atoms/TextField';
import { Typography } from '../atoms/Typography';
import { Alert } from '../atoms/Alert';
import { Language, Translations } from '../types';
import { Select, SelectOption } from '../atoms/Select';

const StyledVerticalGap = styled.div`
	height: 5.6rem;
`;

export interface Field {
	field: string;
	type: string;
	tab: number;
	required: boolean;
	label: Translations;
}

interface EditFormProps {
	tabs: Translations[];
	activeTab: number;
	fields: Field[];
	values: any;
	language: Language;
	collection: string;
	title: Translations;
	mode: 'add' | 'edit' | 'view';
	roles?: SelectOption[];
	saveData: (formData: Object) => Promise<boolean>;
}

export function EditForm(props: EditFormProps) {
	if (props.fields.length === 0) {
		return null;
	}

	const navigate = useNavigate();

	const [error, setError] = useState('');
	const [activeTab, setActiveTab] = useState(props.activeTab);
	const [inputValues, setInputValues] = useState<any>(props.values || {});
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		if (props.values !== undefined) {
			setInputValues(props.values);
		}
	}, [props.values]);

	// const inputRefs: { [key: string]: React.RefObject<HTMLInputElement> } = {};

	const handleSetActiveTab = (e: React.MouseEvent<HTMLAnchorElement>) => {
		setActiveTab(Number(e.currentTarget.getAttribute('data-index')));
	};

	const validateForm = () => {
		// return props.fields.every((field) => {
		// 	if (field.required) {
		// 		const inputRef = inputRefs[field.field];
		// 		return inputRef && inputRef.current && inputRef.current.value !== '';
		// 	}
		// 	return true;
		// });
		return props.fields.every((field) => {
			if (field.required) {
				return inputValues[field.field] !== '';
			}
			return true;
		});
	};

	// const getFormData = () => {
	// 	const formData: { [key: string]: string } = {};
	// 	props.fields.forEach((field) => {
	// 		const inputRef = inputRefs[field.field];
	// 		if (inputRef && inputRef.current) {
	// 			formData[field.field] = inputRef.current.value;
	// 		}
	// 	});
	// 	return formData;
	// };

	const handleClickSave = async () => {
		setIsSaving(true);
		setError('');
		if (validateForm() === false) {
			if (props.language === 'pl') {
				setError('Wypełnij wszystkie wymagane pola.');
			} else if (props.language === 'en') {
				setError('Fill all required fields.');
			}
			return;
		}

		const dataToSave: any = {};
		props.fields.forEach((field) => {
			dataToSave[field.field] = inputValues[field.field];
		});
		const resultOk = await props.saveData(dataToSave);

		setIsSaving(false);
		if (resultOk) {
			navigate(`/${props.collection}`);
		} else if (props.language === 'pl') {
			setError('Wystąpił błąd podczas zapisu danych.');
		} else if (props.language === 'en') {
			setError('An error occurred while saving data.');
		}
	};

	let extTitle = '';
	if (props.language === 'pl') {
		switch (props.mode) {
			case 'add':
				extTitle = ' - dodawanie';
				break;
			case 'edit':
				extTitle = ' - edycja';
				break;
			case 'view':
				extTitle = ' - podgląd';
				break;
			default:
		}
	}
	if (props.language === 'en') {
		switch (props.mode) {
			case 'add':
				extTitle = ' - add';
				break;
			case 'edit':
				extTitle = ' - edit';
				break;
			case 'view':
				extTitle = ' - view';
				break;
			default:
		}
	}

	return (
		<Card minWidth="32rem" padding isPending={isSaving}>
			<Typography component="h6" userSelect="none" color="#000000">
				{props.title[props.language] + extTitle}
			</Typography>
			{props.tabs && props.tabs.length > 0 ? (
				<>
					<Tabs
						language={props.language}
						tabs={props.tabs}
						setActiveTab={handleSetActiveTab}
						activeTab={activeTab}
					/>
					<StyledVerticalGap />
				</>
			) : null}
			{error ? <Alert>{error}</Alert> : null}

			{props.fields.map((field, index) => {
				const shouldHide = activeTab !== field.tab;
				// inputRefs[field.field] = useRef(null);
				// const fieldValue = props.values?.[field?.field];

				// props.roles?.filter(item => inputValues[field.field].includes(item.value)

				switch (field.type) {
					case 'text':
					case 'number':
					case 'date':
					case 'password':
					case 'email':
					case 'datetime-local':
						return (
							<FieldContainer key={field.field} hidden={shouldHide}>
								<TextField
									label={field.label[props.language]}
									required={field.required}
									id={field.field}
									type={field.type}
									// forwardedRef={inputRefs[field.field]}
									value={inputValues?.[field.field] || ''}
									onChange={(e) => {
										setInputValues((v: any) => ({ ...v, [field.field]: e.target.value }));
									}}
									autoFocus={index === 0}
									disabled={props.mode === 'view'}
									controlled
								/>
							</FieldContainer>
						);
					case 'roles': {
						const optionsRoles = props.roles || [];
						const values = inputValues?.[field.field] || [];
						const valueRoles = optionsRoles.filter((item) => values.includes(item.value));

						return (
							<FieldContainer key={field.field} hidden={shouldHide}>
								<Select
									label={field.label[props.language]}
									options={optionsRoles}
									value={valueRoles}
									onChange={(value: SelectOption[]) => {
										setInputValues((v: any) => ({
											...v,
											[field.field]: value.map((item: SelectOption) => item.value),
										}));
									}}
									isMulti
									isClearable={false}
								/>
							</FieldContainer>
						);
					}
					default:
						return null;
				}
			})}
			<ButtonContainer>
				<Button
					label="Anuluj"
					variant="primary"
					onClick={() => {
						navigate(`/${props.collection}`);
					}}
					disabled={isSaving}
				/>
				{props.mode !== 'view' ? (
					<Button label="Zapisz" variant="accent" onClick={handleClickSave} disabled={isSaving} />
				) : null}
			</ButtonContainer>
		</Card>
	);
}
