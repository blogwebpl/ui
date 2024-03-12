import { jsx as _jsx } from "react/jsx-runtime";
import { Checkbox } from '../../components/atoms/Checkbox';
const Template = (args) => _jsx(Checkbox, Object.assign({}, args));
export default {
    title: 'atoms/Checkbox',
    component: Template,
};
export const Default = {
    args: {
        label: 'Default label',
    },
};
export const Checked = { args: { checked: true, label: 'Default label' } };
export const WithoutLabel = {};
//# sourceMappingURL=Checkbox.stories.js.map