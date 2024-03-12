import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { MdSettings as IconSettings, MdMap as IconMap, MdViewList as IconRecord, MdMenu as IconMenu, MdOutlineInventory as IconInventory, } from 'react-icons/md';
import { RiMenuAddLine as IconAddMenu } from 'react-icons/ri';
import { Select } from '../atoms/Select';
import { StyledIconContainer, StyledMenuContainer, StyledMenuEditor } from './menuEditorStyles';
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
export const MenuEditor = (props) => {
    const [value, setValue] = useState(null);
    const [menuItemsInMenu, setMenuItemsInMenu] = useState(props.menuItemsInMenu || []);
    useEffect(() => {
        if (props.menuItemsInMenu) {
            setMenuItemsInMenu(props.menuItemsInMenu);
        }
    }, [props.menuItemsInMenu]);
    useEffect(() => {
        props.onChange(menuItemsInMenu);
        // console.log('menuItemsInMenu', menuItemsInMenu);
    }, [menuItemsInMenu]);
    const moveItem = (direction, itemId) => {
        setMenuItemsInMenu((prevItems) => {
            const itemIndex = prevItems.findIndex((item) => item.item === itemId);
            if (itemIndex === -1)
                return prevItems;
            const itemToMove = prevItems[itemIndex];
            const parentItemId = itemToMove.parent;
            const siblings = parentItemId
                ? prevItems.filter((item) => item.parent === parentItemId)
                : prevItems.filter((item) => !item.parent);
            const siblingIndex = siblings.findIndex((item) => item.item === itemId);
            let newSiblingIndex = siblingIndex;
            if (direction === 'up') {
                newSiblingIndex = Math.max(0, siblingIndex - 1);
            }
            else {
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
    const removeItem = (itemId) => {
        setMenuItemsInMenu((prevItems) => {
            const itemToRemoveIndex = prevItems.findIndex((item) => item.item === itemId);
            if (itemToRemoveIndex === -1)
                return prevItems;
            const newItems = prevItems.filter((item) => item.item !== itemId && item.parent !== itemId);
            return newItems;
        });
    };
    const addParentFromSelect = () => {
        if (value && Array.isArray(value)) {
            const newMenuItems = value.map((selectedItem) => ({
                item: selectedItem.value,
                parent: undefined,
            }));
            setMenuItemsInMenu((prevItems) => [...prevItems, ...newMenuItems]);
        }
        setValue(null);
    };
    const addChildFromSelect = (parentId) => {
        if (value && Array.isArray(value)) {
            const newMenuItems = value.map((selectedItem) => ({
                item: selectedItem.value,
                parent: parentId,
            }));
            setMenuItemsInMenu((prevItems) => [...prevItems, ...newMenuItems]);
        }
        setValue(null);
    };
    const getIcon = (parentIcon) => {
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
    if (!props.menuItemsInMenu || props.hidden)
        return null;
    const potentialMenuItems = props.menuItems
        ? props.menuItems
            .sort((a, b) => { var _a; return (_a = a.label[props.language]) === null || _a === void 0 ? void 0 : _a.localeCompare(b.label[props.language]); })
            .map((item) => ({
            value: item.id,
            label: item.label[props.language] || '',
        }))
        : [];
    return (_jsxs(StyledMenuEditor, { children: [_jsx("label", { children: props.label }), _jsx(Select, { isMulti: true, label: selectLabel[props.language], isRequired: true, options: potentialMenuItems, value: value, onChange: setValue }), _jsx(StyledMenuContainer, { children: _jsxs("ul", { className: "parent", children: [Array.isArray(menuItemsInMenu) &&
                            menuItemsInMenu.map((item) => {
                                var _a, _b;
                                const isParent = item.parent === undefined;
                                if (isParent) {
                                    const parentIcon = (_a = props.menuItems.find((i) => i.id === item.item)) === null || _a === void 0 ? void 0 : _a.icon;
                                    const Icon = getIcon(parentIcon);
                                    return (_jsxs("li", { children: [_jsxs("div", { children: [_jsx(StyledIconContainer, { children: Icon ? _jsx(Icon, { size: "2.4rem" }) : null }), ((_b = props.menuItems.find((i) => i.id === item.item)) === null || _b === void 0 ? void 0 : _b.label[props.language]) || '', _jsxs("span", { children: ["\u00A0\u00A0\u00A0", _jsx("span", { className: "up", onClick: () => moveItem('up', item.item), children: "[ \u2B06 ]" }), ' ', _jsx("span", { className: "down", onClick: () => moveItem('down', item.item), children: "[ \u2B07 ]" }), ' ', _jsx("span", { className: "remove", onClick: () => removeItem(item.item), children: "[ x ]" })] })] }), _jsxs("ul", { className: "child", children: [menuItemsInMenu
                                                        .filter((childItem) => childItem.parent === item.item)
                                                        .map((childItem) => {
                                                        var _a;
                                                        return (_jsxs("li", { children: [((_a = props.menuItems.find((i) => i.id === childItem.item)) === null || _a === void 0 ? void 0 : _a.label[props.language]) || '', _jsxs("span", { children: ["\u00A0\u00A0\u00A0", _jsx("span", { className: "up", onClick: () => moveItem('up', childItem.item), children: "[ \u2B06 ]" }), ' ', _jsx("span", { className: "down", onClick: () => moveItem('down', childItem.item), children: "[ \u2B07 ]" }), ' ', _jsx("span", { className: "remove", onClick: () => removeItem(childItem.item), children: "[ x ]" })] })] }, childItem.item));
                                                    }), _jsx("li", { children: _jsxs("div", { onClick: () => addChildFromSelect(item.item), children: [_jsx(StyledIconContainer, { children: _jsx(IconAddMenu, { size: "2.4rem" }) }), "[ ", addChildLabel[props.language], " ]"] }) })] })] }, item.item));
                                }
                                return null;
                            }), _jsx("li", { children: _jsxs("div", { onClick: addParentFromSelect, children: [_jsx(StyledIconContainer, { children: _jsx(IconAddMenu, { size: "2.4rem" }) }), "[ ", addParentLabel[props.language], " ]"] }) })] }) })] }));
};
//# sourceMappingURL=MenuEditor.js.map