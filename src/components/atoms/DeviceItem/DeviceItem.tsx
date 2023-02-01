import styled from 'styled-components';
import { MdInfo as IconInformation, MdCenterFocusStrong as IconCenter } from 'react-icons/md';
import { useState } from 'react';
import dayjs from 'dayjs';
import { Checkbox } from '../Checkbox';
import { IconButton } from '../IconButton';

const StyledItem = styled.div<{ showInfo: boolean }>`
	height: ${(props) => (props.showInfo ? '112px' : '56px')};
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
	date: Date;
	checked: boolean;
	toggleChecked: any;
	onClick: any;
	center: boolean;
	toggleCenter: any;
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
	const [showInfo, setShowInfo] = useState<boolean>(false);
	return (
		<StyledItem showInfo={showInfo} key={props.vid}>
			<StyledCheckboxContainer>
				<Checkbox
					controlled={true}
					checked={props.checked}
					onChange={() => props.toggleChecked(props.vid)}
				/>
			</StyledCheckboxContainer>
			<StyledDetailContainer onClick={() => props.onClick(props.vid)}>
				<div>
					<span>{props.name}</span>
					<br />
					<small>{props.date && dayjs(props.date).format('YYYY-MM-DD HH:mm:ss')}</small>
				</div>
			</StyledDetailContainer>
			<StyledIconsContainer>
				<IconButton
					color={props.center ? '#ff4080' : '#777777'}
					label=""
					onClick={() => props.toggleCenter(props.vid)}
				>
					<IconCenter size={24} />
				</IconButton>
				<IconButton
					color={showInfo ? '#ff4080' : '#777777'}
					label=""
					onClick={() => setShowInfo(!showInfo)}
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
