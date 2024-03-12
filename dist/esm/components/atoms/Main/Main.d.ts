/// <reference types="react" />
interface MainProps {
    /**
     * Elements in main window.
     */
    children: React.ReactNode;
    /**
     * Is it covered by the drawer ?
     */
    isCovered: boolean;
    /**
     * Is the drawer open ?
     */
    isDrawerOpen: boolean;
    /**
     * Set the drawer open state.
     */
    setIsDrawerOpen: any;
    /**
     * Background image
     */
    background?: any;
}
/**
 * Main element under Appbar. Next to the drawer or under the drawer.
 */
export declare function Main(props: MainProps): import("react/jsx-runtime").JSX.Element;
export {};
