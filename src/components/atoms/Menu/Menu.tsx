import { useState } from 'react';
import styled from 'styled-components';
import { MdArrowRight as IconRight } from 'react-icons/md';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { IconType } from 'react-icons';

const StyledMenu = styled.ul`
	li {
		border-bottom: 0.1rem solid #eeeeee;
		padding: 0.8rem;
	}
`;

const StyledSubmenu = styled.div<{ isOpen: boolean; elements: number }>`
	font-size: 1.4rem;
	height: auto;
	max-height: ${(props) => (props.isOpen ? `${4.4 * props.elements}rem` : '0')};
	overflow: hidden;
	a {
		text-decoration: none;
	}
	opacity: ${(props) => (props.isOpen ? '1' : '0')};
	transition:
		opacity 0.25s ease-out,
		max-height 0.25s ease-out;
`;

interface SubmenuProps {
	children: JSX.Element | JSX.Element[];
	isOpen: boolean;
	elements: number;
}

const StyledItem = styled.div<{ isOpen: boolean; isSub: boolean }>`
	align-items: center;
	color: ${(props) =>
		props.isSub ? props.theme.palette.text.menuSecondary : props.theme.palette.text.menuPrimary};
	display: flex;
	font-size: 1.4rem;
	font-weight: 500;
	height: auto;
	margin: 0;
	padding: ${(props) => (props.isSub ? '0.4rem 1.6rem' : '0.8rem 1.6rem')};
	user-select: none;
	cursor: pointer;
`;

const StyledIconContainer = styled.div`
	height: 2.4rem;
	margin-right: 3.2rem;
	width: 2.4rem;
`;

const StyledLabel = styled.div`
	flex-grow: 1;
`;

const StyledChevronContainer = styled.div<{ isOpen: boolean }>`
	height: 2.4rem;
	transform: ${(props) => (props.isOpen ? 'rotate(90deg)' : 'rotate(0)')};
	transition: transform ease-out 0.35s;
	width: 2.4rem;
`;

interface MenuItemProps {
	id: string;
	label: string;
	Icon?: IconType | undefined;
	isOpen?: boolean;
	setOpenedItem?: any;
	url: string | null;
	isSub?: boolean;
}

function MenuItem({
	id,
	label,
	Icon,
	isOpen = false,
	setOpenedItem = () => {},
	url,
	isSub = false,
}: MenuItemProps) {
	const navigate: NavigateFunction = useNavigate();
	return (
		<StyledItem
			isSub={isSub}
			isOpen={isOpen}
			onClick={() => {
				if (url) {
					navigate(url);
				} else {
					setOpenedItem(isOpen ? '' : id);
				}
			}}
		>
			<StyledIconContainer>{Icon ? <Icon size="2.4rem" /> : null}</StyledIconContainer>
			<StyledLabel className={url ? 'link' : ''}>{label}</StyledLabel>
			{url ? null : (
				<StyledChevronContainer isOpen={isOpen}>
					<IconRight size="2.4rem" />
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

export interface Item {
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
				<li key={item.id}>
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
									isSub={true}
								/>
							))}
						</Submenu>
					) : null}
				</li>
			))}
		</StyledMenu>
	);
}
