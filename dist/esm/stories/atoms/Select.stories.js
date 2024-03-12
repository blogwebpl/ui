import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card } from '../../components/atoms/Card';
import { Main } from '../../components/atoms/Main';
import { Select } from '../../components/atoms/Select';
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
const Template = (args) => {
    const [value, setValue] = useState(null);
    return (_jsx(Main, { isCovered: false, isDrawerOpen: false, setIsDrawerOpen: undefined, children: _jsxs(Card, { minWidth: "42rem", padding: true, children: [_jsx("br", {}), _jsx("br", {}), _jsx(Select, Object.assign({}, args, { label: "Select Field", isRequired: true, options: options, value: value, onChange: setValue })), _jsx("br", {}), _jsx("br", {})] }) }));
};
export default { component: Template, title: 'Atoms/Select' };
export const Default = {};
export const MultiSelect = { args: { isMulti: true } };
//# sourceMappingURL=Select.stories.js.map