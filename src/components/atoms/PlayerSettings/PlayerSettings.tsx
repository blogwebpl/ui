import { useEffect, useRef, useState } from 'react'; // Import useEffect
import { MultiValue, SingleValue } from 'react-select';
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
	fromDate?: Date;
	toDate?: Date;
	onLoad: ({
		deviceId,
		fromDate,
		toDate,
	}: {
		deviceId: string;
		fromDate: string;
		toDate: string;
	}) => void;
	onClose: () => void;
}

const today = new Date();
const todayStart = new Date(
	Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)
);
const todayEnd = new Date(
	Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)
);

export function PlayerSettings({
	devices,
	onLoad,
	onClose,
	fromDate = todayStart,
	toDate = todayEnd,
}: PlayerSettingsProps) {
	if (!devices || devices.length === 0) return null;

	const fromDateRef = useRef<HTMLInputElement>(null);
	const toDateRef = useRef<HTMLInputElement>(null);

	const options: SelectOption[] = devices
		.map((device) => ({
			label: device.name,
			value: device.deviceId,
		}))
		.sort((device1, device2) => (device1.label < device2.label ? -1 : 1));

	const [device, setDevice] = useState<SelectOption | null>(
		options[0] ? options[0] : null
	);

	useEffect(() => {
		const isCurrentDeviceAvailable = options.find(
			(option) => option.value === device?.value
		);
		if (!isCurrentDeviceAvailable && options.length > 0) {
			setDevice(options[0]);
		} else if (options.length === 0) {
			setDevice(null);
		}
	}, [devices]);

	const singleDevice = Array.isArray(device)
		? device.length > 0
			? (device[0] as SelectOption).value
			: null
		: (device as SelectOption).value;

	if (!device) return null;

	return (
		<Card width="46rem" padding>
			<Typography component="h6" userSelect="none" color="#000000">
				Ustawienia trasy
			</Typography>
			<FieldContainer>
				<Select
					label="Pojazd"
					options={options}
					value={device}
					onChange={(
						newValue: MultiValue<SelectOption> | SingleValue<SelectOption>
					) => {
						if (!Array.isArray(newValue)) {
							setDevice(newValue as SelectOption | null);
						}
					}}
					isMulti={false}
					isClearable={false}
					isRequired={true}
				/>
			</FieldContainer>
			<FieldContainer isMulti>
				<TextField
					label="Od:"
					type="datetime-local"
					value={fromDate.toISOString().slice(0, 16)}
					forwardedRef={fromDateRef}
				/>
				<TextField
					label="Do:"
					type="datetime-local"
					value={toDate.toISOString().slice(0, 16)}
					forwardedRef={toDateRef}
				/>
			</FieldContainer>
			<ButtonContainer>
				<Button label="Zakończ" variant="secondary" onClick={onClose} />
				<Button
					label="Wczytaj"
					variant="primary"
					onClick={() => {
						const deviceId = singleDevice;
						const fromDate = fromDateRef.current
							? fromDateRef.current.value
							: null;
						const toDate = toDateRef.current ? toDateRef.current.value : null;
						if (deviceId && fromDate && toDate) {
							onLoad({ deviceId, fromDate, toDate });
						} else {
							console.error('Nie wszystkie wymagane dane są dostępne.');
						}
					}}
				/>
			</ButtonContainer>
		</Card>
	);
}
