/* eslint-disable no-alert */
import '@total-typescript/ts-reset';
import Swal, { SweetAlertResult } from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import {
	MdSearch as SearchIcon,
	MdMoreVert as DotsIcon,
	MdCreate as EditIcon,
	MdRemoveRedEye as ViewIcon,
	MdOutlineChevronRight as NextIcon,
	MdOutlineChevronLeft as PrevIcon,
	MdDelete as TrashIcon,
	MdClear,
} from 'react-icons/md';

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Card } from '../Card';
import { TextField } from '../TextField';
import { Typography } from '../Typography';
import { Action, Tools } from '../Tools';
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
import styled from 'styled-components';
import { CardMenu } from '../CardMenu';
import { getIconComponent } from '../IconSelect/IconSelect';

export interface TableColumn {
	field: string;
	label: Translations;
	width: string;
	sort: string;
	sortOrder: number;
	type: string;
}

interface DynamicObject {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

export interface TableProps {
	title: Translations;
	actions: Action[];
	width: string;
	columns: TableColumn[];
	data: DynamicObject[];
	rowsPerPage?: number;
	pageNumber?: number;
	readOnly?: boolean;
	language: Language;
	crud: number;
	collection: string;
	mobileWidth?: number;
	deleteAction?: (ids: string[]) => Promise<boolean>;
}

const StyledMenu = styled.div`
	position: absolute;
	padding: 1rem;
	top: 4.8rem;
	right: 0;
	min-width: 50%;
	max-width: 75%;
	height: auto;
	background-color: #eee;
	z-index: 1000;
`;

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

const mergeColumns = ({
	columns,
	collection,
}: MergeColumnsProps): TableColumn[] => {
	const collectionColumns = localStorage.getItem(
		`collection-${collection}-columns`
	);
	if (collectionColumns) {
		const userColumns: TableColumn[] = JSON.parse(
			collectionColumns
		) as TableColumn[];
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

export function Table({
	title,
	actions,
	width,
	columns,
	data,
	rowsPerPage = 0,
	pageNumber = 1,
	readOnly = false,
	language,
	crud,
	collection,
	mobileWidth = 768,
	deleteAction,
}: TableProps) {
	const location = useLocation();
	const navigate = useNavigate();

	const params = new URLSearchParams(location.search);
	const searchParam = params.get('search');

	const mergedColumns = mergeColumns({
		columns,
		collection,
	});

	const [columnsState, setColumns] = useState(mergedColumns);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileWidth);
	const [fontSize, setFontSize] = useState<number>(getFontSizeFromBody());
	const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
	const [rowsPerPageState, setRowsPerPage] = useState<number>(rowsPerPage);
	const [pageNumberState, setPageNumber] = useState<number>(pageNumber);
	const [searchText, setSearchText] = useState<string>(searchParam || '');
	const [searchTextForInput, setSearchTextForInput] = useState<string>(
		searchParam || ''
	);
	const [searchDelayTimer, setSearchDelayTimer] =
		useState<NodeJS.Timeout | null>(null);
	const [checkedRows, setCheckedRows] = useState<Set<string>>(new Set());
	const [allChecked, setAllChecked] = useState(false);
	const [showMiniMenu, setShowMiniMenu] = useState(false);
	const [showSearch, setShowSearch] = useState(false);

	const numberOfCheckedRows = checkedRows.size;
	// Update columns when props.columns changes
	useEffect(() => {
		setColumns(mergedColumns);
	}, [columns]);

	// Compute filtered data based on search text
	const filteredData = useMemo(() => {
		if (searchText && searchText.length > 0) {
			return data.filter((item) =>
				Object.entries(item).some(([key, value]) => {
					if (key === 'id') {
						return false; // Skip 'id' field
					}

					if (value && typeof value === 'object') {
						return Object.entries(value).some(([objKey, objValue]) => {
							const isKeyInColumns = columnsState.some(
								(column) => column.field === `${key}.${objKey}`
							);
							if (!isKeyInColumns) {
								return false; // Skip if key is not in columns
							}

							return (
								objValue !== null &&
								String(objValue)
									.toLowerCase()
									.includes(searchText.toLowerCase())
							);
						});
					}
					if (typeof value === 'number') {
						return String(value).includes(searchText); // Check if number includes search text
					}

					return (
						value &&
						typeof value === 'string' &&
						value.toLowerCase().includes(searchText.toLowerCase())
					); // Check if string includes search text
				})
			);
		}
		return data; // Return original data if no search text
	}, [data, columnsState, searchText]);

	useEffect(() => {
		if (numberOfCheckedRows === 0) {
			setAllChecked(false);
		}
		const numberOfRow = filteredData.length;
		setAllChecked(numberOfCheckedRows === numberOfRow && numberOfRow > 0);
	}, [checkedRows]);

	useEffect(() => {
		let debounceTimer: NodeJS.Timeout;
		function handleResize() {
			clearTimeout(debounceTimer);
			debounceTimer = setTimeout(() => {
				setIsMobile(window.innerWidth <= mobileWidth);
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
	}, [mobileWidth]);

	const handleSearchTextChange = useCallback(
		(text: string) => {
			if (searchDelayTimer) {
				clearTimeout(searchDelayTimer);
			}
			setSearchDelayTimer(
				setTimeout(() => {
					setPageNumber(1);
					navigate(`/${collection}/page/1?search=${encodeURIComponent(text)}`, {
						replace: true,
					});
					setSearchText(text);
				}, 450)
			);
		},
		[collection, searchDelayTimer]
	);

	const handleCheckboxChange = (() => {
		let lastChangeTime = 0;

		return (rowId: string | number) => {
			const now = Date.now();
			if (now - lastChangeTime < 500) return; // Ignore changes within 0.5s

			lastChangeTime = now;

			setCheckedRows((prevCheckedRows) => {
				const newCheckedRows = new Set(prevCheckedRows);
				const rowIdStr = rowId?.toString() || '';
				if (newCheckedRows.has(rowIdStr)) {
					newCheckedRows.delete(rowIdStr);
				} else {
					newCheckedRows.add(rowIdStr);
				}
				return newCheckedRows;
			});
		};
	})();

	const handleAllCheckboxChange = () => {
		setAllChecked((prevAllChecked) => {
			const newAllChecked = !prevAllChecked;
			if (newAllChecked) {
				const newCheckedRows = new Set<string>();
				data.forEach((row) => {
					newCheckedRows.add(row.id ? row.id.toString() : row.name || '');
				});
				setCheckedRows(newCheckedRows);
			} else {
				setCheckedRows(new Set<string>());
			}
			return newAllChecked;
		});
	};

	const changeSortOrder = (id: number | string) => {
		const column = columnsState.find((col) => col.field === id);
		if (column) {
			column.sort = column.sort === 'asc' ? 'desc' : 'asc';
			setColumns((prevColumns) =>
				prevColumns.map((col) => (col.field === id ? column : col))
			);
			localStorage.setItem(
				`collection-${collection}-columns`,
				JSON.stringify(columnsState)
			);
		}
	};

	let computedRowsPerPage = rowsPerPageState;

	if (rowsPerPageState === 0 && !isMobile) {
		const headerHeight = 7.5 * fontSize;
		const footerHeight = 3 * fontSize;
		const rowHeight = 3.2525 * fontSize;
		const appbarHeight = 4 * fontSize;

		computedRowsPerPage = Math.floor(
			(viewportHeight - headerHeight - footerHeight - appbarHeight - fontSize) /
				rowHeight
		);
		computedRowsPerPage = Math.max(computedRowsPerPage, 0);
	}

	if (isMobile) computedRowsPerPage = Math.min(25, data.length); // 25 or data.length;

	const startIndex = (pageNumberState - 1) * computedRowsPerPage;
	const endIndex = startIndex + computedRowsPerPage;

	const transformData = useCallback(
		(dataToTransform: DynamicObject[]): DynamicObject[] => {
			if (!dataToTransform) return [];

			return dataToTransform.map((row) => {
				const transformedRow = { ...row };

				columnsState.forEach((column) => {
					if (!column?.field) return;

					if (column.field.includes('.')) {
						const keys = column.field.split('.');

						const currentNode = keys.reduce((current, key) => {
							return current &&
								Object.prototype.hasOwnProperty.call(current, key)
								? current[key]
								: null;
						}, transformedRow);

						transformedRow[column.field] = currentNode ?? '';
					}
				});
				return transformedRow;
			});
		},
		[columnsState]
	);

	const sortFunction = (
		a: DynamicObject,
		b: DynamicObject,
		column: TableColumn
	) => {
		const aValue = a[column.field] || '';
		const bValue = b[column.field] || '';
		if (column.type === 'text') {
			if (column.sort === 'asc') {
				return (aValue?.toString() || '').localeCompare(
					bValue?.toString() || '',
					'pl',
					{ sensitivity: 'base' }
				);
			}
			return (bValue?.toString() || '').localeCompare(
				aValue?.toString() || '',
				'pl',
				{ sensitivity: 'base' }
			);
		}
		if (column.type === 'number') {
			if (column.sort === 'asc') {
				return Number(aValue) - Number(bValue);
			}
			return Number(bValue) - Number(aValue);
		}
		if (column.type === 'boolean') {
			if (column.sort === 'asc') {
				return aValue ? -1 : 1;
			}
			return !aValue ? -1 : 1;
		}

		return 0;
	};

	const multiSortFunction = (a: DynamicObject, b: DynamicObject) => {
		const primarySortColumn = columnsState.find((col) => col.sortOrder === 1);

		if (primarySortColumn) {
			const primarySortResult = sortFunction(a, b, primarySortColumn);
			if (primarySortResult !== 0) {
				return primarySortResult;
			}
		}
		return columnsState
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

	const sortedData = useMemo(() => {
		return [...transformedData].sort((a: DynamicObject, b: DynamicObject) => {
			return multiSortFunction(a, b);
		});
	}, [transformedData, columnsState]);

	const dataForPage = sortedData.slice(startIndex, endIndex);

	const fromRow = (pageNumberState - 1) * computedRowsPerPage + 1;
	const toRow = Math.min(
		(pageNumberState - 1) * computedRowsPerPage + computedRowsPerPage,
		filteredData.length
	);
	const trArray = Array.from(
		{ length: computedRowsPerPage - (toRow - fromRow + 1) },
		(_, index) => index
	);

	let tableActions = actions;

	const canDelete: boolean = (crud & 1) !== 0;
	const canUpdate: boolean = (crud & 2) !== 0;
	const canRead: boolean = (crud & 4) !== 0;
	const canCreate: boolean = (crud & 8) !== 0;

	if (numberOfCheckedRows && canDelete) {
		tableActions = actions.map((action) => {
			if (action.id === 'add') {
				const a: Action = {
					id: 'del',
					icon: TrashIcon,
					hint: { pl: 'usuń', en: 'delete' },
					disabled: false,
					onClick: () => {
						Swal.fire({
							title: 'Pytanie',
							html:
								numberOfCheckedRows > 1
									? 'Czy chcesz usunąć wybrane wiersze?'
									: 'Czy chcesz usunąć wybrany wiersz?',

							icon: 'question',
							showCancelButton: true,
							confirmButtonColor: '#e91e63',
							cancelButtonColor: '#3f51b5',
							confirmButtonText: 'Tak',
							cancelButtonText: 'Nie',
						}).then(async (result: SweetAlertResult) => {
							if (result.isConfirmed && deleteAction) {
								await deleteAction(Array.from(checkedRows));
								setCheckedRows(new Set<string>());
							}
						});
					},
				};
				return a;
			}
			return action;
		});
	}

	if (!canCreate) {
		tableActions = actions.map((action) => {
			if (action.id === 'add') {
				const a: Action = {
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

	if (columnsState.length === 0) {
		return null;
	}

	if (!canRead) return null;

	const navigateToRow = (id: string) => {
		if (readOnly || !canUpdate) {
			navigate(`/${collection}/view/${id}`);
		} else {
			navigate(`/${collection}/edit/${id}`);
		}
	};

	const MiniMenu = () => {
		return (
			<StyledMenu>
				<CardMenu items={tableActions} language={language} />
			</StyledMenu>
		);
	};

	const SearchContainer = () => {
		return (
			<StyledFilterContainer
				className={'filter ' + (isMobile ? 'mobile' : 'desktop')}
			>
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
		);
	};
	return (
		<Card width={width} padding={false}>
			<StyledHeader className="header">
				<StyledTitleContainer className="title">
					<Typography component="h6" color="#000000" userSelect="none">
						{title[language]}
					</Typography>
				</StyledTitleContainer>
				{isMobile ? null : <SearchContainer />}
				<StyledIconContainer className="icon-container">
					{isMobile ? (
						<>
							<IconButton
								isLightColor={false}
								onClick={() => {
									setShowSearch((state) => !state);
								}}
								color="#757575"
								label={'Menu'}
							>
								<SearchIcon size="2.4rem" color="#757575" />
							</IconButton>
							<IconButton
								isLightColor={false}
								onClick={() => {
									setShowMiniMenu((state) => !state);
								}}
								color="#757575"
								label={'Menu'}
							>
								{showMiniMenu ? (
									<MdClear size="2.4rem" color="#757575" />
								) : (
									<DotsIcon size="2.4rem" color="#757575" />
								)}
							</IconButton>
							{showMiniMenu && isMobile ? <MiniMenu /> : null}
						</>
					) : (
						<Tools actions={tableActions} language={language} />
					)}
				</StyledIconContainer>
			</StyledHeader>
			{showSearch ? <SearchContainer /> : null}
			<StyledTable className={isMobile ? 'mobile table' : 'desktop table'}>
				{isMobile ? null : (
					<thead>
						<tr>
							<th>
								<Checkbox
									id="checkAll"
									checked={allChecked}
									onChange={handleAllCheckboxChange}
									controlled
								/>
							</th>
							{columnsState.map((column) => (
								<th
									style={{ width: column.width }}
									key={column.field}
									onClick={() => {
										changeSortOrder(column.field);
									}}
								>
									<span>{column.label[language]}&nbsp;&nbsp;</span>

									<span className={column.sort === 'asc' ? 'asc' : 'desc'}>
										▲
									</span>
								</th>
							))}
							<th>&nbsp;</th>
						</tr>
					</thead>
				)}
				{!isMobile ? (
					<tbody className="table-body">
						{dataForPage.map((row: DynamicObject) => (
							<tr
								key={row.id || row.name}
								onClick={(event) => {
									if (
										!(event.target as HTMLElement).classList.contains(
											'first-td'
										) &&
										((event.target as HTMLElement).tagName === 'TD' ||
											(event.target as HTMLElement).tagName === 'path' ||
											(event.target as HTMLElement).classList.contains(
												'icon-td'
											))
									) {
										navigateToRow(row.id || row.name);
									}
								}}
							>
								<td className="first-td">
									<Checkbox
										checked={checkedRows.has(
											row.id ? row.id.toString() : row.name
										)}
										onChange={() => {
											handleCheckboxChange(row.id || row.name);
										}}
										controlled
									/>
								</td>
								{columnsState.map((column) => {
									const pathArray = column.field.split('.');
									const cellValue = pathArray.reduce(
										(obj, key) => obj && obj[key],
										row
									);

									return (
										<td
											key={`${row.id || row.name || ''}-${column.field}`}
											className={column.type === 'number' ? 'number' : ''}
										>
											{typeof cellValue !== 'undefined' &&
											cellValue !== null ? (
												typeof cellValue === 'boolean' ? (
													cellValue ? (
														'TAK'
													) : (
														'NIE'
													)
												) : column.type === 'icon' ? (
													<div
														className="icon-td"
														style={{
															display: 'flex',
															alignItems: 'center',
															gap: '0.5rem',
														}}
													>
														<span className="icon-td">
															{String(cellValue || '')}
														</span>
														{getIconComponent(String(cellValue || '')) &&
															React.createElement(
																getIconComponent(String(cellValue || ''))!,
																{ className: 'icon-td' }
															)}
													</div>
												) : (
													String(cellValue || '')
												)
											) : (
												''
											)}
										</td>
									);
								})}
								<td>
									<IconButton
										isLightColor={false}
										onClick={() => navigateToRow(row.id || row.name)}
										color="#757575"
										label=""
									>
										{readOnly || !canUpdate ? (
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
								<td colSpan={columnsState.length + 2}>&nbsp;</td>
							</tr>
						))}
					</tbody>
				) : (
					<>
						{dataForPage.map((row: DynamicObject) => (
							<tbody
								key={`${row.id || row.name || ''}-tbody`}
								className="bodyMobile"
							>
								{columnsState.map((column: TableColumn, index: number) => {
									const pathArray = column.field.split('.');
									const cellValue = pathArray.reduce(
										(obj, key) => obj && obj[key],
										row
									);

									return (
										<tr
											key={`${row.id || row.name || ''}-tr-${index}`}
											className="innerRow"
										>
											<td
												onClick={() => {
													changeSortOrder(column.field);
												}}
											>
												<span
													className={column.sort === 'asc' ? 'asc' : 'desc'}
												>
													▲
												</span>
												&nbsp;
												<span>{column.label[language]}:</span>
											</td>
											<td>
												{typeof cellValue !== 'undefined' &&
												cellValue !== null ? (
													typeof cellValue === 'boolean' ? (
														cellValue ? (
															'TAK'
														) : (
															'NIE'
														)
													) : column.type === 'icon' ? (
														<>
															{getIconComponent(String(cellValue || '')) &&
																React.createElement(
																	getIconComponent(String(cellValue || ''))!,
																	{ className: 'icon-td' }
																)}
															<span>{String(cellValue || '')}</span>
														</>
													) : (
														String(cellValue || '')
													)
												) : (
													''
												)}
											</td>
										</tr>
									);
								})}
								<tr className="options">
									<td>Opcje:</td>
									<td className="options">
										<Checkbox
											checked={checkedRows.has(
												row.id ? row.id.toString() : row.name || ''
											)}
											onChange={() => handleCheckboxChange(row.id || row.name)}
											controlled
										/>
										&nbsp;
										<IconButton
											isLightColor={false}
											onClick={() => navigateToRow(row.id || row.name)}
											color="#757575"
											label=""
										>
											{readOnly || !canUpdate ? (
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
				<StyledFooter className={'desktop'}>
					<StyledFooterContainer>
						<StyledFooterItem>Wierszy na stronę:</StyledFooterItem>
						<StyledFooterItem>
							<select
								value={rowsPerPageState}
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
							{toRow > 0
								? `${fromRow} - ${toRow} / ${filteredData.length}  `
								: null}
						</StyledFooterItem>
						<StyledFooterItem>
							<IconButton
								isLightColor={false}
								onClick={() => {
									setPageNumber((pn) => {
										const newPn = pn > 1 ? pn - 1 : 1;
										navigate(
											`/${collection}/page/${newPn}?search=${encodeURIComponent(searchText)}`,
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
											Math.ceil(filteredData.length / computedRowsPerPage) > pn
												? pn + 1
												: pn;

										navigate(
											`/${collection}/page/${newPn}?search=${encodeURIComponent(searchText)}`,
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
