import { StyledTypography } from './typographyStyle';

interface TypographyProps {
	children: React.ReactNode;
	component: string;
	userSelect?: string;
	color?: string;
	width?: string;
}

export function Typography(props: TypographyProps) {
	return (
		<StyledTypography
			component={props.component}
			userSelect={props.userSelect}
			color={props.color}
			width={props.width}
		>
			{props.children}
		</StyledTypography>
	);
}
