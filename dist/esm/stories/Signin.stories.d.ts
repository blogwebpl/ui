declare const _default: {
    component: (args: any) => import("react/jsx-runtime").JSX.Element;
    title: string;
};
export default _default;
export declare const Default: {
    args: {
        logo: any;
        handleSubmit: ({ email, password }: {
            email: string;
            password: string;
        }) => void;
        isPending: boolean;
    };
};
export declare const WithoutLogo: {
    args: {
        logo: undefined;
        handleSubmit: ({ email, password }: {
            email: string;
            password: string;
        }) => void;
        isPending: boolean;
    };
};
export declare const WithAlert: {
    args: {
        logo: undefined;
        handleSubmit: ({ email, password }: {
            email: string;
            password: string;
        }) => void;
        isPending: boolean;
        error: string;
    };
};
