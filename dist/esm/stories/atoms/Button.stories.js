import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from '../../components/atoms/Button';
const Template = (args) => {
    return _jsx(Button, Object.assign({}, args));
};
export default {
    title: 'atoms/Button',
    component: Template,
};
export const Default = {
    args: {
        label: 'Button',
        width: '25rem',
        disabled: false,
        variant: 'primary',
    },
};
export const Primary = {
    args: {
        variant: 'primary',
    },
};
export const Secondary = {
    args: {
        variant: 'secondary',
    },
};
export const Accent = {
    args: {
        variant: 'accent',
    },
};
//# sourceMappingURL=Button.stories.js.map