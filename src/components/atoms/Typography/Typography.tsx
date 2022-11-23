import { StyledTypography } from './typographyStyle';

interface TypographyProps {
	children: React.ReactNode;
	component: string;
	userSelect?: string;
	color?: string;
}

export function Typography(props: TypographyProps) {
	return (
		<StyledTypography component={props.component} userSelect={props.userSelect} color={props.color}>
			{props.children}
		</StyledTypography>
	);
}
