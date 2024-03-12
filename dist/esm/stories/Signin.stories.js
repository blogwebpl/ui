import { jsx as _jsx } from "react/jsx-runtime";
import { Login } from '../components/Login';
import logo from '../assets/logo.svg';
import { Main } from '../components/atoms/Main';
const handleSubmit = ({ email, password }) => {
    console.log(email, password);
};
const Template = (args) => {
    return (_jsx(Main, { isCovered: true, isDrawerOpen: false, setIsDrawerOpen: () => { }, children: _jsx(Login, Object.assign({}, args)) }));
};
export default { component: Template, title: 'Login' };
export const Default = { args: { logo, handleSubmit, isPending: false } };
export const WithoutLogo = { args: { logo: undefined, handleSubmit, isPending: false } };
export const WithAlert = {
    args: { logo: undefined, handleSubmit, isPending: false, error: 'Brak komunikacji z serwerem.' },
};
//# sourceMappingURL=Signin.stories.js.map