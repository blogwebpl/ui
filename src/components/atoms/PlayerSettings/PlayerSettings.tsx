import { useState } from 'react';
import { Button } from '../Button';
import { ButtonContainer } from '../ButtonContainer';
import { Card } from '../Card';
import { Device } from '../DeviceItem';
import { FieldContainer } from '../FieldContainer';
import { Select, SelectOption } from '../Select';
import { TextField } from '../TextField';
import { Typography } from '../Typography';

interface PlayerSettingsProps {
	devices: Device[];
	onLoad: () => void;
	onClose: () => void;
	onCancel: () => void;
}

const today = new Date();
const todayStart = new Date(
	Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)
);
const todayEnd = new Date(
	Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)
);

export function PlayerSettings({ devices, onLoad, onClose, onCancel }: PlayerSettingsProps) {
	const options: SelectOption[] = devices
		.map((device) => ({
			label: device.name,
			value: device.vid,
		}))
		.sort((device1, device2) => (device1.label < device2.label ? -1 : 1));

	const [value, setValue] = useState<SelectOption | null>(options ? options[0] : null);

	return (
		<Card minWidth="320px" padding>
			<Typography component="h6" userSelect="none" color="#000000">
				Ustawienia trasy
			</Typography>
			<FieldContainer isMulti>
				<TextField
					label="Od:"
					type="datetime-local"
					value={todayStart.toISOString().slice(0, 16)}
				/>
				<TextField label="Do:" type="datetime-local" value={todayEnd.toISOString().slice(0, 16)} />
			</FieldContainer>
			<FieldContainer>
				<Select
					label="Pojazd"
					options={options}
					value={value}
					onChange={setValue}
					isMulti={false}
					isClearable={false}
					isRequired={true}
				/>
			</FieldContainer>
			<ButtonContainer>
				<Button label="Zakończ" variant="secondary" onClick={onClose} />
				<Button label="Anuluj" variant="primary" onClick={onCancel} />
			</ButtonContainer>
			<ButtonContainer>
				<Button label="Wczytaj" variant="accent" onClick={onLoad} />
			</ButtonContainer>
		</Card>
	);
}
