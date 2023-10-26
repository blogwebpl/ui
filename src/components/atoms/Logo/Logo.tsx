import { StyledLogo } from './logoStyle';

interface LogoProps {
	src: string;
	height?: string;
}

export const Logo = (props: LogoProps) => {
	return <StyledLogo src={props.src} alt="" $height={props.height} />;
};
