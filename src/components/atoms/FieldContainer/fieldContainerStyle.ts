import styled from 'styled-components';

export const StyledContainer = styled.div`
	color: black;
	margin: 0;
	padding: 1.6rem 0 0.8rem 0;
	display: ${(props) => (props.hidden ? 'none' : 'flex')};
`;

export const StyledMultiContainer = styled.div<{ hidden2?: boolean }>`
	color: black;
	margin: 0;
	padding: 1.6rem 0 0.8rem 0;
	display: ${(props) => (props.hidden ? 'none' : 'flex')};
	column-gap: 1.6rem;
	@media (max-width: 22.5rems) {
		flex-direction: column;
		row-gap: 2.4rem;
	}
`;
