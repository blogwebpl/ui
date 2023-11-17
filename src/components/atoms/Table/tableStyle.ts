import styled from 'styled-components';

export const StyledHeader = styled.div`
	display: flex;
	height: 6.4rem;
	width: 100%;
`;

export const StyledTitleContainer = styled.div`
	height: 6.4rem;
	width: 100%;
	padding-top: 1.6rem;
	padding-left: 1.6rem;
	padding-right: 1.6rem;
	flex: 1;
`;
export const StyledFilterContainer = styled.div`
	height: 6.4rem;
	display: flex;
	padding: 0 0.8rem;
	align-items: center;
	flex: 0 0 100%;
	max-width: 18rem;
`;
export const StyledIconContainer = styled.div`
	flex: 0;
	height: 6.4rem;
	width: auto;
	align-items: center;
	margin-left: auto;
	padding-right: 0.2rem;
	padding-left: 0.8rem;
	display: flex;
`;

interface StyledTableProps {
	mobileWidth?: string;
}

export const StyledTable = styled.table<StyledTableProps>`
	table-layout: fixed;
	width: 100%;
	border-collapse: collapse;
	font-weight: 400;
	border: 0;
	padding: 0;
	margin: 0;

	@media (min-width: ${(props) => props.mobileWidth || '417px'}) {
		& {
			margin: 0 2rem;
			width: calc(100% - 4rem);
		}
	}

	span {
		display: inline-block;
		transform-origin: center center;
	}

	@keyframes rotateAnimationDesc {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(180deg);
		}
	}

	@keyframes rotateAnimationAsc {
		from {
			transform: rotate(180deg);
		}
		to {
			transform: rotate(0deg);
		}
	}

	.desc {
		animation-name: rotateAnimationDesc;
		animation-duration: 0.25s;
		animation-fill-mode: forwards;
		animation-timing-function: ease-out;
		font-size: 1.3rem;
	}

	.asc {
		animation-name: rotateAnimationAsc;
		animation-duration: 0.25s;
		animation-fill-mode: forwards;
		animation-timing-function: ease-out;
		font-size: 1.3rem;
	}

	th {
		color: #757575;
		font-size: 1.2rem;
		height: 100%;
		text-align: left;
		user-select: none;
	}
	td {
		padding: 0;
		color: #212121;
		font-size: 1.3rem;
		text-align: left;
		user-select: none;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	td.number {
		text-align: right;
		padding-inline-end: 9rem;
	}

	th:first-child,
	td:first-child {
		width: auto;
		text-align: right;
	}

	@media (min-width: ${(props) => props.mobileWidth || '417px'}) {
		th:first-child,
		td:first-child {
			width: 6.4rem;
			text-align: center;
		}
	}
	th:last-child,
	td:last-child {
		// width: 6.4rem;
		width: auto;
		padding-left: 1.6rem;
	}
	@media (min-width: ${(props) => props.mobileWidth || '417px'}) {
		th:last-child,
		td:last-child {
			padding-left: 0;
			float: right;
		}
	}
	tr {
		border-bottom: 0.1rem solid #e0e0e0;
	}

	thead > tr {
		height: 5.6rem;
	}
	tbody.tableBody > tr:hover {
		background-color: #eeeeee;
	}
	.bodyMobile td {
		height: 4rem;
	}

	.bodyMobile td:first-child {
		font-weight: bold;
		text-align: right;
	}

	tr.options td {
		height: 4.8rem;
	}

	tr.options td:last-child {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.rowGap td {
		height: 1.5rem !important;
	}
	.emptyRow {
		height: 4.9rem;
	}
	.emptyRow:hover {
		background-color: inherit !important;
	}
`;

export const StyledFooter = styled.div<StyledTableProps>`
	display: flex;
	justify-items: center;
	height: 5.6rem;
	color: #757575;
	font-size: 1.2rem;
	select {
		border: 0;
		color: #757575;
	}

	@media (min-width: ${(props) => props.mobileWidth || '417px'}) {
		& {
			margin: 0 2rem;
			width: calc(100% - 4rem);
		}
	}
`;

export const StyledFooterContainer = styled.div`
	margin: 0.4rem 0;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
`;
export const StyledFooterItem = styled.span`
	height: 4.8rem;
	display: flex;
	align-items: center;
	select {
		margin: 0 3rem 0 1rem;
	}
	&.w100 {
		min-width: 10rem;
		display: flex;
		flex-direction: row-reverse;
		margin-right: 2rem;
	}
`;
