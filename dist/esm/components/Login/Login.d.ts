export interface LoginFormData {
    email: string;
    password: string;
}
interface LoginProps {
    logo?: string;
    handleSubmit: ({ email, password }: LoginFormData) => void;
    isPending: boolean;
    error: string;
    logoheight?: string;
    logomargin?: string;
}
export declare function Login(props: LoginProps): import("react/jsx-runtime").JSX.Element;
export {};
