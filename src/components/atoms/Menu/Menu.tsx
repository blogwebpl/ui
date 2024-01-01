import { useState } from 'react';
import styled from 'styled-components';
import { MdArrowRight as IconRight } from 'react-icons/md';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Language, Translations } from '../../types';
import { getIconComponent } from '../IconSelect/IconSelect'; // Import funkcji getIconComponent

const StyledMenu = styled.ul`
	li {
		border-bottom: 0.1rem solid #eeeeee;
		padding: 0.8rem;
	}
`;

const StyledSubmenu = styled.div<{ $isopen: boolean; $elementsLength: number }>`
	font-size: 1.4rem;
	height: auto;
	max-height: ${(props) => (props.$isopen ? `${4.4 * props.$elementsLength}rem` : '0')};
	overflow: hidden;
	a {
		text-decoration: none;
	}
	opacity: ${(props) => (props.$isopen ? '1' : '0')};
	transition:
		opacity 0.25s ease-out,
		max-height 0.25s ease-out;
`;

export interface IMenuItem {
	id: string;
	icon?: string | null;
	label: Translations;
	link?: string | null | undefined;
}

export interface MenuElement {
	id: string;
	icon: string;
	label: Translations;
	children: IMenuItem[];
	link?: string | null | undefined;
}

export interface MenuItemsSchema {
	item: string;
	parent?: string;
}

export interface MenuSchema {
	id: string;
	name: string;
	menuItems: Array<MenuItemsSchema>;
}

interface MenuItemProps {
	id: string;
	label: string;
	icon?: string;
	isOpen?: boolean;
	setOpenedItem?: (item: string) => void;
	link: string | null | undefined;
	isSub?: boolean;
}

interface SubmenuProps {
	children: JSX.Element | JSX.Element[];
	isOpen: boolean;
	elementsLength: number;
}

const StyledItem = styled.div<{ $isopen: boolean; $issub: boolean }>`
	align-items: center;
	color: ${(props) =>
		props.$issub ? props.theme.palette.text.menuSecondary : props.theme.palette.text.menuPrimary};
	display: flex;
	font-size: 1.4rem;
	font-weight: 500;
	height: auto;
	margin: 0;
	padding: ${(props) => (props.$issub ? '0.4rem 1.6rem' : '0.8rem 1.6rem')};
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

const StyledChevronContainer = styled.div<{ $isopen: boolean }>`
	height: 2.4rem;
	transform: ${(props) => (props.$isopen ? 'rotate(90deg)' : 'rotate(0)')};
	transition: transform ease-out 0.35s;
	width: 2.4rem;
`;

function MenuItem({
	id,
	label,
	icon,
	isOpen = false,
	setOpenedItem = () => {},
	link,
	isSub = false,
}: MenuItemProps) {
	const navigate: NavigateFunction = useNavigate();
	const IconComponent = getIconComponent(icon);
	return (
		<StyledItem
			$issub={isSub}
			$isopen={isOpen}
			onClick={() => {
				if (link) {
					navigate(link);
				} else {
					setOpenedItem(isOpen ? '' : id);
				}
			}}
		>
			<StyledIconContainer>
				{IconComponent ? <IconComponent size="2.4rem" /> : null}
			</StyledIconContainer>
			<StyledLabel className={link ? 'link' : ''}>{label}</StyledLabel>
			{link ? null : (
				<StyledChevronContainer $isopen={isOpen}>
					<IconRight size="2.4rem" />
				</StyledChevronContainer>
			)}
		</StyledItem>
	);
}

export function Submenu({ children, isOpen, elementsLength }: SubmenuProps) {
	return (
		<StyledSubmenu $elementsLength={elementsLength} $isopen={isOpen}>
			{children}
		</StyledSubmenu>
	);
}

export function Menu(props: { menuElements: MenuElement[]; language: Language }) {
	const [openedItem, setOpenedItem] = useState('');
	return (
		<StyledMenu className="menu">
			{props.menuElements.map((menuElement: MenuElement) => (
				<li key={menuElement.id}>
					<MenuItem
						id={menuElement.id}
						icon={menuElement.icon}
						isOpen={openedItem === menuElement.id}
						setOpenedItem={setOpenedItem}
						label={menuElement.label[props.language]}
						link={menuElement.children.length === 0 ? menuElement.link! : null}
					/>
					{menuElement.children.length > 0 ? (
						<Submenu
							elementsLength={menuElement.children.length}
							isOpen={openedItem === menuElement.id}
						>
							{menuElement.children.map((subItem: IMenuItem) => (
								<MenuItem
									key={subItem.id}
									id={subItem.id}
									label={subItem.label[props.language]}
									link={subItem.link}
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
