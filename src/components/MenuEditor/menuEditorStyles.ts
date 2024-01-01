import styled from 'styled-components';

export const StyledMenuEditor = styled.div`
	width: 100%;
	max-width: 56rem;
	border: 1px solid #ccc;
	padding: 0.8rem;
	border-radius: ${(props) => props.theme.borderRadius};
	li {
		padding: 0.8rem;
		user-select: none;
	}
	li > div {
		display: flex;
		align-items: center;
	}
	li > ul {
		padding-top: 1rem;
		padding-left: 3.2rem;
	}
	li:last-child {
		opacity: 0.6;
		cursor: pointer;
	}
	.up,
	.down,
	.remove {
		cursor: pointer;
	}
	.parent > li:nth-last-child(2) > div > span > .down {
		pointer-events: none;
		opacity: 0.5;
		cursor: not-allowed;
	}
	.parent > li:first-child > div > span > .up {
		pointer-events: none;
		opacity: 0.5;
		cursor: not-allowed;
	}
	li > ul > li:first-child .up {
		pointer-events: none;
		opacity: 0.5;
		cursor: not-allowed;
	}
	li > ul > li:nth-last-child(2) .down {
		pointer-events: none;
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

export const StyledMenuContainer = styled.div`
	padding: 1.2rem;
`;

export const StyledIconContainer = styled.div`
	height: 2.4rem;
	margin-right: 0.8rem;
	width: 2.4rem;
	display: inline-block;
`;
