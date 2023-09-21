import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Button } from '../atoms/Button';
import { ButtonContainer } from '../atoms/ButtonContainer';
import { Card } from '../atoms/Card';
import { FieldContainer } from '../atoms/FieldContainer';
import { Tab, Tabs } from '../atoms/Tabs';
import { TextField } from '../atoms/TextField';
import { Typography } from '../atoms/Typography';
import { Alert } from '../atoms/Alert';

const StyledVerticalGap = styled.div`
	height: 5.6rem;
`;

export interface Field {
	key: string;
	type: string;
	tab: string;
	required: boolean;
	label: string;
}

interface EditFormProps {
	tabs: Tab[];
	setActiveTab: (e: React.MouseEvent<HTMLAnchorElement>) => void;
	fields: Field[];
	values: { [key: string]: string | number | readonly string[] | undefined };
}

export function EditForm({ tabs, fields, setActiveTab, values }: EditFormProps) {
	const [error, setError] = useState('');

	const inputRefs: { [key: string]: React.RefObject<HTMLInputElement> } = {};

	const validateForm = () => {
		return fields.every((field) => {
			if (field.required) {
				const inputRef = inputRefs[field.key];
				return inputRef && inputRef.current && inputRef.current.value !== '';
			}
			return true;
		});
	};

	const getFormData = () => {
		const formData: { [key: string]: string } = {};
		fields.forEach((field) => {
			const inputRef = inputRefs[field.key];
			if (inputRef && inputRef.current) {
				formData[field.key] = inputRef.current.value;
			}
		});
		return formData;
	};

	const handleClickSave = () => {
		setError('');
		if (validateForm() === false) {
			setError('Wypełnij wszystkie wymagane pola.');
			return;
		}

		console.log(getFormData());
	};

	const activeTabLabel = tabs.find((tab) => tab.active)?.label;

	return (
		<Card minWidth="32rem" padding>
			<Typography component="h6" userSelect="none" color="#000000">
				Edycja
			</Typography>
			{tabs && tabs.length > 0 ? <Tabs tabs={tabs} setActiveTab={setActiveTab} /> : null}
			{activeTabLabel ? <StyledVerticalGap /> : null}
			{error ? <Alert>{error}</Alert> : null}

			{fields.map((field) => {
				const shouldHide = field.tab !== activeTabLabel && activeTabLabel !== undefined;
				inputRefs[field.key] = useRef(null);
				const fieldValue = values[field.key] || '';
				switch (field.type) {
					case 'text':
					case 'number':
					case 'date':
					case 'password':
					case 'email':
					case 'datetime-local':
						return (
							<FieldContainer key={field.key} hidden={shouldHide}>
								<TextField
									label={field.label}
									required={field.required}
									id={field.key}
									type={field.type}
									forwardedRef={inputRefs[field.key]}
									value={fieldValue}
								/>
							</FieldContainer>
						);
					default:
						return null;
				}
			})}
			<ButtonContainer>
				<Button label="Anuluj" variant="primary" onClick={() => {}} />
				<Button label="Zapisz" variant="accent" onClick={handleClickSave} />
			</ButtonContainer>
		</Card>
	);
}
