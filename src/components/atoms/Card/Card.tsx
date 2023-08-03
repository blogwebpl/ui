import styled, { keyframes } from 'styled-components';

interface StyledCardProps {
	padding?: boolean;
	minWidth: string;
	opacity?: boolean;
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
	border-radius: ${(props) => props.theme.shape.borderRadious};
	box-shadow: ${(props) => props.theme.shadows[2]};
	color: ${(props) => props.theme.palette.element.primary.textDark};
	display: inline-block;
	padding: ${(props) => (props.padding ? '1.6rem' : '0')};
	min-width: min(calc(100% - 3.2rem), ${(props) => props.minWidth});
	margin-inline: auto;
	box-sizing: border-box;
	opacity: ${(props) => (props.opacity ? '0.95' : '1')};
	background-color: ${(props) =>
		props.opacity ? 'rgba(255, 255, 255, 0.9)' : props.theme.palette.background.default};
	backdrop-filter: ${(props) => (props.opacity ? 'blur(1.5rem)' : 'none')};
`;

interface CardProps {
	children: React.ReactNode;
	minWidth: string;
	padding?: boolean;
	opacity?: boolean;
}
export function Card(props: CardProps) {
	return (
		<StyledCard padding={props.padding} minWidth={props.minWidth} opacity={props.opacity}>
			{props.children}
		</StyledCard>
	);
}
