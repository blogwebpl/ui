/* eslint-disable no-alert */
import '@total-typescript/ts-reset';
import { IconType } from 'react-icons';

import { useLocation, useNavigate } from 'react-router-dom';

import {
	MdSearch as SearchIcon,
	MdMoreVert as DotsIcon,
	MdCreate as EditIcon,
	MdRemoveRedEye as ViewIcon,
	MdOutlineChevronRight as NextIcon,
	MdOutlineChevronLeft as PrevIcon,
	MdDelete as TrashIcon,
} from 'react-icons/md';

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
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
import { Language, Translations } from '../../types';

export interface TableAction {
	id: string;
	icon: IconType;
	hint: string;
	disabled?: boolean;
	onClick: () => void;
}

export interface TableColumn {
	field: string;
	label: Translations;
	width: string;
	sort: string;
	sortOrder: number;
	type: string;
}

interface DynamicObject {
	[key: string]: any;
}

export interface TableProps {
	title: Translations;
	actions: TableAction[];
	width: string;
	columns: TableColumn[];
	data: DynamicObject[];
	rowsPerPage: number;
	pageNumber: number;
	readOnly?: boolean;
	language: Language;
	crud: number;
	collection: string;
	mobileWidth?: number;
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

interface MergeColumnsProps {
	columns: TableColumn[];
	collection: string;
}

const mergeColumns = ({ columns, collection }: MergeColumnsProps): TableColumn[] => {
	const collectionColumns = localStorage.getItem(`collection-${collection}-columns`);
	if (collectionColumns) {
		const userColumns: TableColumn[] = JSON.parse(collectionColumns) as TableColumn[];
		const userColumnsMap = new Map(userColumns.map((uc) => [uc.field, uc]));

		return columns.map((column) => {
			const userColumn = userColumnsMap.get(column.field);
			if (userColumn) {
				return {
					...column,
					sort: userColumn.sort,
					sortOrder: userColumn.sortOrder,
					width: userColumn.width,
				};
			}
			return column;
		});
	}
	return columns;
};

export function Table(props: TableProps) {
	const componentStartTime = performance.now();
	const location = useLocation();
	const navigate = useNavigate();

	const params = new URLSearchParams(location.search);
	const searchParam = params.get('search');

	const mergedColumns = mergeColumns({ columns: props.columns, collection: props.collection });

	const { data } = props;
	const [columns, setColumns] = useState(mergedColumns);
	const [isMobile, setIsMobile] = useState(true);
	const [fontSize, setFontSize] = useState<number>(getFontSizeFromBody());
	const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
	const [rowsPerPage, setRowsPerPage] = useState<number>(props.rowsPerPage || 0);
	const [pageNumber, setPageNumber] = useState<number>(props.pageNumber || 1);
	const [searchText, setSearchText] = useState<string>(searchParam || '');
	const [searchTextForInput, setSearchTextForInput] = useState<string>(searchParam || '');
	const [searchDelayTimer, setSearchDelayTimer] = useState<NodeJS.Timeout | null>(null);
	const [checkedRows, setCheckedRows] = useState<{ [key: string]: boolean }>({});

	useEffect(() => {
		setColumns(mergedColumns);
	}, [props.columns]);

	useEffect(() => {
		let debounceTimer: NodeJS.Timeout;
		function handleResize() {
			clearTimeout(debounceTimer);
			debounceTimer = setTimeout(() => {
				setIsMobile(window.innerWidth <= (props.mobileWidth || 416));
				setViewportHeight(window.innerHeight);
				setFontSize(() => getFontSizeFromBody());
			}, 200);
		}
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
			if (debounceTimer) {
				clearTimeout(debounceTimer);
			}
		};
	}, [props.mobileWidth]);

	const handleSearchTextChange = useCallback(
		(text: string) => {
			if (searchDelayTimer) {
				clearTimeout(searchDelayTimer);
			}
			setSearchDelayTimer(
				setTimeout(() => {
					setPageNumber(1);
					navigate(`/${props.collection}/page/1?search=${encodeURIComponent(text)}`, {
						replace: true,
					});
					setSearchText(text);
				}, 450)
			);
		},
		[props.collection, searchDelayTimer]
	);

	const handleCheckboxChange = (rowId: string | number) => {
		const startTime = performance.now();
		setCheckedRows((prevCheckedRows) => ({
			...prevCheckedRows,
			[rowId]: !prevCheckedRows[rowId] || false,
		}));
		const endTime = performance.now();
		const executionTime = endTime - startTime;
		console.log('Execution time:', executionTime);
	};

	const changeSortOrder = (id: number | string) => {
		const column = columns.find((col) => col.field === id);
		if (column) {
			column.sort = column.sort === 'asc' ? 'desc' : 'asc';
			setColumns((prevColumns) => prevColumns.map((col) => (col.field === id ? column : col)));
			localStorage.setItem(`collection-${props.collection}-columns`, JSON.stringify(columns));
		}
	};

	let computedRowsPerPage = rowsPerPage;

	if (rowsPerPage === 0 && !isMobile) {
		const headerHeight = 7.5 * fontSize;
		const footerHeight = 3 * fontSize;
		const rowHeight = 3.0625 * fontSize;
		const appbarHeight = 4 * fontSize;
		computedRowsPerPage = Math.floor(
			(viewportHeight - headerHeight - footerHeight - appbarHeight - 8) / rowHeight
		);
		computedRowsPerPage = Math.max(computedRowsPerPage, 0);
	}

	if (isMobile) computedRowsPerPage = 15; // 15 or data.length;

	const startIndex = (pageNumber - 1) * computedRowsPerPage;
	const endIndex = startIndex + computedRowsPerPage;
	const filteredData = useMemo(() => {
		if (searchText.length > 0) {
			return data.filter((item) =>
				Object.entries(item).some(([key, value]) => {
					if (key === 'id') {
						return false;
					}

					if (typeof value === 'object') {
						return Object.entries(value).some(([objKey, objValue]) => {
							const isKeyInColumns = columns.some((column) => column.field === `${key}.${objKey}`);
							if (!isKeyInColumns) {
								return false;
							}

							return String(objValue).toLowerCase().includes(searchText.toLowerCase());
						});
					}
					if (typeof value === 'number') {
						return String(value).includes(searchText);
					}

					return value.toLowerCase().includes(searchText.toLowerCase());
				})
			);
		}
		return data;
	}, [data, columns, searchText]);

	const transformData = useCallback(
		(dataToTransform: any[]): any[] => {
			return dataToTransform.map((row) => {
				const transformedRow = { ...row };

				columns.forEach((column) => {
					if (column.field.includes('.')) {
						const keys = column.field.split('.');

						const currentNode = keys.reduce((current, key) => {
							return Object.prototype.hasOwnProperty.call(current, key) ? current[key] : current;
						}, transformedRow);

						transformedRow[column.field] = currentNode;
					}
				});
				return transformedRow;
			});
		},
		[columns]
	);

	const sortFunction = (a: DynamicObject, b: DynamicObject, column: TableColumn) => {
		const aValue = a[column.field];
		const bValue = b[column.field];
		if (column.type === 'text') {
			if (column.sort === 'asc') {
				return aValue.localeCompare(bValue, 'pl', { sensitivity: 'base' });
			}
			return bValue.localeCompare(aValue, 'pl', { sensitivity: 'base' });
		}
		if (column.type === 'number') {
			if (column.sort === 'asc') {
				return aValue - bValue;
			}
			return bValue - aValue;
		}
		return 0;
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

	const transformedData = useMemo(() => {
		return transformData(filteredData);
	}, [filteredData]);

	const sortStartTime = performance.now();

	const sortedData = useMemo(() => {
		return [...transformedData].sort((a: DynamicObject, b: DynamicObject) => {
			return multiSortFunction(a, b);
		});
	}, [transformedData, columns]);

	const dataForPage = sortedData.slice(startIndex, endIndex);
	const sortEndTime = performance.now();
	const sortExecutionTime = sortEndTime - sortStartTime;
	console.log('Sort execution time:', sortExecutionTime);

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

	const canDelete: boolean = (props.crud & 1) !== 0;
	const canUpdate: boolean = (props.crud & 2) !== 0;
	const canRead: boolean = (props.crud & 4) !== 0;
	const canCreate: boolean = (props.crud & 8) !== 0;

	if (numberOfCheckedRows && canDelete) {
		tableActions = props.actions.map((action) => {
			if (action.id === 'add') {
				const a: TableAction = {
					id: 'del',
					icon: TrashIcon,
					hint: 'usuń',
					disabled: false,
					onClick: () => {
						// alert('usuń');
					},
				};
				return a;
			}
			return action;
		});
	}

	if (!canCreate) {
		tableActions = props.actions.map((action) => {
			if (action.id === 'add') {
				const a: TableAction = {
					...action,
					onClick: () => {
						alert('Brak uprawnień do dodawania');
					},
				};
				return a;
			}
			return action;
		});
	}

	if (columns.length === 0) {
		return null;
	}

	if (!canRead) return null;

	const navigateToRow = (id: string) => {
		if (props.readOnly || !canUpdate) {
			navigate(`/${props.collection}/view/${id}`);
		} else {
			navigate(`/${props.collection}/edit/${id}`);
		}
	};

	const componentEndTime = performance.now();

	console.log(componentEndTime - componentStartTime);

	return (
		<Card minWidth={props.width} padding={false}>
			<StyledHeader>
				<StyledTitleContainer>
					<Typography component="h6" color="#000000" userSelect="none">
						{props.title[props.language]}
					</Typography>
				</StyledTitleContainer>
				{isMobile ? null : (
					<StyledFilterContainer>
						<TextField
							id="search"
							label=""
							type="text"
							icon={SearchIcon}
							slim={true}
							autoFocus
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								handleSearchTextChange(e.target.value);
								setSearchTextForInput(e.target.value);
							}}
							value={searchTextForInput}
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
			<StyledTable className={isMobile ? 'mobile' : 'desktop'}>
				{isMobile ? null : (
					<thead>
						<tr>
							<th>
								<Checkbox />
							</th>
							{mergedColumns.map((column) => (
								<th
									style={{ width: column.width }}
									key={column.field}
									onClick={() => {
										changeSortOrder(column.field);
									}}
								>
									<span>{column.label[props.language]}&nbsp;&nbsp;</span>

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
							<tr
								key={row.id}
								onClick={(event) => {
									if (
										!(event.target as HTMLElement).classList.contains('first-td') &&
										(event.target as HTMLElement).tagName === 'TD'
									) {
										navigateToRow(row.id);
									}
								}}
							>
								<td className="first-td">
									<Checkbox
										checked={checkedRows[row.id] || false}
										onChange={() => {
											handleCheckboxChange(row.id);
										}}
										controlled
									/>
								</td>
								{columns.map((column) => (
									<td
										key={`${row.id}-${column.field}`}
										// className={typeof row[column.field] === 'number' ? 'number' : ''}
										className={column.type === 'number' ? 'number' : ''}
									>
										{row[column.field]}
									</td>
								))}
								<td>
									<IconButton
										isLightColor={false}
										onClick={() => navigateToRow(row.id)}
										color="#757575"
										label=""
									>
										{props.readOnly || !canUpdate ? (
											<ViewIcon size="2.4rem" color="#757575" />
										) : (
											<EditIcon size="2.4rem" color="#757575" />
										)}
									</IconButton>
								</td>
							</tr>
						))}

						{trArray.map((_, index) => (
							<tr key={`empty${index}`} className="emptyRow">
								<td colSpan={mergedColumns.length + 2}>&nbsp;</td>
							</tr>
						))}
					</tbody>
				) : (
					<>
						{dataForPage.map((row: DynamicObject) => (
							<tbody key={`${row.id}-tbody`} className="bodyMobile">
								{mergedColumns.map((column: TableColumn, index: number) => (
									<tr key={`${row.id}-tr-${index}`} className="innerRow">
										<td
											onClick={() => {
												changeSortOrder(column.field);
											}}
										>
											<span className={column.sort === 'asc' ? 'asc' : 'desc'}>▲</span>&nbsp;
											<span>{column.label[props.language]}:</span>
										</td>
										<td>{row[column.field]}</td>
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
											{props.readOnly ? (
												<ViewIcon size="2.4rem" color="#757575" />
											) : (
												<EditIcon size="2.4rem" color="#757575" />
											)}
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
				<StyledFooter className={isMobile ? 'mobile' : 'desktop'}>
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
							{toRow > 0 ? `${fromRow} - ${toRow} / ${filteredData.length}  ` : null}
						</StyledFooterItem>
						<StyledFooterItem>
							<IconButton
								isLightColor={false}
								onClick={() => {
									setPageNumber((pn) => {
										const newPn = pn > 1 ? pn - 1 : 1;
										navigate(
											`/${props.collection}/page/${newPn}?search=${encodeURIComponent(searchText)}`,
											{
												replace: true,
											}
										);
										const searchInput = document.getElementById('search');
										if (searchInput) searchInput.focus();
										return newPn;
									});
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
									setPageNumber((pn) => {
										const newPn =
											Math.ceil(filteredData.length / computedRowsPerPage) > pn ? pn + 1 : pn;

										navigate(
											`/${props.collection}/page/${newPn}?search=${encodeURIComponent(searchText)}`,
											{
												replace: true,
											}
										);
										const searchInput = document.getElementById('search');
										if (searchInput) searchInput.focus();
										return newPn;
									});
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

Table.defaultProps = {
	readOnly: false,
	mobileWidth: 768,
};
