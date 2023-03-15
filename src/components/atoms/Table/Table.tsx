import { IconType } from 'react-icons';
import styled from 'styled-components';
import { MdSearch as SearchIcon } from 'react-icons/md';

import { Card } from '../Card';
// import { IconButton } from '../IconButton';
import { TextField } from '../TextField';
import { Typography } from '../Typography';
import { Tools } from '../Tools';

const StyledHeader = styled.div`
	display: flex;
	flex-wrap: wrap;
	height: auto;
	width: auto;
`;

export const StyledTitleContainer = styled.div`
	height: 64px;
	width: 100%;
	box-sizing: border-box;
	padding-top: 16px;
	padding-left: 16px;
	padding-right: 16px;
	flex: 1;
`;
export const StyledFilterContainer = styled.div`
	height: 64px;
	display: flex;
	padding: 0 8px;
	align-items: center;
	flex: 0 0 100%;
	box-sizing: border-box;
	order: 3;
	@media (min-width: 321px) {
		order: 0;
		max-width: 180px;
	}
`;
export const StyledIconContainer = styled.div`
	flex: 1;
	height: 64px;
	width: auto;
	display: none;
	align-items: center;
	margin-left: auto;
	padding-right: 2px;
	padding-left: 8px;
	@media (min-width: 321px) {
		display: flex;
	}
`;

export interface TableAction {
	id: string;
	icon: IconType;
	hint: string;
	isDisabled?: boolean;
	onClick: () => void;
}

interface TableHeaderProps {
	title: string;
	actions: TableAction[];
}

export interface TableProps extends TableHeaderProps {}

function TableHeader(props: TableHeaderProps) {
	return (
		<StyledHeader>
			<StyledTitleContainer>
				<Typography component="h6" color="#000000" userSelect="none">
					{props.title}
				</Typography>
			</StyledTitleContainer>
			<StyledFilterContainer>
				<TextField label="" type="text" icon={SearchIcon} slim={true} />
			</StyledFilterContainer>
			<StyledIconContainer>
				<Tools actions={props.actions} />
				{/* <div style={{ display: 'flex', width: 'auto', height: '48px' }}>
					{props.actions.map((action) => (
						<IconButton
							key={action.id}
							isLightColor={false}
							onClick={action.onClick}
							color="#757575"
							label={action.hint}
						>
							<action.icon size={24} color="#757575" />
						</IconButton>
					))}
				</div> */}
			</StyledIconContainer>
		</StyledHeader>
	);
}

function TableBody() {
	return <div>body</div>;
}

function TableFooter() {
	return <div>footer</div>;
}

export function Table(props: TableProps) {
	return (
		<Card minWidth="320px" padding={false}>
			<TableHeader title={props.title} actions={props.actions} />
			<TableBody />
			<TableFooter />
		</Card>
	);
}
