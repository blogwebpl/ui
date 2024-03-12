import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card } from '../../components/atoms/Card';
import { Main } from '../../components/atoms/Main';
import { IconSelect } from '../../components/atoms/IconSelect';
const Template = (args) => {
    const [value, setValue] = useState(null);
    return (_jsx(Main, { isCovered: false, isDrawerOpen: false, setIsDrawerOpen: undefined, children: _jsxs(Card, { minWidth: "42rem", padding: true, children: [_jsx("br", {}), _jsx("br", {}), _jsx(IconSelect, Object.assign({}, args, { label: "Select Icon", isRequired: true, value: value, onChange: setValue })), _jsx("br", {}), _jsx("br", {})] }) }));
};
export default { component: Template, title: 'Atoms/IconSelect' };
export const Default = {};
//# sourceMappingURL=IconSelect.stories.js.map