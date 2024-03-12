import { MenuElement } from '../atoms/Menu';
import { Language } from '../types';
interface DrawerProps {
    isDrawerOpen: boolean;
    closeOnClick: boolean;
    closeDrawer: () => void;
    menuElements: MenuElement[];
    language: Language;
}
export declare function Drawer(props: DrawerProps): import("react/jsx-runtime").JSX.Element;
export {};
