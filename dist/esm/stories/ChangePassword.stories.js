import { __awaiter } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable no-alert */
import { ChangePassword } from '../components/ChangePassword';
import { Main } from '../components/atoms/Main';
const email = 'tomek@blogweb.pl';
const Template = () => {
    const handleChangePassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(password);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    });
    const handleCancel = () => {
        alert('Change cancel');
    };
    return (_jsx(Main, { isCovered: true, isDrawerOpen: false, setIsDrawerOpen: () => { }, children: _jsx(ChangePassword, { onSubmit: handleChangePassword, onCancel: handleCancel, email: email, error: "" }) }));
};
export default { component: Template, title: 'ChangePassword' };
export const Default = {};
//# sourceMappingURL=ChangePassword.stories.js.map