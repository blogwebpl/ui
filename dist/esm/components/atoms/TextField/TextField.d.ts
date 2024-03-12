import { KeyboardEventHandler, LegacyRef, FocusEventHandler } from 'react';
import { IconType } from 'react-icons';
export interface TextFieldProps {
    id?: string;
    label: string;
    required?: boolean;
    type: string;
    value?: any;
    setValue?: any;
    forwardedRef?: LegacyRef<HTMLInputElement>;
    onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    autoComplete?: string;
    autoFocus?: boolean;
    disabled?: boolean;
    controlled?: boolean;
    icon?: IconType;
    slim?: boolean;
    min?: string;
}
export declare function TextField(props: TextFieldProps): import("react/jsx-runtime").JSX.Element;
