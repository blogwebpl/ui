import { IconType } from 'react-icons';
interface AppBarProps {
    /**
     * Action on 'Profile Icon' click.
     */
    handleProfileClick?: () => void;
    /**
     * Action on 'Action Icon' click.
     */
    handleActionClick?: () => void;
    /**
     * Drawer state: true - open; false - close.
     */
    isDrawerOpen?: boolean;
    /**
     * Menu on the right - state: true - open; false - close.
     */
    isSidebarOpen?: boolean;
    /**
     * Is user sign in ?
     */
    isLoggedIn?: boolean;
    /**
     * Set Drawer state:  true - open; false - close.
     */
    setIsDrawerOpen?: (isDrawerOpen: boolean) => void;
    /**
     * Set menu od the right state:  true - open; false - close.
     */
    setIsSidebarOpen?: (isSidebarOpen: boolean) => void;
    /**
     *  Icon - control for sidbar
     */
    SidebarIcon?: IconType;
    /**
     *  Icon - control for action
     */
    ActionIcon?: IconType;
    /**
     * Appbar title.
     */
    title: string;
}
export declare function AppBar(props: AppBarProps): import("react/jsx-runtime").JSX.Element;
export {};
