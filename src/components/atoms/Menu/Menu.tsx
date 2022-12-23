import { useState } from 'react';
import styled from 'styled-components';
import { MdChevronRight as IconRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { IconType } from 'react-icons';

const StyledMenu = styled.div`
	margin: 0;
	padding: 8px 0;
`;

const StyledSubmenu = styled.div<{ isOpen: boolean; elements: number }>`
	font-size: 14px;
	height: auto;
	max-height: ${(props) => (props.isOpen ? `${44 * props.elements}px` : '0')};
	overflow: hidden;
	transition: max-height 0.35s ease-out;
	a {
		text-decoration: none;
	}
`;

interface SubmenuProps {
	children: JSX.Element | JSX.Element[];
	isOpen: boolean;
	elements: number;
}

const StyledItem = styled.div<{ isOpen: boolean }>`
	align-items: center;
	color: ${(props) => props.theme.palette.text.primary};
	display: flex;
	font-size: 1em;
	height: 2em;
	margin: 0;
	padding: 8px 16px;
	user-select: none;
	&:hover {
		background-color: ${(props) =>
			props.isOpen
				? props.theme.palette.background.paperDark
				: props.theme.palette.background.paper};
	}

	&:active {
		background-color: ${(props) =>
			`${props.theme.palette.text.primary}${props.theme.opacity.actions.active} }`};
	}
`;

const StyledIconContainer = styled.div`
	height: 24px;
	margin-right: 32px;
	width: 24px;
`;

const StyledLabel = styled.div`
	flex-grow: 1;
`;

const StyledChevronContainer = styled.div<{ isOpen: boolean }>`
	height: 24px;
	transform: ${(props) => (props.isOpen ? 'rotate(90deg)' : 'rotate(0)')};
	transition: transform ease-out 0.35s;
	width: 24px;
`;

interface MenuItemProps {
	id: string;
	label: string;
	Icon?: IconType | undefined;
	isOpen?: boolean;
	setOpenedItem?: any;
	url: string | null;
}

function MenuItem({
	id,
	label,
	Icon,
	isOpen = false,
	setOpenedItem = () => {},
	url,
}: MenuItemProps) {
	const navigate = useNavigate();
	return (
		<StyledItem
			isOpen={isOpen}
			onClick={() => {
				if (url) {
					navigate(url);
				} else {
					setOpenedItem(isOpen ? '' : id);
				}
			}}
		>
			<StyledIconContainer>{Icon ? <Icon size={24} /> : null}</StyledIconContainer>
			<StyledLabel className={url ? 'link' : ''}>{label}</StyledLabel>
			{url ? null : (
				<StyledChevronContainer isOpen={isOpen}>
					<IconRight size={24} />
				</StyledChevronContainer>
			)}
		</StyledItem>
	);
}

export function Submenu({ children, isOpen, elements }: SubmenuProps) {
	return (
		<StyledSubmenu elements={elements} isOpen={isOpen}>
			{children}
		</StyledSubmenu>
	);
}

interface Item {
	id: string;
	icon: IconType;
	label: string;
	children: any;
	slug: string;
}

export function Menu(props: { items: Item[] }) {
	const [openedItem, setOpenedItem] = useState('');
	return (
		<StyledMenu className="menu">
			{props.items.map((item: Item) => (
				<div key={item.id}>
					<MenuItem
						id={item.id}
						Icon={item.icon}
						isOpen={openedItem === item.id}
						setOpenedItem={setOpenedItem}
						label={item.label}
						url={item.children.length === 0 ? item.slug! : null}
					/>
					{item.children.length > 0 ? (
						<Submenu elements={item.children.length} isOpen={openedItem === item.id}>
							{item.children.map((subItem: any) => (
								<MenuItem
									key={subItem.id}
									id={subItem.id}
									label={subItem.label}
									url={subItem.slug}
								/>
							))}
						</Submenu>
					) : null}
				</div>
			))}
		</StyledMenu>
	);
}
