/// <reference types="react" />
interface IconButtonProps {
    children: React.ReactNode;
    /**
     * Color in HEX !!!
     */
    color?: string;
    id?: string;
    isLightColor?: boolean;
    disabled?: boolean;
    label?: string;
    ariaLabel?: string;
    margin?: string;
    onClick?: () => void;
    mobileInvisible?: boolean;
}
export declare function IconButton(props: IconButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
