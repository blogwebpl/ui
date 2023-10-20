import styled from 'styled-components';

const StyledButton = styled.button<{
	$margin?: string;
	$color?: string;
	$islightcolor?: boolean;
	disabled?: boolean;
	$mobileinvisible: boolean;
}>`
	background-color: transparent;
	border: 0;
	border-radius: 50%;
	color: ${(props) => props.$color || props.theme.palette.element.primary.text};
	cursor: pointer;
	display: flex;
	@media (max-width: 28.75rem) {
		display: ${(props) => (props.$mobileinvisible ? 'none' : 'flex')};
	}
	margin: ${(props) => props.$margin};
	outline: 0;
	padding: 1.2rem;
	position: relative;

	&:hover,
	&:focus {
		background-color: ${(props) => {
			return props.$islightcolor
				? `#eeeeee${props.theme.opacity.actions.hover * 100}`
				: `${props.color}${props.theme.opacity.actions.hover * 100}`;
		}};
	}
	&:active {
		background-color: ${(props) => {
			return props.$islightcolor
				? `#eeeeee${props.theme.opacity.actions.hover * 100}`
				: `${props.color}${props.theme.opacity.actions.hover * 100}`;
		}};
	}
	&:before {
		white-space: nowrap;
		background: #7e7e7e;
		border-radius: 7%;
		color: #eee;
		content: attr(data-label);
		font-size: 1rem;
		left: 50%;
		opacity: 0;
		padding: 0.4rem 0.5rem;
		position: absolute;
		text-align: center;
		top: -2.8rem;
		transform: translate(-50%) scale(0);
		transition: all 0.1s linear;
		visibility: hidden;
	}
	&[data-label='']:before {
		display: none;
	}
	&:not([disabled]):hover:before {
		opacity: 0.9;
		transform: translate(-50%) scale(1);
		visibility: visible;
	}
	&:disabled {
		color: #ccc;
		background-color: transparent;
	}
`;

interface IconButtonProps {
	children: React.ReactNode;
	/**
	 * Color in HEX !!!
	 */
	color?: string;
	id?: string;
	isLightColor?: boolean;
	disabled?: boolean;
	label?: string;
	ariaLabel?: string;
	margin?: string;
	onClick?: () => void;
	mobileInvisible?: boolean;
}

export function IconButton(props: IconButtonProps) {
	return (
		<StyledButton
			$color={props.color}
			data-label={props.label}
			aria-label={props.ariaLabel || props.label}
			disabled={props.disabled}
			id={props.id}
			$islightcolor={props.isLightColor}
			onClick={props.onClick}
			$margin={props.margin}
			$mobileinvisible={!!props.mobileInvisible}
		>
			{props.children}
		</StyledButton>
	);
}
