import '@total-typescript/ts-reset';
import { IconType } from 'react-icons';
import styled from 'styled-components';
import {
	MdSearch as SearchIcon,
	MdMoreVert as DotsIcon,
	MdCreate as EditIcon,
	MdOutlineChevronRight as NextIcon,
	MdOutlineChevronLeft as PrevIcon,
} from 'react-icons/md';

import { useEffect, useState } from 'react';
import { Card } from '../Card';
import { TextField } from '../TextField';
import { Typography } from '../Typography';
import { Tools } from '../Tools';
import { IconButton } from '../IconButton';
import { Checkbox } from '../Checkbox';

const StyledHeader = styled.div`
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
	max-width: 180px;
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
		height: 4.8rem;
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

export interface TableAction {
	id: string;
	icon: IconType;
	hint: string;
	isDisabled?: boolean;
	onClick: () => void;
}

export interface TableColumn {
	id: string;
	label: string;
	width: string;
	sort: string;
	sortOrder: number;
}

export interface TableProps {
	title: string;
	actions: TableAction[];
	isMobile?: boolean;
	width: string;
	columns: TableColumn[];
	data: any[];
	rowsPerPage: number;
	pageNumber: number;
}

export function Table(props: TableProps) {
	const [isMobile, setIsMobile] = useState(false);
	const [data, setData] = useState<any[]>([]);
	const [rowsPerPage, setRowsPerPage] = useState<number>(props.rowsPerPage || 0);
	const [pageNumber, setPageNumber] = useState<number>(props.pageNumber || 1);

	useEffect(() => {
		function handleResize() {
			setIsMobile(window.innerWidth < 321);
		}
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		const startIndex = (pageNumber - 1) * rowsPerPage;
		const endIndex = startIndex + rowsPerPage;

		if (startIndex >= props.data.length) {
			setData([]);
		} else {
			setData(props.data.slice(startIndex, endIndex));
		}
	}, [props.data, rowsPerPage, pageNumber]);

	return (
		<Card minWidth={props.width} padding={false}>
			<StyledHeader>
				<StyledTitleContainer>
					<Typography component="h6" color="#000000" userSelect="none">
						{props.title}
					</Typography>
				</StyledTitleContainer>
				{isMobile ? null : (
					<StyledFilterContainer>
						<TextField label="" type="text" icon={SearchIcon} slim={true} />
					</StyledFilterContainer>
				)}
				<StyledIconContainer>
					{isMobile ? (
						<>
							<IconButton isLightColor={false} onClick={() => {}} color="#757575" label={'Menu'}>
								<SearchIcon size={24} color="#757575" />
							</IconButton>
							<IconButton isLightColor={false} onClick={() => {}} color="#757575" label={'Menu'}>
								<DotsIcon size={24} color="#757575" />
							</IconButton>
						</>
					) : (
						<Tools actions={props.actions} />
					)}
				</StyledIconContainer>
			</StyledHeader>
			<StyledTable>
				<thead>
					<tr>
						<th>
							<Checkbox />
						</th>
						{props.columns.map((column) => (
							<th style={{ minWidth: column.width }} key={column.id}>
								<span>{column.label}&nbsp;&nbsp;</span>
								<span>▲</span>
							</th>
						))}
						<th>&nbsp;</th>
					</tr>
				</thead>
				<tbody>
					{data.map((row) => (
						<tr key={row.id}>
							<td>
								<Checkbox />
							</td>
							{props.columns.map((column) => (
								<td
									key={`${row.id}-${column.id}`}
									className={typeof row[column.id] === 'number' ? 'number' : ''}
								>
									{row[column.id]}
								</td>
							))}
							<td>
								<IconButton isLightColor={false} onClick={() => {}} color="#757575" label="">
									<EditIcon size={24} color="#757575" />
								</IconButton>
							</td>
						</tr>
					))}
				</tbody>
			</StyledTable>
			<StyledFooter>
				<StyledFooterContainer>
					<StyledFooterItem>Wierszy na stronę:</StyledFooterItem>
					<StyledFooterItem>
						<select
							value={rowsPerPage}
							onChange={(e) => {
								setRowsPerPage(Number(e.target.value));
							}}
						>
							<option value={0}>auto</option>
							<option value={5}>5</option>
							<option value={6}>6</option>
							<option value={7}>7</option>
							<option value={8}>8</option>
							<option value={9}>9</option>
							<option value={10}>10</option>
							<option value={11}>11</option>
							<option value={12}>12</option>
							<option value={13}>13</option>
							<option value={14}>14</option>
							<option value={15}>15</option>
						</select>
					</StyledFooterItem>
					<StyledFooterItem>
						{(pageNumber - 1) * rowsPerPage + 1}&nbsp;-&nbsp;
						{(pageNumber - 1) * rowsPerPage + rowsPerPage} z {props.data.length}&nbsp;&nbsp;
					</StyledFooterItem>
					<StyledFooterItem>
						<IconButton
							isLightColor={false}
							onClick={() => {
								setPageNumber((pn) => (pn > 1 ? pn - 1 : 1));
							}}
							color="#757575"
							label=""
						>
							<PrevIcon size={24} color="#757575" />
						</IconButton>
					</StyledFooterItem>
					<StyledFooterItem>
						<IconButton
							isLightColor={false}
							onClick={() => {
								setPageNumber((pn) =>
									Math.ceil(props.data.length) / rowsPerPage > pn ? pn + 1 : pn
								);
							}}
							color="#757575"
							label=""
						>
							<NextIcon size={24} color="#757575" />
						</IconButton>
					</StyledFooterItem>
				</StyledFooterContainer>
			</StyledFooter>
		</Card>
	);
}
