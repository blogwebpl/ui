/* eslint-disable no-alert */
import { useEffect, useState } from 'react';
import { Main } from '../../components/atoms/Main';

import { Player } from '../../components/atoms/Player';

const Template = (args: any) => {
	const length = 1000;
	const [position, setPosition] = useState<number>(1);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [time, setTime] = useState<Date>(new Date());

	useEffect(() => {
		let intervalId: NodeJS.Timeout;
		if (isPlaying) {
			intervalId = setInterval(() => {
				setPosition((pos) => {
					if (pos + 1 >= length) setIsPlaying(false);
					setTime(new Date());
					return pos === length ? pos : pos + 1;
				});
			}, 1000);
		}
		return () => clearInterval(intervalId);
	}, [isPlaying]);

	const handlePositionChange = (newPosition: number) => {
		setTime(new Date());
		setPosition(newPosition);
	};
	const handleButtonClick = (button: string) => {
		// eslint-disable-next-line default-case
		switch (button) {
			case 'Play':
				if (position < length) {
					setPosition((pos) => pos + 1);
					setIsPlaying(true);
				}
				break;
			case 'Pause':
				setIsPlaying(false);
				break;
			case 'Eject':
				setIsPlaying(false);
				alert('open settings');
				break;
			case 'SkipPrevious':
				setPosition(1);
				break;
			case 'FastRewind':
				setPosition((pos) => (pos > 1 ? pos - 1 : pos));
				break;
			case 'FastForward':
				setPosition((pos) => (pos < length ? pos + 1 : pos));
				break;
			case 'SkipNext':
				setIsPlaying(false);
				setPosition(length);
				break;
		}
	};

	return (
		<Main isCovered={false} isDrawerOpen={false} setIsDrawerOpen={null}>
			<Player
				{...args}
				position={position}
				onChange={handlePositionChange}
				onButtonClick={handleButtonClick}
				isPlaying={isPlaying}
				time={time}
			/>
		</Main>
	);
};

export default {
	title: 'atoms/Player',
	component: Template,
};

export const Default = {
	args: {
		isPlaying: true,
		time: new Date(),
		position: 1,
		length: 1000,
	},
};
