import { Language } from '../types';
import { IMenuItem, MenuItemsSchema } from '../atoms/Menu';
interface MenuEditorProps {
    menuItems: IMenuItem[];
    menuItemsInMenu: MenuItemsSchema[];
    language: Language;
    hidden?: boolean;
    onChange: (menuItems: MenuItemsSchema[]) => void;
    label: string;
}
export declare const MenuEditor: (props: MenuEditorProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
