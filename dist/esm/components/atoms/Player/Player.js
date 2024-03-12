import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import dayjs from 'dayjs';
import { MdSkipPrevious, MdFastRewind, MdPause, MdPlayArrow, MdFastForward, MdSkipNext, MdEject, } from 'react-icons/md';
import styled from 'styled-components';
import { IconButton } from '../IconButton';
const StyledPlayer = styled.div `
	max-width: 43.2rem;
	height: 10rem;
	background: white;
	padding: 0.4rem 4.8rem;
	@media (max-width: 28,75rem) {
		padding: 0.4rem 2.4rem;
	}
	opacity: 0.9;
`;
const StyledSlider = styled.input.attrs({
    type: 'range',
}) `
	width: 100%;
`;
const StyledTextContainer = styled.div `
	font-size: 1.4rem;
	color: #111111;
	display: flex;
	justify-content: space-between;
	user-select: none;
`;
const StyledLeftText = styled.div ``;
const StyledRightText = styled.div ``;
const StyledControl = styled.div `
	display: flex;
	justify-content: space-around;
	margin: 0.4rem 0 0.8rem 0;
`;
export function Player({ isPlaying, time, position, length, onChange, onButtonClick, }) {
    return (_jsxs(StyledPlayer, { children: [_jsxs(StyledTextContainer, { children: [_jsx(StyledLeftText, { children: dayjs(time).format('YYYY-MM-DD HH:mm:ss') }), _jsxs(StyledRightText, { children: [position, "/", length] })] }), _jsxs(StyledControl, { children: [_jsx(IconButton, { color: "#000000", label: "", ariaLabel: "start", onClick: () => onButtonClick('SkipPrevious'), children: _jsx(MdSkipPrevious, { size: "2.4rem" }) }), _jsx(IconButton, { color: "#000000", label: "", ariaLabel: "poprzedni", mobileInvisible: true, onClick: () => onButtonClick('FastRewind'), children: _jsx(MdFastRewind, { size: "2.4rem" }) }), _jsx(IconButton, { color: "#000000", label: "", ariaLabel: "pauza", onClick: () => onButtonClick('Pause'), children: _jsx(MdPause, { size: "2.4rem", color: isPlaying ? 'black' : 'red' }) }), _jsx(IconButton, { color: "#000000", label: "", ariaLabel: "odtw\u00F3rz", onClick: () => onButtonClick('Play'), children: _jsx(MdPlayArrow, { size: "2.4rem", color: isPlaying ? 'red' : 'black' }) }), _jsx(IconButton, { color: "#000000", label: "", ariaLabel: "nast\u0119pny", mobileInvisible: true, onClick: () => onButtonClick('FastForward'), children: _jsx(MdFastForward, { size: "2.4rem" }) }), _jsx(IconButton, { color: "#000000", label: "", ariaLabel: "koniec", onClick: () => onButtonClick('SkipNext'), children: _jsx(MdSkipNext, { size: "2.4rem" }) }), ' ', _jsx(IconButton, { color: "#000000", label: "", ariaLabel: "opcje", onClick: () => onButtonClick('Eject'), children: _jsx(MdEject, { size: "2.4rem" }) })] }), _jsx(StyledSlider, { min: "1", max: length, value: position, onChange: (e) => onChange(parseInt(e.target.value, 10)) })] }));
}
//# sourceMappingURL=Player.js.map