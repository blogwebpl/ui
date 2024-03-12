import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { Card } from '../../components/atoms/Card';
import { Main } from '../../components/atoms/Main';
import { Labels } from '../../components/atoms/Labels';
const Template = (args) => {
    const [value, setValue] = useState({ pl: 'Użytownik', en: 'User' });
    return (_jsx(Main, { isCovered: false, isDrawerOpen: false, setIsDrawerOpen: undefined, children: _jsx(Card, { minWidth: "42rem", padding: true, children: _jsx(Labels, Object.assign({}, args, { value: value || args.value, onChange: setValue, label: "Labels" })) }) }));
};
export default {
    title: 'atoms/Labels',
    component: Template,
    args: {},
    // decorators: [withContainer],
};
export const Slim = { args: { type: 'text', slim: true } };
//# sourceMappingURL=Labels.stories.js.map