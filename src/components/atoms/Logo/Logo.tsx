import { StyledLogo } from './logoStyle';

interface LogoProps {
	src: string;
}

export const Logo = (props: LogoProps) => {
	return <StyledLogo src={props.src} />;
};
