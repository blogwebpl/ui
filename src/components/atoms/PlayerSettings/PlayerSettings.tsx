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
	onLoad: ({
		deviceId,
		dateFrom,
		dateTo,
	}: {
		deviceId: string;
		dateFrom: string;
		dateTo: string;
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
}: PlayerSettingsProps) {
	if (!devices || devices.length === 0) return null;

	const dateFromRef = useRef<HTMLInputElement>(null);
	const dateToRef = useRef<HTMLInputElement>(null);

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
			<ButtonContainer>
				<Button label="Zakończ" variant="secondary" onClick={onClose} />
				<Button
					label="Wczytaj"
					variant="primary"
					onClick={() => {
						const deviceId = singleDevice;
						const dateFrom = dateFromRef.current
							? dateFromRef.current.value
							: null;
						const dateTo = dateToRef.current ? dateToRef.current.value : null;
						if (deviceId && dateFrom && dateTo) {
							onLoad({ deviceId, dateFrom, dateTo });
						} else {
							console.error('Nie wszystkie wymagane dane są dostępne.');
						}
					}}
				/>
			</ButtonContainer>
		</Card>
	);
}
