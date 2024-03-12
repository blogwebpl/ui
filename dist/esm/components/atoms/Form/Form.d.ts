/// <reference types="react" />
interface FormProps {
    children: React.ReactNode;
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
    alertText?: string;
}
export declare function Form(props: FormProps): import("react/jsx-runtime").JSX.Element;
export {};
