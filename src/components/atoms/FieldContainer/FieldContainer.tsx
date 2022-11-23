import { StyledContainer } from './fieldContainerStyle';

interface FieldContainerProps {
	children: React.ReactNode;
}

export function FieldContainer({ children }: FieldContainerProps) {
	return <StyledContainer>{children}</StyledContainer>;
}
