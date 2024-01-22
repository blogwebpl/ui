import { StyledTypography } from './typographyStyle';

interface TypographyProps {
	children: React.ReactNode;
	component: string;
	userSelect?: string;
	color?: string;
	width?: string;
	background?: string;
}

export function Typography(props: TypographyProps) {
	return (
		<StyledTypography
			$component={props.component}
			$userselect={props.userSelect}
			$color={props.color}
			$width={props.width}
			$background={props.background}
		>
			{props.children}
		</StyledTypography>
	);
}
