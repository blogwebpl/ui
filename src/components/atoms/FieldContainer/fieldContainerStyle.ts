import styled from 'styled-components';

export const StyledContainer = styled.div`
	color: black;
	margin: 0;
	padding: 1.6rem 0 0.8rem 0;
`;

export const StyledMultiContainer = styled.div`
	color: black;
	margin: 0;
	padding: 1.6rem 0 0.8rem 0;
	display: flex;
	column-gap: 1.6rem;
	@media (max-width: 22.5rems) {
		flex-direction: column;
		row-gap: 2.4rem;
	}
`;
