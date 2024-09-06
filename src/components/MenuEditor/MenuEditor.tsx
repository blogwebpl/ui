/* eslint-disable no-underscore-dangle */
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
import { IMenuItem, MenuItemsSchema } from '../atoms/Menu';
import {
	StyledIconContainer,
	StyledMenuContainer,
	StyledMenuEditor,
} from './menuEditorStyles';

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
	menuItemsInMenu: MenuItemsSchema[];
	language: Language;
	hidden?: boolean;
	onChange: (menuItems: MenuItemsSchema[]) => void;
	label: string;
}

export const MenuEditor = (props: MenuEditorProps) => {
	const [value, setValue] = useState<
		MultiValue<SelectOption> | SingleValue<SelectOption>
	>(null);
	const [menuItemsInMenu, setMenuItemsInMenu] = useState<MenuItemsSchema[]>(
		props.menuItemsInMenu || []
	);

	useEffect(() => {
		if (props.menuItemsInMenu) {
			setMenuItemsInMenu(props.menuItemsInMenu);
		}
	}, [props.menuItemsInMenu]);

	useEffect(() => {
		props.onChange(menuItemsInMenu);
		// console.log('menuItemsInMenu', menuItemsInMenu);
	}, [menuItemsInMenu]);

	const moveItem = (direction: 'up' | 'down', itemId: string) => {
		setMenuItemsInMenu((prevItems) => {
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
					? [
							...prevItems.filter((item) => item.parent !== parentItemId),
							...reorderedSiblings,
						]
					: reorderedSiblings.concat(prevItems.filter((item) => item.parent));
				return newItems;
			}
			return prevItems;
		});
	};

	const removeItem = (itemId: string) => {
		setMenuItemsInMenu((prevItems) => {
			const itemToRemoveIndex = prevItems.findIndex(
				(item) => item.item === itemId
			);
			if (itemToRemoveIndex === -1) return prevItems;
			const newItems = prevItems.filter(
				(item) => item.item !== itemId && item.parent !== itemId
			);
			return newItems;
		});
	};

	const addParentFromSelect = () => {
		if (value && Array.isArray(value)) {
			const newMenuItems = (value as MultiValue<SelectOption>).map(
				(selectedItem) => ({
					item: selectedItem.value,
					parent: undefined,
				})
			);
			setMenuItemsInMenu((prevItems) => [...prevItems, ...newMenuItems]);
		}
		setValue(null);
	};

	const addChildFromSelect = (parentId: string) => {
		if (value && Array.isArray(value)) {
			const newMenuItems = (value as MultiValue<SelectOption>).map(
				(selectedItem) => ({
					item: selectedItem.value,
					parent: parentId,
				})
			);
			setMenuItemsInMenu((prevItems) => [...prevItems, ...newMenuItems]);
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
	if (!props.menuItemsInMenu || props.hidden) return null;

	const potentialMenuItems = props.menuItems
		? props.menuItems
				.sort((a: IMenuItem, b: IMenuItem) =>
					a.label[props.language]?.localeCompare(b.label[props.language])
				)
				.map((item: IMenuItem) => ({
					value: item.id,
					label: item.label[props.language] || '',
				}))
		: [];

	return (
		<StyledMenuEditor>
			<label>{props.label}</label>

			<Select
				isMulti={true}
				label={selectLabel[props.language]}
				isRequired={true}
				options={potentialMenuItems}
				value={value}
				onChange={setValue}
			/>

			<StyledMenuContainer>
				<ul className="parent">
					{Array.isArray(menuItemsInMenu) &&
						menuItemsInMenu.map((item) => {
							const isParent = item.parent === undefined;
							if (isParent) {
								const parentIcon = props.menuItems.find(
									(i) => i.id === item.item
								)?.icon;
								const Icon = getIcon(parentIcon);
								return (
									<li key={item.item}>
										<div>
											<StyledIconContainer>
												{Icon ? <Icon size="2.4rem" /> : null}
											</StyledIconContainer>
											{props.menuItems.find((i) => i.id === item.item)?.label[
												props.language
											] || ''}
											<span>
												&nbsp;&nbsp;&nbsp;
												<span
													className="up"
													onClick={() => moveItem('up', item.item)}
												>
													[ ⬆ ]
												</span>{' '}
												<span
													className="down"
													onClick={() => moveItem('down', item.item)}
												>
													[ ⬇ ]
												</span>{' '}
												<span
													className="remove"
													onClick={() => removeItem(item.item)}
												>
													[ x ]
												</span>
											</span>
										</div>
										<ul className="child">
											{menuItemsInMenu
												.filter((childItem) => childItem.parent === item.item)
												.map((childItem) => (
													<li key={childItem.item}>
														{props.menuItems.find(
															(i) => i.id === childItem.item
														)?.label[props.language] || ''}
														<span>
															&nbsp;&nbsp;&nbsp;
															<span
																className="up"
																onClick={() => moveItem('up', childItem.item)}
															>
																[ ⬆ ]
															</span>{' '}
															<span
																className="down"
																onClick={() => moveItem('down', childItem.item)}
															>
																[ ⬇ ]
															</span>{' '}
															<span
																className="remove"
																onClick={() => removeItem(childItem.item)}
															>
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
							return null;
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
