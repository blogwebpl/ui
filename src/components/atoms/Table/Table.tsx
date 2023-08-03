import '@total-typescript/ts-reset';
import { IconType } from 'react-icons';

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
	const [isMobile, setIsMobile] = useState(false);
	const [fontSize, setFontSize] = useState<number>(getFontSizeFromBody());
	const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
	const [rowsPerPage, setRowsPerPage] = useState<number>(props.rowsPerPage || 0);
	const [pageNumber, setPageNumber] = useState<number>(props.pageNumber || 1);

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

	let computedRowsPerPage = rowsPerPage;

	if (rowsPerPage === 0) {
		console.log(fontSize);

		const headerHeight = 7.5 * fontSize;
		const footerHeight = 3 * fontSize;
		const rowHeight = 3.2 * fontSize;
		computedRowsPerPage = Math.floor((viewportHeight - headerHeight - footerHeight) / rowHeight);
		if (computedRowsPerPage < 0) computedRowsPerPage = 0;
	}

	if (isMobile) computedRowsPerPage = data.length;

	const startIndex = (pageNumber - 1) * computedRowsPerPage;
	const endIndex = startIndex + computedRowsPerPage;
	const dataForPage = data.slice(startIndex, endIndex);

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
						<TextField label="" type="text" icon={SearchIcon} slim={true} autoFocus />
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
						<Tools actions={props.actions} />
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
								<th style={{ minWidth: column.width }} key={column.id}>
									<span>{column.label}&nbsp;&nbsp;</span>
									<span>▲</span>
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
										<EditIcon size="2.4rem" color="#757575" />
									</IconButton>
								</td>
							</tr>
						))}
					</tbody>
				) : (
					<>
						{dataForPage.map((row: DynamicObject) => (
							<tbody key={`${row.id}-tbody`} className="bodyMobile">
								{props.columns.map((column: TableColumn, index: number) => (
									<tr key={`${row.id}-tr-${index}`} className="innerRow">
										<td>{column.label}:</td>
										<td>{row[column.id]}</td>
									</tr>
								))}
								<tr className="options">
									<td>Opcje:</td>
									<td className="options">
										<Checkbox />{' '}
										<IconButton isLightColor={false} onClick={() => {}} color="#757575" label="">
											<EditIcon size="2.4rem" color="#757575" />
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
								<PrevIcon size="2.4rem" color="#757575" />
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
								<NextIcon size="2.4rem" color="#757575" />
							</IconButton>
						</StyledFooterItem>
					</StyledFooterContainer>
				</StyledFooter>
			)}
		</Card>
	);
}
