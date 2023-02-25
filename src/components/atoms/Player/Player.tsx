import dayjs from 'dayjs';
import {
	MdSkipPrevious,
	MdFastRewind,
	MdPause,
	MdPlayArrow,
	MdFastForward,
	MdSkipNext,
	MdEject,
} from 'react-icons/md';
import styled from 'styled-components';
import { IconButton } from '../IconButton';

const StyledPlayer = styled.div`
	max-width: 432;
	height: 100px;
	background: white;
	padding: 4px 48px;
	@media (max-width: 460px) {
		padding: 4px 24px;
	}
	opacity: 0.9;
`;

const StyledSlider = styled.input.attrs({
	type: 'range',
})`
	width: 100%;
`;

const StyledTextContainer = styled.div`
	font-size: 14px;
	color: #111111;
	display: flex;
	justify-content: space-between;
	user-select: none;
`;
const StyledLeftText = styled.div``;
const StyledRightText = styled.div``;

const StyledControl = styled.div`
	display: flex;
	margin: 4px 0 8px 0;
`;

interface PlayerProps {
	isPlaying: boolean;
	position: number;
	length: number;
	time: Date;
	onButtonClick: (button: string) => void;
	onChange: (newPosition: number) => void;
}

export function Player({
	isPlaying,
	time,
	position,
	length,
	onChange,
	onButtonClick,
}: PlayerProps) {
	return (
		<StyledPlayer>
			<StyledTextContainer>
				<StyledLeftText>{dayjs(time).format('YYYY-MM-DD HH:mm:ss')}</StyledLeftText>
				<StyledRightText>
					{position}/{length}
				</StyledRightText>
			</StyledTextContainer>
			<StyledControl>
				<IconButton
					color="#000000"
					label="start"
					ariaLabel="start"
					onClick={() => onButtonClick('SkipPrevious')}
				>
					<MdSkipPrevious size={24} />
				</IconButton>
				<IconButton
					color="#000000"
					label="poprzedni"
					ariaLabel="poprzedni"
					mobileInvisible
					onClick={() => onButtonClick('FastRewind')}
				>
					<MdFastRewind size={24} />
				</IconButton>
				<IconButton
					color="#000000"
					label="pauza"
					ariaLabel="pauza"
					onClick={() => onButtonClick('Pause')}
				>
					<MdPause size={24} color={isPlaying ? 'black' : 'red'} />
				</IconButton>
				<IconButton
					color="#000000"
					label="odtwórz"
					ariaLabel="odtwórz"
					onClick={() => onButtonClick('Play')}
				>
					<MdPlayArrow size={24} color={isPlaying ? 'red' : 'black'} />
				</IconButton>
				<IconButton
					color="#000000"
					label="następny"
					ariaLabel="następny"
					mobileInvisible
					onClick={() => onButtonClick('FastForward')}
				>
					<MdFastForward size={24} />
				</IconButton>
				<IconButton
					color="#000000"
					label="koniec"
					ariaLabel="koniec"
					onClick={() => onButtonClick('SkipNext')}
				>
					<MdSkipNext size={24} />
				</IconButton>{' '}
				<IconButton
					color="#000000"
					label="opcje"
					ariaLabel="opcje"
					onClick={() => onButtonClick('Eject')}
				>
					<MdEject size={24} />
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
