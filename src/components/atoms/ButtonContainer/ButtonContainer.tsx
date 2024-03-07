import styled from 'styled-components';

const StyledButtonContainer = styled.div`
	margin-top: 1.2rem;
	margin-bottom: 0.8rem;
	display: flex;
	column-gap: 1.6rem;

	float: right;
	width: 100%;
	max-width: 36rem;
	button {
		flex: 1;
		max-width: 50%;
		margin-left: auto;
	}
	button.w100 {
		max-width: 100%;
	}
`;

interface ButtonContainerProps {
	children: React.ReactNode;
}

export function ButtonContainer(props: ButtonContainerProps) {
	return <StyledButtonContainer>{props.children}</StyledButtonContainer>;
}
