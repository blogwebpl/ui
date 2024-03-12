import { IconType } from 'react-icons';
export declare const getIconComponent: (iconName: string | undefined) => IconType | null;
interface IconSelectProps {
    isRequired?: boolean;
    label: string;
    value: string;
    onChange: (newValue: string) => void;
    hidden?: boolean;
}
export declare function IconSelect(props: IconSelectProps): import("react/jsx-runtime").JSX.Element | null;
export {};
