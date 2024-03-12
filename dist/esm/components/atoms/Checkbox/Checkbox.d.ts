import React, { LegacyRef } from 'react';
interface CheckboxProps {
    id?: string;
    label?: string;
    checked?: boolean;
    onChange?: any;
    controlled?: boolean;
    forwardedRef?: LegacyRef<HTMLInputElement>;
}
export declare const Checkbox: React.MemoExoticComponent<(props: CheckboxProps) => import("react/jsx-runtime").JSX.Element>;
export {};
