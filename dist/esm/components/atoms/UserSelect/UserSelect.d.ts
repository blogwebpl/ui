interface UserSelectProps {
    isRequired?: boolean;
    label: string;
    value: string[];
    onChange: (newValue: string[]) => void;
    hidden?: boolean;
    users: {
        id: string;
        name: string;
    }[];
}
export declare function UserSelect(props: UserSelectProps): import("react/jsx-runtime").JSX.Element | null;
export {};
