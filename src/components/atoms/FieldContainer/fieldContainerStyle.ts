import styled from 'styled-components';

export const StyledContainer = styled.div`
	color: black;
	margin: 0;
	padding: 1.6rem 0 0.8rem 0;
	display: ${(props) => (props.hidden ? 'none' : 'block')};
	position: relative;
`;

export const StyledMultiContainer = styled.div<{ hidden?: boolean }>`
	color: black;
	padding: 1.6rem 0 0.8rem 0;
	display: ${(props) => (props.hidden ? 'none' : 'grid')};
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: 2.4rem;
`;
