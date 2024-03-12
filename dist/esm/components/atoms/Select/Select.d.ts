import { MultiValue, SingleValue } from 'react-select';
export interface SelectOption {
    value: string;
    label: string;
}
interface SelectProps {
    isMulti?: boolean;
    isRequired?: boolean;
    isClearable?: boolean;
    label: string;
    options: SelectOption[];
    value: MultiValue<SelectOption> | SingleValue<SelectOption>;
    onChange: (newValue: MultiValue<SelectOption> | SingleValue<SelectOption>) => void;
}
export declare function Select(props: SelectProps): import("react/jsx-runtime").JSX.Element;
export {};
