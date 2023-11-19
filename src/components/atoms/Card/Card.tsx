import styled, { keyframes } from 'styled-components';

interface StyledCardProps {
	$padding?: boolean;
	$minwidth: string;
	$opacity?: boolean;
	$isPending?: boolean;
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
	position: relative;
	animation: ${fadeIn} 300ms linear;
	box-shadow: ${(props) => props.theme.shadows[2]};
	color: ${(props) => props.theme.palette.element.primary.textDark};
	// display: inline-block;
	padding: ${(props) => (props.$padding ? '1.6rem' : '0')};
	// max-width: min(100%, ${(props) => props.$minwidth});
	width: 100%;
	margin-inline: auto;
	margin: 0 0.4rem;
	box-sizing: border-box;
	opacity: ${(props) => (props.$opacity ? '0.95' : '1')};
	background-color: ${(props) =>
		props.$opacity ? 'rgba(255, 255, 255, 0.9)' : props.theme.palette.background.default};
	backdrop-filter: ${(props) => (props.$opacity ? 'blur(1.5rem)' : 'none')};
	@media (min-width: 26rem) {
		border-radius: ${(props) => props.theme.shape.borderRadious};
		margin: 0 1.6rem;
		max-width: min(calc(100% - 3.2rem - 3.2rem), ${(props) => props.$minwidth});
		width: 100%;
	}
	cursor: ${(props) => (props.$isPending ? 'wait' : 'default')};
`;

interface CardProps {
	children: React.ReactNode;
	minWidth: string;
	padding?: boolean;
	opacity?: boolean;
	isPending?: boolean;
}

export function Card(props: CardProps) {
	return (
		<StyledCard
			$padding={props.padding}
			$minwidth={props.minWidth}
			$opacity={props.opacity}
			$isPending={props.isPending}
		>
			{props.children}
		</StyledCard>
	);
}
