import styled from 'styled-components';

export const StyledLogo = styled.img<{
	$height?: string;
}>`
	display: block;
	margin-bottom: 0.8rem;
	max-width: 28rem;
	user-select: none;
	width: 100%;
	height: ${(props) => props.$height || 'auto'};
`;
