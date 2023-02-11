import styled from 'styled-components';

const StyledButtonContainer = styled.div`
	margin-top: 16px;
	margin-bottom: 8px;
	display: flex;
	column-gap: 16px;
`;

interface ButtonContainerProps {
	children: React.ReactNode;
}

export function ButtonContainer(props: ButtonContainerProps) {
	return <StyledButtonContainer>{props.children}</StyledButtonContainer>;
}
