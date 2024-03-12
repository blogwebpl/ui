import { IconType } from 'react-icons';
export interface Action {
    id: string;
    icon: IconType;
    hint: string;
    disabled?: boolean;
    onClick: () => void;
}
interface ToolsProps {
    actions: Action[];
}
export declare function Tools(props: ToolsProps): import("react/jsx-runtime").JSX.Element;
export {};
