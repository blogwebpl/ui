import { StyledContainer, StyledMultiContainer } from './fieldContainerStyle';

interface FieldContainerProps {
	children: React.ReactNode;
	isMulti?: boolean;
	hidden?: boolean;
	id?: string;
}

export function FieldContainer({ children, isMulti, hidden, id }: FieldContainerProps) {
	return isMulti ? (
		<StyledMultiContainer id={`container-${id}`} key={`container-${id}`} hidden={hidden}>
			{children}
		</StyledMultiContainer>
	) : (
		<StyledContainer id={`container-${id}`} key={`container-${id}`} hidden={hidden}>
			{children}
		</StyledContainer>
	);
}
