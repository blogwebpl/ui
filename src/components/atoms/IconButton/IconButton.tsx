import styled from 'styled-components';

const StyledButton = styled.button<{
	margin?: string;
	color?: string;
	isLightColor?: boolean;
	disabled?: boolean;
	mobileInvisible: boolean;
}>`
	background-color: transparent;
	border: 0;
	border-radius: 50%;
	color: ${(props) => props.color || props.theme.palette.element.primary.text};
	cursor: pointer;
	display: flex;
	@media (max-width: 460px) {
		display: ${(props) => (props.mobileInvisible ? 'none' : 'flex')};
	}
	margin: ${(props) => props.margin};
	outline: 0;
	padding: 12px;
	position: relative;

	&:hover,
	&:focus {
		background-color: ${(props) => {
			return props.isLightColor
				? `#eeeeee${props.theme.opacity.actions.hover * 100}`
				: `${props.color}${props.theme.opacity.actions.hover * 100}`;
		}};
	}
	&:active {
		background-color: ${(props) => {
			return props.isLightColor
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
		font-size: 10px;
		left: 50%;
		opacity: 0;
		padding: 4px 5px;
		position: absolute;
		text-align: center;
		top: -28px;
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
	isDisabled?: boolean;
	label?: string;
	ariaLabel?: string;
	margin?: string;
	onClick?: () => void;
	mobileInvisible?: boolean;
}

export function IconButton(props: IconButtonProps) {
	return (
		<StyledButton
			color={props.color}
			data-label={props.label}
			aria-label={props.ariaLabel || props.label}
			disabled={props.isDisabled}
			id={props.id}
			isLightColor={props.isLightColor}
			onClick={props.onClick}
			margin={props.margin}
			mobileInvisible={!!props.mobileInvisible}
		>
			{props.children}
		</StyledButton>
	);
}
