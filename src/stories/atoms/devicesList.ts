import { Device } from '../../components/atoms/DeviceItem';

export const devicesList: Device[] = [
	{
		_id: '123',
		vid: 'oa',
		name: 'Opel',
		time: new Date(),
		show: false,
		follow: false,
		info: false,
		gps: { pos: [18, 53], alt: 1, ang: 45, sat: 5, spd: 35 },
		io: [
			[1, 1],
			[66, 12678],
		],
		st: new Date(),
	},
	{
		_id: '456',
		vid: 'm3',
		name: 'Mazda',
		time: new Date(),
		show: false,
		follow: false,
		info: false,
		gps: { pos: [18, 53], alt: 1, ang: 45, sat: 5, spd: 35 },
		io: [
			[1, 1],
			[66, 12000],
		],
		st: new Date(),
	},
];
