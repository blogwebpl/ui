import { MouseEventHandler } from 'react';
export interface ButtonProps {
    disabled?: boolean;
    id?: string;
    label: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    variant: 'primary' | 'secondary' | 'accent';
    tabIndex?: number;
    type?: 'button' | 'submit' | 'reset' | undefined;
    width?: string;
    className?: string;
}
export declare function Button(props: ButtonProps): import("react/jsx-runtime").JSX.Element;
