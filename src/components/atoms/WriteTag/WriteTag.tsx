import styled from 'styled-components';
import { MdOutlineNfc } from 'react-icons/md';

const StyledWriteTag = styled.div`
	display: flex;
	color: red;
	width: 100%;
	height: 6.4rem;
	padding: 0.8rem;
	align-items: center;
	justify-content: flex-start;
	border: 1px solid black;
	svg {
		width: 4.8rem;
		height: 4.8rem;
	}

	button {
		font-weight: 700;
		width: 12rem;
		height: 3rem;
	}
`;

interface WriteTagProps {
	writeTagFunction: (data: any) => Promise<boolean>;
	data: any;
}

export function WriteTag(props: WriteTagProps) {
	return (
		<StyledWriteTag>
			<MdOutlineNfc />
			<button onClick={() => props.writeTagFunction(props.data)}>ZAPISZ</button>
		</StyledWriteTag>
	);
}
