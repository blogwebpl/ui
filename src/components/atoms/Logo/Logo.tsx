import { StyledLogo } from './logoStyle';

interface LogoProps {
	src: string;
	height?: string;
	margin?: string;
}

export const Logo = (props: LogoProps) => {
	return <StyledLogo src={props.src} alt="" $height={props.height} $margin={props.margin} />;
};
