/// <reference types="react" />
import { Language, Translations } from '../../types';
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
interface SubmenuProps {
    children: JSX.Element | JSX.Element[];
    isOpen: boolean;
    elementsLength: number;
}
export declare function Submenu({ children, isOpen, elementsLength }: SubmenuProps): import("react/jsx-runtime").JSX.Element;
export declare function Menu(props: {
    menuElements: MenuElement[];
    language: Language;
}): import("react/jsx-runtime").JSX.Element;
export {};
