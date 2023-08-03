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

export const StyledTable = styled.table`
	width: 100%;
	border-collapse: collapse;
	font-weight: 400;
	border: 0;
	padding: 0;
	margin: 0;

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
	}
	td.number {
		text-align: right;
		padding-inline-end: 9rem;
	}

	th:first-child,
	td:first-child {
		width: 6.4rem;
		text-align: center;
	}
	th:last-child,
	td:last-child {
		width: 6.4rem;
		padding-left: 1.6rem;
	}
	tr {
		border-bottom: 0.1rem solid #e0e0e0;
		// height: 4.8rem;
	}
	thead > tr {
		height: 5.6rem;
	}
	tbody > tr:hover {
		background-color: #eeeeee;
	}
`;

export const StyledFooter = styled.div`
	display: flex;
	justify-items: center;
	height: 5.6rem;
	color: #757575;
	font-size: 1.2rem;
	select {
		border: 0;
		color: #757575;
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
`;
