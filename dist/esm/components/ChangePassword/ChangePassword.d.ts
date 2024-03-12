interface ChangePasswordProps {
    onSubmit: (password1: string, password2: string) => Promise<boolean>;
    onCancel: () => void;
    email: string;
    error: string;
}
export declare function ChangePassword(props: ChangePasswordProps): import("react/jsx-runtime").JSX.Element;
export {};
