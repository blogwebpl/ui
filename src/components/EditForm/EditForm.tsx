import { useState } from 'react';
import { Button } from '../atoms/Button';
import { ButtonContainer } from '../atoms/ButtonContainer';
import { Card } from '../atoms/Card';
import { FieldContainer } from '../atoms/FieldContainer';
import { Tab, Tabs } from '../atoms/Tabs';
import { TextField } from '../atoms/TextField';
import { Typography } from '../atoms/Typography';

interface EditFormProps {
	tabs: Tab[];
	setActiveTab: (e: React.MouseEvent<HTMLAnchorElement>) => void;
	fields: any[]; // TODO: define type
}
export function EditForm({ tabs, fields, setActiveTab }: EditFormProps) {
	const [error, setError] = useState('');

	const handleClickSave = () => {
		console.log({ fields });
	};

	const activeTabLabel = tabs.find((tab) => tab.active)?.label;
	const filteredFields = activeTabLabel
		? fields.filter((field) => field.tab === activeTabLabel)
		: fields;

	return (
		<Card minWidth="32rem" padding>
			<Typography component="h6" userSelect="none" color="#000000">
				Edycja
			</Typography>
			<Tabs tabs={tabs} setActiveTab={setActiveTab} />
			{error ? <Alert>{error}</Alert> : null}
			{activeTabLabel ? (
				<>
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
				</>
			) : null}
			{/* <FieldContainer> */}
			{filteredFields.map((field) => {
				switch (field.type) {
					case 'text':
						return (
							<FieldContainer key={field.key}>
								<TextField
									label={field.label}
									required={field.required}
									id={field.key}
									type="text"
								/>
							</FieldContainer>
						);
					case 'password':
						return (
							<FieldContainer key={field.key}>
								<TextField
									label={field.label}
									required={field.required}
									id={field.key}
									type="password"
								/>
							</FieldContainer>
						);
					case 'number':
						return (
							<FieldContainer key={field.key}>
								<TextField
									label={field.label}
									required={field.required}
									id={field.key}
									type="number"
								/>
							</FieldContainer>
						);
					case 'date':
						return (
							<FieldContainer key={field.key}>
								<TextField
									label={field.label}
									required={field.required}
									id={field.key}
									type="date"
								/>
							</FieldContainer>
						);
					case 'datetime':
						return (
							<FieldContainer key={field.key}>
								<TextField
									label={field.label}
									required={field.required}
									id={field.key}
									type="datetime-local"
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
