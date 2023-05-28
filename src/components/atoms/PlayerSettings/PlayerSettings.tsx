import { useRef, useState } from 'react';
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
	onLoad: ({ vid, dateFrom, dateTo }: { vid: string; dateFrom: string; dateTo: string }) => void;
	onClose: () => void;
}

const today = new Date();
const todayStart = new Date(
	Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)
);
const todayEnd = new Date(
	Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)
);

export function PlayerSettings({ devices, onLoad, onClose }: PlayerSettingsProps) {
	const dateFromRef = useRef<HTMLInputElement>(null);
	const dateToRef = useRef<HTMLInputElement>(null);

	const options: SelectOption[] = devices
		.map((device) => ({
			label: device.name,
			value: device.vid,
		}))
		.sort((device1, device2) => (device1.label < device2.label ? -1 : 1));

	const [device, setDevice] = useState<SelectOption | null>(options ? options[0] : null);

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
					forwardedRef={dateFromRef}
				/>
				<TextField
					label="Do:"
					type="datetime-local"
					value={todayEnd.toISOString().slice(0, 16)}
					forwardedRef={dateToRef}
				/>
			</FieldContainer>
			<FieldContainer>
				<Select
					label="Pojazd"
					options={options}
					value={device}
					onChange={setDevice}
					isMulti={false}
					isClearable={false}
					isRequired={true}
				/>
			</FieldContainer>
			<ButtonContainer>
				<Button label="Zakończ" variant="primary" onClick={onClose} />
				<Button
					label="Wczytaj"
					variant="accent"
					onClick={() => {
						const vid = device?.value || '';
						const dateFrom = dateFromRef.current!.value;
						const dateTo = dateToRef.current!.value;
						onLoad({ vid, dateFrom, dateTo });
					}}
				/>
			</ButtonContainer>
		</Card>
	);
}
