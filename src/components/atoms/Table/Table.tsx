import { IconType } from 'react-icons';
import styled from 'styled-components';
import { Card } from '../Card';
import { IconButton } from '../IconButton';
import { Typography } from '../Typography';

const StyledHeader = styled.div`
	display: flex;
	height: 64px;
	width: auto;
`;

export const StyledIconContainer = styled.div`
	display: flex;
	margin-top: -8px;
	margin-right: -12px;
	height: 48px;
	margin-left: auto;
	padding-left: 8px;
`;

export interface TableAction {
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
			<Typography component="h6" color="#000000" userSelect="none">
				{props.title}
			</Typography>
			<StyledIconContainer>
				{props.actions.map((action) => (
					<IconButton
						isLightColor={false}
						onClick={action.onClick}
						color="#757575"
						label={action.hint}
					>
						<action.icon size={24} color="#757575" />
					</IconButton>
				))}
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
		<Card minWidth="320px" padding={true}>
			<TableHeader title={props.title} actions={props.actions} />
			<TableBody />
			<TableFooter />
		</Card>
	);
}
