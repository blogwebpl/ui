import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

import {
	MdSkipPrevious,
	MdFastRewind,
	MdPause,
	MdPlayArrow,
	MdFastForward,
	MdSkipNext,
	MdEject,
} from 'react-icons/md';

import { FaAnglesDown, FaAnglesUp } from 'react-icons/fa6';

import { RiTimerLine } from 'react-icons/ri';

import styled from 'styled-components';
import { IconButton } from '../IconButton';

const StyledPlayer = styled.div`
	max-width: 43.2rem;
	height: 10rem;
	background: white;
	padding: 0.4rem 4.8rem;
	@media (max-width: 28,75rem) {
		padding: 0.4rem 2.4rem;
	}
	opacity: 0.9;
	border-radius: 0.5rem;
`;

const StyledSlider = styled.input.attrs({
	type: 'range',
})`
	width: 100%;
`;

const StyledTextContainer = styled.div`
	font-size: 1.4rem;
	color: #111111;
	display: flex;
	justify-content: space-between;
	user-select: none;
`;
const StyledLeftText = styled.div`
	display: flex;
`;
const StyledRightText = styled.div``;

const StyledControl = styled.div`
	display: flex;
	justify-content: space-around;
	margin: 0.4rem 0 0.8rem 0;
`;

const MobileInvisible = styled.span`
	@media (max-width: 28.75rem) {
		display: none;
	}
	color: #f57f17;
	opacity: 0.9;
	display: flex;
	width: auto;
	align-items: center;
	justify-content: center;
`;

interface PlayerProps {
	isPlaying: boolean;
	position: number;
	length: number;
	time: Date;
	firstTime?: Date;
	speed?: number;
	onButtonClick: (button: string) => void;
	onChange: (newPosition: number) => void;
}

export function Player({
	isPlaying,
	time,
	firstTime,
	position,
	length,
	speed,
	onChange,
	onButtonClick,
}: PlayerProps) {
	return (
		<StyledPlayer>
			<StyledTextContainer>
				<StyledLeftText>
					{dayjs(time).format('YYYY-MM-DD HH:mm:ss')}
					<MobileInvisible>
						&nbsp;&nbsp;&nbsp;
						<RiTimerLine size="1.4rem" />
						{firstTime &&
							dayjs
								.duration(dayjs(time).diff(dayjs(firstTime)))
								.format('HH:mm:ss')}
						&nbsp;&nbsp;&nbsp;{speed ? `${speed}x` : ''}
					</MobileInvisible>
				</StyledLeftText>

				<StyledRightText>
					{position}/{length}
				</StyledRightText>
			</StyledTextContainer>
			<StyledControl>
				<IconButton
					color="#000000"
					label=""
					ariaLabel="start"
					onClick={() => onButtonClick('SkipPrevious')}
				>
					<MdSkipPrevious size="2.4rem" />
				</IconButton>
				{isPlaying ? (
					<IconButton
						color="#000000"
						label=""
						ariaLabel="spowolnij"
						mobileInvisible
						onClick={() => onButtonClick('SpeedDown')}
					>
						<FaAnglesDown size="2.4rem" />
					</IconButton>
				) : (
					<IconButton
						color="#000000"
						label=""
						ariaLabel="poprzedni"
						mobileInvisible
						onClick={() => onButtonClick('FastRewind')}
					>
						<MdFastRewind size="2.4rem" />
					</IconButton>
				)}
				<IconButton
					color="#000000"
					label=""
					ariaLabel="pauza"
					onClick={() => onButtonClick('Pause')}
				>
					<MdPause size="2.4rem" color={isPlaying ? 'black' : 'red'} />
				</IconButton>
				<IconButton
					color="#000000"
					label=""
					ariaLabel="odtwórz"
					onClick={() => onButtonClick('Play')}
				>
					<MdPlayArrow size="2.4rem" color={isPlaying ? 'red' : 'black'} />
				</IconButton>
				{isPlaying ? (
					<IconButton
						color="#000000"
						label=""
						ariaLabel="przyspiesz"
						mobileInvisible
						onClick={() => onButtonClick('SpeedUp')}
					>
						<FaAnglesUp size="2.4rem" />
					</IconButton>
				) : (
					<IconButton
						color="#000000"
						label=""
						ariaLabel="następny"
						mobileInvisible
						onClick={() => onButtonClick('FastForward')}
					>
						<MdFastForward size="2.4rem" />
					</IconButton>
				)}
				<IconButton
					color="#000000"
					label=""
					ariaLabel="koniec"
					onClick={() => onButtonClick('SkipNext')}
				>
					<MdSkipNext size="2.4rem" />
				</IconButton>
				<IconButton
					color="#000000"
					label=""
					ariaLabel="opcje"
					onClick={() => onButtonClick('Eject')}
				>
					<MdEject size="2.4rem" />
				</IconButton>
			</StyledControl>
			<StyledSlider
				min="1"
				max={length}
				value={position}
				onChange={(e) => onChange(parseInt(e.target.value, 10))}
			/>
		</StyledPlayer>
	);
}
