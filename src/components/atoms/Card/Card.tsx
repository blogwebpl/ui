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
	padding: ${(props) => (props.$padding ? '1.6rem' : '0')};
	width: 100%;
	margin-inline: auto;
	margin: 0.8rem 0.4rem;
	box-sizing: border-box;
	opacity: ${(props) => (props.$opacity ? '0.95' : '1')};
	background-color: ${(props) =>
		props.$opacity ? 'rgba(255, 255, 255, 0.9)' : props.theme.palette.background.default};
	backdrop-filter: ${(props) => (props.$opacity ? 'blur(1.5rem)' : 'none')};
	@media (min-width: 26rem) {
		border-radius: ${(props) => props.theme.shape.borderRadious};
		margin: 0.8rem 1.6rem;
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

/**
 * Renders a styled card component with optional padding, opacity, and pending state.
 * @param {string} minWidth - The minimum width of the card.
 * @param {boolean} [padding] - Determines if the card should have padding.
 * @param {boolean} [opacity] - Determines if the card should have reduced opacity.
 * @param {boolean} [isPending] - Determines if the card should show a waiting cursor.
 * @returns {JSX.Element} The styled card component.
 */

export function Card(props: CardProps) {
	return (
		<StyledCard
			className='card'
			$padding={props.padding}
			$minwidth={props.minWidth}
			$opacity={props.opacity}
			$isPending={props.isPending}
		>
			{props.children}
		</StyledCard>
	);
}
