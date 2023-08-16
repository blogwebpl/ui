import '@total-typescript/ts-reset';
import { IconType } from 'react-icons';

import {
	MdSearch as SearchIcon,
	MdMoreVert as DotsIcon,
	MdCreate as EditIcon,
	MdRemoveRedEye as ViewIcon,
	MdOutlineChevronRight as NextIcon,
	MdOutlineChevronLeft as PrevIcon,
	MdDelete as TrashIcon,
} from 'react-icons/md';

import { ChangeEvent, useEffect, useState } from 'react';
import { Card } from '../Card';
import { TextField } from '../TextField';
import { Typography } from '../Typography';
import { Tools } from '../Tools';
import { IconButton } from '../IconButton';
import { Checkbox } from '../Checkbox';
import {
	StyledHeader,
	StyledTitleContainer,
	StyledFilterContainer,
	StyledIconContainer,
	StyledTable,
	StyledFooter,
	StyledFooterContainer,
	StyledFooterItem,
} from './tableStyle';

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

interface DynamicObject {
	[key: string]: string | number;
}

export interface TableProps {
	title: string;
	actions: TableAction[];
	width: string;
	columns: TableColumn[];
	data: DynamicObject[];
	rowsPerPage: number;
	pageNumber: number;
	readOnly?: boolean;
}

function getFontSizeFromBody(): number {
	const bodyElement = document.body;
	if (bodyElement) {
		const styles = window.getComputedStyle(bodyElement);
		const fontSize = styles.getPropertyValue('font-size');
		return parseFloat(fontSize);
	}
	return 16;
}

export function Table(props: TableProps) {
	const { data } = props;
	const [columns, setColumns] = useState(props.columns);
	const [isMobile, setIsMobile] = useState(false);
	const [fontSize, setFontSize] = useState<number>(getFontSizeFromBody());
	const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
	const [rowsPerPage, setRowsPerPage] = useState<number>(props.rowsPerPage || 0);
	const [pageNumber, setPageNumber] = useState<number>(props.pageNumber || 1);
	const [searchText, setSearchText] = useState<string>('');
	const [searchDelayTimer, setSearchDelayTimer] = useState<NodeJS.Timeout | null>(null);
	const [checkedRows, setCheckedRows] = useState<{ [key: string]: boolean }>({});

	useEffect(() => {
		function handleResize() {
			setIsMobile(window.innerWidth < 321);
			setViewportHeight(window.innerHeight);
			setFontSize(() => getFontSizeFromBody());
		}
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const handleSearchTextChange = (text: string) => {
		if (searchDelayTimer) {
			clearTimeout(searchDelayTimer);
		}
		setSearchDelayTimer(
			setTimeout(() => {
				setCheckedRows({});
				setPageNumber(1);
				setSearchText(text);
			}, 300)
		);
	};

	const handleCheckboxChange = (rowId: string | number) => {
		setCheckedRows((prevCheckedRows) => ({
			...prevCheckedRows,
			[rowId]: !prevCheckedRows[rowId] || false,
		}));
	};

	const changeSortOrder = (id: number | string) => {
		const currentColumns = [...columns];
		const column = currentColumns.find((col) => col.id === id);
		if (column) {
			column.sort = column.sort === 'asc' ? 'desc' : 'asc';
			setColumns(currentColumns);
		}
	};

	let computedRowsPerPage = rowsPerPage;

	if (rowsPerPage === 0) {
		const headerHeight = 7.5 * fontSize;
		const footerHeight = 3 * fontSize;
		const rowHeight = 3.2 * fontSize;
		computedRowsPerPage = Math.floor((viewportHeight - headerHeight - footerHeight) / rowHeight);
		computedRowsPerPage = Math.max(computedRowsPerPage, 0);
	}

	if (isMobile) computedRowsPerPage = data.length;

	const startIndex = (pageNumber - 1) * computedRowsPerPage;
	const endIndex = startIndex + computedRowsPerPage;

	const filteredData = data.filter((item) =>
		Object.entries(item).some(([key, value]) => {
			if (key === 'id') {
				return false;
			}

			return String(value).toLowerCase().includes(searchText.toLowerCase());
		})
	);

	const sortFunction = (a: DynamicObject, b: DynamicObject, column: TableColumn) => {
		const aValue = String(a[column.id]);
		const bValue = String(b[column.id]);

		if (column.sort === 'asc') {
			return aValue.localeCompare(bValue, 'pl', { sensitivity: 'base' });
		}
		return bValue.localeCompare(aValue, 'pl', { sensitivity: 'base' });
	};

	const multiSortFunction = (a: DynamicObject, b: DynamicObject) => {
		const primarySortColumn = columns.find((col) => col.sortOrder === 1);

		if (primarySortColumn) {
			const primarySortResult = sortFunction(a, b, primarySortColumn);
			if (primarySortResult !== 0) {
				return primarySortResult;
			}
		}

		return columns
			.filter((col) => col.sortOrder > 1)
			.sort((col1, col2) => col1.sortOrder - col2.sortOrder)
			.reduce((result, column) => {
				if (result !== 0) {
					return result;
				}
				return sortFunction(a, b, column);
			}, 0);
	};

	const sortedData = [...filteredData].sort((a: DynamicObject, b: DynamicObject) => {
		return multiSortFunction(a, b);
	});

	const dataForPage = sortedData.slice(startIndex, endIndex);

	const fromRow = (pageNumber - 1) * computedRowsPerPage + 1;
	const toRow = Math.min(
		(pageNumber - 1) * computedRowsPerPage + computedRowsPerPage,
		filteredData.length
	);
	const trArray = Array.from(
		{ length: computedRowsPerPage - (toRow - fromRow + 1) },
		(_, index) => index
	);

	let tableActions = props.actions;

	const numberOfCheckedRows = Object.values(checkedRows).filter((checked) => checked).length;

	if (numberOfCheckedRows) {
		tableActions = props.actions.map((action) => {
			if (action.id === 'add') {
				const a: TableAction = {
					id: 'del',
					icon: TrashIcon,
					hint: 'usuń',
					isDisabled: false,
					onClick: () => {
						// alert('usuń');
					},
				};
				return a;
			}
			return action;
		});
	}

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
						<TextField
							label=""
							type="text"
							icon={SearchIcon}
							slim={true}
							autoFocus
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								handleSearchTextChange(e.target.value)
							}
							controlled
						/>
					</StyledFilterContainer>
				)}
				<StyledIconContainer>
					{isMobile ? (
						<>
							<IconButton isLightColor={false} onClick={() => {}} color="#757575" label={'Menu'}>
								<SearchIcon size="2.4rem" color="#757575" />
							</IconButton>
							<IconButton isLightColor={false} onClick={() => {}} color="#757575" label={'Menu'}>
								<DotsIcon size="2.4rem" color="#757575" />
							</IconButton>
						</>
					) : (
						<Tools actions={tableActions} />
					)}
				</StyledIconContainer>
			</StyledHeader>
			<StyledTable>
				{isMobile ? null : (
					<thead>
						<tr>
							<th>
								<Checkbox />
							</th>
							{props.columns.map((column) => (
								<th
									style={{ minWidth: column.width }}
									key={column.id}
									onClick={() => {
										changeSortOrder(column.id);
									}}
								>
									<span>{column.label}&nbsp;&nbsp;</span>
									<span className={column.sort === 'asc' ? 'asc' : 'desc'}>▲</span>
								</th>
							))}
							<th>&nbsp;</th>
						</tr>
					</thead>
				)}
				{!isMobile ? (
					<tbody className="tableBody">
						{dataForPage.map((row: DynamicObject) => (
							<tr key={row.id}>
								<td>
									<Checkbox
										checked={checkedRows[row.id] || false}
										onChange={() => handleCheckboxChange(row.id)}
										controlled
									/>
								</td>
								{columns.map((column) => (
									<td
										key={`${row.id}-${column.id}`}
										className={typeof row[column.id] === 'number' ? 'number' : ''}
									>
										{row[column.id]}
									</td>
								))}
								<td>
									<IconButton isLightColor={false} onClick={() => {
										// history.push("/about");
									}} color="#757575" label="">
										{props.readOnly ? <ViewIcon size="2.4rem" color="#757575" /> : <EditIcon size="2.4rem" color="#757575" />}
										
									</IconButton>
								</td>
							</tr>
						))}

						{trArray.map((_, index) => (
							<tr key={index} className="emptyRow">
								<td colSpan={props.columns.length + 2}>&nbsp;</td>
							</tr>
						))}
					</tbody>
				) : (
					<>
						{dataForPage.map((row: DynamicObject) => (
							<tbody key={`${row.id}-tbody`} className="bodyMobile">
								{props.columns.map((column: TableColumn, index: number) => (
									<tr key={`${row.id}-tr-${index}`} className="innerRow">
										<td
											onClick={() => {
												changeSortOrder(column.id);
											}}
										>
											<span className={column.sort === 'asc' ? 'asc' : 'desc'}>▲</span>&nbsp;
											<span>{column.label}:</span>
										</td>
										<td>{row[column.id]}</td>
									</tr>
								))}
								<tr className="options">
									<td>Opcje:</td>
									<td className="options">
										<Checkbox
											checked={checkedRows[row.id] || false}
											onChange={() => handleCheckboxChange(row.id)}
											controlled
										/>
										&nbsp;
										<IconButton isLightColor={false} onClick={() => {}} color="#757575" label="">
											{props.readOnly ? <ViewIcon size="2.4rem" color="#757575" /> : <EditIcon size="2.4rem" color="#757575" />}
										</IconButton>
									</td>
								</tr>
								<tr className="rowGap">
									<td></td>
									<td></td>
								</tr>
							</tbody>
						))}
					</>
				)}
			</StyledTable>
			{isMobile ? null : (
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
								<option value={20}>20</option>
								<option value={50}>50</option>
								<option value={100}>100</option>
								<option value={200}>200</option>
								<option value={500}>500</option>
							</select>
						</StyledFooterItem>
						<StyledFooterItem className="w100">
							{fromRow}&nbsp;-&nbsp;
							{toRow}&nbsp;/&nbsp;{filteredData.length}
							&nbsp;&nbsp;
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
								<PrevIcon size="2.4rem" color="#757575" />
							</IconButton>
						</StyledFooterItem>
						<StyledFooterItem>
							<IconButton
								isLightColor={false}
								onClick={() => {
									setPageNumber((pn) =>
										Math.ceil(filteredData.length) / computedRowsPerPage > pn ? pn + 1 : pn
									);
								}}
								color="#757575"
								label=""
							>
								<NextIcon size="2.4rem" color="#757575" />
							</IconButton>
						</StyledFooterItem>
					</StyledFooterContainer>
				</StyledFooter>
			)}
		</Card>
	);
}
