/* eslint-disable no-underscore-dangle */
import styled from 'styled-components';
import {
	MdInfo as IconInformation,
	MdCenterFocusStrong as IconCenter,
} from 'react-icons/md';
import dayjs from 'dayjs';
import { Checkbox } from '../Checkbox';
import { IconButton } from '../IconButton';

const StyledItem = styled.div<{ $info: boolean }>`
	height: ${(props) => (props.$info ? '11.2rem' : '5.6rem')};
	width: auto;
	border-bottom: 0.1rem solid #808080;
	display: flex;
	padding: 0 1.2rem;
	flex-wrap: wrap;
	overflow: hidden;
`;

const StyledCheckboxContainer = styled.div`
	height: 5.6rem;
	width: 4.8rem;
	display: flex;
	align-items: center;
`;

const StyledDetailContainer = styled.div`
	height: 5.6rem;
	flex-grow: 1;
	display: flex;
	align-items: center;
	font-size: 1.4rem;
	font-weight: bold;
	user-select: none;
	small {
		font-size: 1.2rem !important;
		font-weight: 400;
	}
`;

const StyledIconsContainer = styled.div`
	width: 9.6rem;
	height: 5.6rem;
	display: flex;
	align-items: center;
`;

const StyledIOContainer = styled.div`
	font-size: 1.2rem
	flex-grow: 1;
	height: 5.6rem
	display: flex;
	align-items: center;
	font-weight: 400;
`;

const StyledBreak = styled.div`
	flex-basis: 100%;
	height: 0;
`;

export const StyledSVG = styled.svg`
	display: inline-block;
	fill: currentColor;
	flex-shrink: 0;
	height: 2.4rem
	user-select: none;
	width: 2.4rem;
`;

export interface DeviceItemProps {
	deviceId: string;
	name: string;
	time: string;
	handleNameClick: (id: string, pos: Point) => void;
	handleNameDoubleClick: (id: string, pos: Point) => void;
	show: boolean;
	handleShowClick: (id: string, show: boolean) => void;
	info: boolean;
	handleInfoClick: (id: string, info: boolean) => void;
	follow: boolean;
	handleFollowClick: (id: string, follow: boolean) => void;
	io?: [number, number][];
	pos: [number, number];
}

export type Point = [latitude: number, longitude: number];

export interface Gps {
	pos: Point;
	alt: number;
	ang: number;
	sat: number;
	spd: number;
}

export interface Device {
	deviceId: string;
	name: string;
	show: boolean;
	info: boolean;
	follow: boolean;
	gps: Gps;
	io: [number, number][];
	st: string;
	time: string;
}

function IconBattery() {
	return (
		<StyledSVG focusable="false" viewBox="0 0 24 24" aria-hidden="true">
			<g fill="none" stroke="#000" strokeLinejoin="round" strokeMiterlimit={10}>
				<path d="M.5 6.5h23v14H.5zM3.5 3.5h4v3h-4zM16.5 3.5h4v3h-4z" />
				<path strokeLinecap="round" d="M3 12.5h5M16 12.5h5M18.5 10v5" />
			</g>
			<path fill="none" d="M0 0h24v24H0z" />{' '}
		</StyledSVG>
	);
}

export function DeviceItem(props: DeviceItemProps) {
	const { io } = props;
	const battery = io?.find((i) => i[0] === 66);
	return (
		<StyledItem $info={props.info} key={props.deviceId}>
			<StyledCheckboxContainer>
				<Checkbox
					controlled={true}
					checked={props.show}
					onChange={() => props.handleShowClick(props.deviceId, !props.show)}
				/>
			</StyledCheckboxContainer>
			<StyledDetailContainer
				onClick={() => props.handleNameClick(props.deviceId, props.pos)}
				onDoubleClick={() =>
					props.handleNameDoubleClick(props.deviceId, props.pos)
				}
			>
				<div>
					<span>{props.name}</span>
					<br />
					<small>
						{props.time && dayjs(props.time).format('YYYY-MM-DD HH:mm:ss')}
					</small>
				</div>
			</StyledDetailContainer>
			<StyledIconsContainer>
				<IconButton
					color={props.follow ? '#ff4080' : '#777777'}
					label=""
					onClick={() => props.handleFollowClick(props.deviceId, !props.follow)}
				>
					<IconCenter size="2.4rem" />
				</IconButton>
				<IconButton
					color={props.info ? '#ff4080' : '#777777'}
					label=""
					onClick={() => props.handleInfoClick(props.deviceId, !props.info)}
				>
					<IconInformation size="2.4rem" />
				</IconButton>
			</StyledIconsContainer>
			<StyledBreak />
			<StyledIOContainer>
				<IconBattery />
				&nbsp;
				{battery &&
					(Math.round(Number(battery[1]) / 10) < 100
						? (Number(battery[1]) / 10).toFixed(2)
						: (Math.round(Number(battery[1]) / 10) / 100).toFixed(2))}{' '}
				V
			</StyledIOContainer>
		</StyledItem>
	);
}
