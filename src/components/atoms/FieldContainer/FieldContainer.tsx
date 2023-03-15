import { StyledContainer, StyledMultiContainer } from './fieldContainerStyle';

interface FieldContainerProps {
	children: React.ReactNode;
	isMulti?: boolean;
}

export function FieldContainer({ children, isMulti }: FieldContainerProps) {
	return isMulti ? (
		<StyledMultiContainer>{children}</StyledMultiContainer>
	) : (
		<StyledContainer>{children}</StyledContainer>
	);
}
