import styled from 'styled-components';

export const StyledButton = styled.button<{ variant: string; width?: string }>`
	background-color: ${(props) => {
		switch (props.variant) {
			case 'primary':
				return props.theme.palette.element.primary.default;
			case 'secondary':
				return props.theme.palette.element.secondary.default;
			case 'accent':
				return props.theme.palette.element.accent.default;
			default:
				return 'inherit';
		}
	}};
	color: ${(props) => {
		switch (props.variant) {
			case 'primary':
				return props.theme.palette.element.primary.text;
			case 'secondary':
				return props.theme.palette.element.secondary.text;
			case 'accent':
				return props.theme.palette.element.accent.text;
			default:
				return 'inherit';
		}
	}};
	width: ${(props) => {
		return props.width || '100%';
	}};
	border-radius: ${(props) => props.theme.shape.borderRadious};
	box-shadow: ${(props) => props.theme.shadows[3]};
	border-color: ${(props) => {
		switch (props.variant) {
			case 'primary':
				return props.theme.palette.element.primary.border;
			case 'secondary':
				return props.theme.palette.element.secondary.border;
			case 'accent':
				return props.theme.palette.element.accent.border;
			default:
				return 'inherit';
		}
	}};
	border-width: 1px;
	border-style: solid;
	align-items: center;
	display: inline-flex;
	font-size: ${(props) => props.theme.typography.fontSize.normal};
	font-weight: ${(props) => props.theme.typography.fontWeightMedium};
	height: 44px;
	@media only screen and (min-width: ${(props) => props.theme.breakpoints.xs}) {
		height: 36px;
	}
	justify-content: center;
	outline-offset: 2px;
	padding: 0 16px;
	user-select: none;

	&:active:enabled {
		background-color: ${(props) => {
			switch (props.variant) {
				case 'primary':
					return props.theme.palette.element.primary.action;
				case 'secondary':
					return props.theme.palette.element.secondary.action;
				case 'accent':
					return props.theme.palette.element.accent.action;
				default:
					return 'inherit';
			}
		}};
	}
	&:disabled {
		opacity: 0.55;
		box-shadow: none;
	}
`;
