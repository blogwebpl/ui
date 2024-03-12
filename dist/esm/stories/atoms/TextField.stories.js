import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { MdSearch as SearchIcon } from 'react-icons/md';
import { Card } from '../../components/atoms/Card';
import { Main } from '../../components/atoms/Main';
import { TextField } from '../../components/atoms/TextField';
//
const Template = (args) => {
    const [value, setValue] = useState('');
    return (_jsx(Main, { isCovered: false, isDrawerOpen: false, setIsDrawerOpen: undefined, children: _jsx(Card, { minWidth: "42rem", padding: true, children: _jsx(TextField, Object.assign({}, args, { value: value || args.value, setValue: setValue })) }) }));
};
export default {
    title: 'atoms/TextField',
    component: Template,
    args: {
        label: 'Field',
        required: true,
    },
    // decorators: [withContainer],
};
export const Text = { args: { type: 'text' } };
export const Password = { args: { type: 'password' } };
export const Number = { args: { type: 'number' } };
export const WithIcon = { args: { type: 'text', icon: SearchIcon } };
export const Slim = { args: { type: 'text', slim: true, icon: SearchIcon } };
export const Disabled = { args: { type: 'text', disabled: true, value: 'Text in disabled' } };
//# sourceMappingURL=TextField.stories.js.map