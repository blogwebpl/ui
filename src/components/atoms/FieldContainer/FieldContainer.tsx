import { StyledContainer, StyledMultiContainer } from './fieldContainerStyle';

interface FieldContainerProps {
	children: React.ReactNode;
	isMulti?: boolean;
	hidden?: boolean;
}

export function FieldContainer({ children, isMulti, hidden }: FieldContainerProps) {
	return isMulti ? (
		<StyledMultiContainer hidden={hidden}>{children}</StyledMultiContainer>
	) : (
		<StyledContainer hidden={hidden}>{children}</StyledContainer>
	);
}
