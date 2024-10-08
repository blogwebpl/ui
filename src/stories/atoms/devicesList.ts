import { Device } from '../../components/atoms/DeviceItem';

export const devicesList: Device[] = [
	{
		deviceId: '123',
		name: 'Opel',
		time: new Date().toString(),
		show: false,
		follow: false,
		info: false,
		gps: { pos: [18, 53], alt: 1, ang: 45, sat: 5, spd: 35 },
		io: [
			[1, 1],
			[66, 12678],
		],
		st: new Date().toString(),
	},
	{
		deviceId: '456',
		name: 'Mazda',
		time: new Date().toString(),
		show: false,
		follow: false,
		info: false,
		gps: { pos: [18, 53], alt: 1, ang: 45, sat: 5, spd: 35 },
		io: [
			[1, 1],
			[66, 12000],
		],
		st: new Date().toString(),
	},
];
