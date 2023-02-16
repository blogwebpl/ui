import styled from 'styled-components';
import { MdInfo as IconInformation, MdCenterFocusStrong as IconCenter } from 'react-icons/md';
import dayjs from 'dayjs';
import { Checkbox } from '../Checkbox';
import { IconButton } from '../IconButton';

const StyledItem = styled.div<{ info: boolean }>`
	height: ${(props) => (props.info ? '112px' : '56px')};
	width: auto;
	border-bottom: 1px solid #808080;
	display: flex;
	padding: 0 12px;
	flex-wrap: wrap;
	overflow: hidden;
`;

const StyledCheckboxContainer = styled.div`
	height: 56px;
	width: 48px;
	display: flex;
	align-items: center;
`;

const StyledDetailContainer = styled.div`
	height: 56px;
	flex-grow: 1;
	display: flex;
	align-items: center;
	font-size: 14px;
	font-weight: bold;
	user-select: none;
	small {
		font-size: 12px !important;
		font-weight: 400;
	}
`;

const StyledIconsContainer = styled.div`
	width: 96px;
	height: 56px;
	display: flex;
	align-items: center;
`;

const StyledIOContainer = styled.div`
	flex-grow: 1;
	height: 56px;
	display: flex;
	align-items: center;
`;

const StyledBreak = styled.div`
	flex-basis: 100%;
	height: 0;
`;

export const StyledSVG = styled.svg`
	display: inline-block;
	fill: currentColor;
	flex-shrink: 0;
	height: 24px;
	user-select: none;
	width: 24px;
`;

export interface DeviceItemProps {
	vid: string;
	name: string;
	time: Date;
	handleNameClick: (vid: string) => void;
	show: boolean;
	handleShowClick: (vid: string) => void;
	info: boolean;
	handleInfoClick: (vid: string) => void;
	follow: boolean;
	handleFollowClick: (vid: string) => void;
	io?: { [key: string]: [number, number] };
}

export interface Gps {
	pos: [number, number];
	alt: number;
	ang: number;
	sat: number;
	spd: number;
}

export interface Device {
	_id: string;
	name: string;
	show: boolean;
	info: boolean;
	follow: boolean;
	vid: string;
	gps: Gps | {};
	io: { [key: string]: [number, number] };
	st: Date;
	time: Date;
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
	return (
		<StyledItem info={props.info} key={props.vid}>
			<StyledCheckboxContainer>
				<Checkbox
					controlled={true}
					checked={props.show}
					onChange={() => props.handleShowClick(props.vid)}
				/>
			</StyledCheckboxContainer>
			<StyledDetailContainer onClick={() => props.handleNameClick(props.vid)}>
				<div>
					<span>{props.name}</span>
					<br />
					<small>{props.time && dayjs(props.time).format('YYYY-MM-DD HH:mm:ss')}</small>
				</div>
			</StyledDetailContainer>
			<StyledIconsContainer>
				<IconButton
					color={props.follow ? '#ff4080' : '#777777'}
					label=""
					onClick={() => props.handleFollowClick(props.vid)}
				>
					<IconCenter size={24} />
				</IconButton>
				<IconButton
					color={props.info ? '#ff4080' : '#777777'}
					label=""
					onClick={() => props.handleInfoClick(props.vid)}
				>
					<IconInformation size={24} />
				</IconButton>
			</StyledIconsContainer>
			<StyledBreak />
			<StyledIOContainer>
				<IconBattery />
			</StyledIOContainer>
		</StyledItem>
	);
}
