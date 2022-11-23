import { StyledAlert } from './alertStyle';

interface CardProps {
	children: React.ReactNode;
}

export function Alert({ children }: CardProps) {
	return <StyledAlert>{children}</StyledAlert>;
}
