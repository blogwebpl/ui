/* eslint-disable no-underscore-dangle */
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {
	MdSettings as IconSettings,
	MdMap as IconMap,
	MdViewList as IconRecord,
	MdMenu as IconMenu,
	MdOutlineInventory as IconInventory,
} from 'react-icons/md';
import { RiMenuAddLine as IconAddMenu } from 'react-icons/ri';

import { MultiValue, SingleValue } from 'react-select';
import { Select, SelectOption } from '../atoms/Select';
import { Language } from '../types';
import { IMenuItem, MenuSchema } from '../atoms/Menu';

const StyledMenuEditor = styled.div`
	width: 100%;
	max-width: 56rem;
	border: 1px solid #ccc;
	padding: 0.8rem;
	border-radius: ${(props) => props.theme.borderRadius};
	li {
		padding: 0.8rem;
		user-select: none;
	}
	li > div {
		display: flex;
		align-items: center;
	}
	li > ul {
		padding-top: 1rem;
		padding-left: 3.2rem;
	}
	li:last-child {
		opacity: 0.6;
		cursor: pointer;
	}
	.up,
	.down,
	.remove {
		cursor: pointer;
	}
	.parent > li:nth-last-child(2) > div > span > .down {
		pointer-events: none;
		opacity: 0.5;
		cursor: not-allowed;
	}
	.parent > li:first-child > div > span > .up {
		pointer-events: none;
		opacity: 0.5;
		cursor: not-allowed;
	}
	li > ul > li:first-child .up {
		pointer-events: none;
		opacity: 0.5;
		cursor: not-allowed;
	}
	li > ul > li:nth-last-child(2) .down {
		pointer-events: none;
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

const StyledMenuContainer = styled.div`
	padding: 1.2rem;
`;

const StyledIconContainer = styled.div`
	height: 2.4rem;
	margin-right: 0.8rem;
	width: 2.4rem;
	display: inline-block;
`;

const selectLabel = {
	en: 'Select option',
	pl: 'Wybierz opcję',
};

const addParentLabel = {
	en: 'add parent menu item',
	pl: 'dodaj element/y menu',
};

const addChildLabel = {
	en: 'add child menu item',
	pl: 'dodaj element/y podrzędne',
};

interface MenuEditorProps {
	menuItems: IMenuItem[];
	menu: MenuSchema | undefined;
	language: Language;
	hidden?: boolean;
}

export const MenuEditor = (props: MenuEditorProps) => {
	const options = props.menuItems
		? props.menuItems
				.sort((a: IMenuItem, b: IMenuItem) =>
					a.label[props.language].localeCompare(b.label[props.language])
				)
				.map((item) => ({
					value: item.id,
					label: item.label[props.language],
				}))
		: [];
	const [value, setValue] = useState<MultiValue<SelectOption> | SingleValue<SelectOption>>(null);
	const [menuItems, setMenuItems] = useState(props.menu?.menuItems || []);

	useEffect(() => {
		if (props.menu) {
			setMenuItems(props.menu.menuItems);
		}
	}, [props.menu]);

	const moveItem = (direction: 'up' | 'down', itemId: string) => {
		setMenuItems((prevItems) => {
			const itemIndex = prevItems.findIndex((item) => item.item === itemId);
			if (itemIndex === -1) return prevItems;
			const itemToMove = prevItems[itemIndex];
			const parentItemId = itemToMove.parent;
			const siblings = parentItemId
				? prevItems.filter((item) => item.parent === parentItemId)
				: prevItems.filter((item) => !item.parent);
			const siblingIndex = siblings.findIndex((item) => item.item === itemId);
			let newSiblingIndex = siblingIndex;
			if (direction === 'up') {
				newSiblingIndex = Math.max(0, siblingIndex - 1);
			} else {
				newSiblingIndex = Math.min(siblings.length - 1, siblingIndex + 1);
			}
			if (newSiblingIndex !== siblingIndex) {
				const reorderedSiblings = [...siblings];
				reorderedSiblings.splice(siblingIndex, 1);
				reorderedSiblings.splice(newSiblingIndex, 0, itemToMove);
				const newItems = parentItemId
					? [...prevItems.filter((item) => item.parent !== parentItemId), ...reorderedSiblings]
					: reorderedSiblings.concat(prevItems.filter((item) => item.parent));
				return newItems;
			}
			return prevItems;
		});
	};

	const removeItem = (itemId: string) => {
		setMenuItems((prevItems) => {
			const itemToRemoveIndex = prevItems.findIndex((item) => item.item === itemId);
			if (itemToRemoveIndex === -1) return prevItems;
			const newItems = prevItems.filter((item) => item.item !== itemId && item.parent !== itemId);
			return newItems;
		});
	};

	const addParentFromSelect = () => {
		if (value && Array.isArray(value)) {
			const newMenuItems = (value as MultiValue<SelectOption>).map((selectedItem) => ({
				item: selectedItem.value,
				parent: undefined,
			}));
			setMenuItems((prevItems) => [...prevItems, ...newMenuItems]);
		}
		setValue(null);
	};

	const addChildFromSelect = (parentId: string) => {
		if (value && Array.isArray(value)) {
			const newMenuItems = (value as MultiValue<SelectOption>).map((selectedItem) => ({
				item: selectedItem.value,
				parent: parentId,
			}));
			setMenuItems((prevItems) => [...prevItems, ...newMenuItems]);
		}
		setValue(null);
	};

	const getIcon = (parentIcon: string | undefined | null) => {
		switch (parentIcon) {
			case 'settings':
				return IconSettings;
			case 'map':
				return IconMap;
			case 'record':
				return IconRecord;
			case 'inventory':
				return IconInventory;
			default:
				return IconMenu;
		}
	};
	if (!props.menu || props.hidden) return null;

	return (
		<StyledMenuEditor>
			<Select
				isMulti={true}
				label={selectLabel[props.language]}
				isRequired={true}
				options={options}
				value={value}
				onChange={setValue}
			/>
			<StyledMenuContainer>
				<ul className="parent">
					{menuItems.map((item) => {
						const isParent = item.parent === undefined;
						if (isParent) {
							const parentIcon = props.menuItems.find((i) => i.id === item.item)?.icon;
							const Icon = getIcon(parentIcon);
							return (
								<li key={item.item}>
									<div>
										<StyledIconContainer>
											{Icon ? <Icon size="2.4rem" /> : null}
										</StyledIconContainer>
										{props.menuItems.find((i) => i.id === item.item)?.label[props.language]}
										<span>
											&nbsp;&nbsp;&nbsp;
											<span className="up" onClick={() => moveItem('up', item.item)}>
												[ ⬆ ]
											</span>{' '}
											<span className="down" onClick={() => moveItem('down', item.item)}>
												[ ⬇ ]
											</span>{' '}
											<span className="remove" onClick={() => removeItem(item.item)}>
												[ x ]
											</span>
										</span>
									</div>
									<ul className="child">
										{menuItems
											.filter((childItem) => childItem.parent === item.item)
											.map((childItem) => (
												<li key={childItem.item}>
													{
														props.menuItems.find((i) => i.id === childItem.item)?.label[
															props.language
														]
													}
													<span>
														&nbsp;&nbsp;&nbsp;
														<span className="up" onClick={() => moveItem('up', childItem.item)}>
															[ ⬆ ]
														</span>{' '}
														<span className="down" onClick={() => moveItem('down', childItem.item)}>
															[ ⬇ ]
														</span>{' '}
														<span className="remove" onClick={() => removeItem(childItem.item)}>
															[ x ]
														</span>
													</span>
												</li>
											))}
										<li>
											<div onClick={() => addChildFromSelect(item.item)}>
												<StyledIconContainer>
													<IconAddMenu size="2.4rem" />
												</StyledIconContainer>
												[ {addChildLabel[props.language]} ]
											</div>
										</li>
									</ul>
								</li>
							);
						}
						return null; // Ensure a value is returned for non-parent items
					})}
					<li>
						<div onClick={addParentFromSelect}>
							<StyledIconContainer>
								<IconAddMenu size="2.4rem" />
							</StyledIconContainer>
							[ {addParentLabel[props.language]} ]
						</div>
					</li>
				</ul>
			</StyledMenuContainer>
		</StyledMenuEditor>
	);
};
