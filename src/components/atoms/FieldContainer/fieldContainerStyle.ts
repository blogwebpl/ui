import styled from 'styled-components';

export const StyledContainer = styled.div`
	color: black;
	margin: 0;
	padding: 16px 0 8px 0;
`;

export const StyledMultiContainer = styled.div`
	color: black;
	margin: 0;
	padding: 16px 0 8px 0;
	display: flex;
	column-gap: 16px;
	@media (max-width: 320px) {
		flex-direction: column;
		row-gap: 24px;
	}
`;
