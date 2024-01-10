import styled from 'styled-components';

export const StyledMenuEditor = styled.div`
	label:first-child {
		padding: 0.6rem 0.4rem;
		background-color: white;
		top: -1.3rem;
		left: -0.2rem;
		position: relative;
		font-size: 1.2rem;
		color: #00000080;
		display: inline-block;
		width: fit-content;
	}
	margin-top: 1rem;
	width: 100%;
	max-width: 56rem;
	border: 1px solid #ccc;
	border-radius: 0.4rem;
	padding: 0rem 1.4rem 1rem 1.4rem;
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
	height: 40rem;
	overflow-y: auto;
	margin-top: 2rem;
`;

export const StyledIconContainer = styled.div`
	height: 2.4rem;
	margin-right: 0.8rem;
	width: 2.4rem;
	display: inline-block;
`;
