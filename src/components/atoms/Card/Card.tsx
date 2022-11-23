import styled, { keyframes } from 'styled-components';

interface StyledCardProps {
	padding?: boolean;
	minWidth: string;
}

const fadeIn = keyframes`
	0% {
		opacity: 0.0;
	}
	100% {
		opacity: 1
	}
`;

const StyledCard = styled.div<StyledCardProps>`
	animation: ${fadeIn} 300ms linear;
	background-color: ${(props) => props.theme.palette.background.default};
	border-radius: ${(props) => props.theme.shape.borderRadious};
	box-shadow: ${(props) => props.theme.shadows[2]};
	color: ${(props) => props.theme.palette.element.primary.text};
	display: inline-block;
	padding: ${(props) => (props.padding ? '16px' : '0')};
	width: min(calc(100% - 2rem), ${(props) => props.minWidth});
	margin-inline: auto;
	box-sizing: border-box;
`;

interface CardProps {
	children: React.ReactNode;
	minWidth: string;
	padding?: boolean;
}
export function Card(props: CardProps) {
	return (
		<StyledCard padding={props.padding} minWidth={props.minWidth}>
			{props.children}
		</StyledCard>
	);
}
