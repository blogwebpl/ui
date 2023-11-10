import styled from 'styled-components';

const StyledButtonContainer = styled.div`
	margin-top: 1.6rem;
	margin-bottom: 0.8rem;
	display: flex;
	column-gap: 1.6rem;

	float: right;
	width: 100%;
	@media (min-width: 26rem) {
		max-width: 36rem;
	}
`;

interface ButtonContainerProps {
	children: React.ReactNode;
}

export function ButtonContainer(props: ButtonContainerProps) {
	return <StyledButtonContainer>{props.children}</StyledButtonContainer>;
}
