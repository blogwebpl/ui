import { MultiValue, SingleValue } from 'react-select';
import { SelectOption } from '../atoms/Select';
interface Option {
    value: string;
    label: string;
}
interface ProfileProps {
    roles: Option[] | undefined;
    role: Option | null | undefined;
    onChange: (newValue: MultiValue<SelectOption> | SingleValue<SelectOption>) => void;
    email: string;
    changePassword: () => void;
    logout: () => void;
}
export declare function Profile(props: ProfileProps): import("react/jsx-runtime").JSX.Element | null;
export {};
