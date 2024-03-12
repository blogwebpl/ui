import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card } from '../../components/atoms/Card';
import { Main } from '../../components/atoms/Main';
import { UserSelect } from '../../components/atoms/UserSelect';
export const users = [
    {
        id: '65bce2d61e5d33ddb6c2e121',
        name: 'John Doe',
    },
    {
        id: '65bce2d61e5d33ddb6c2e122',
        name: 'Jane Doe',
    },
    {
        id: '65bce2d61e5d33ddb6c2e123',
        name: 'Tom Smith',
    },
];
const Template = (args) => {
    const [value, setValue] = useState(null);
    return (_jsx(Main, { isCovered: false, isDrawerOpen: false, setIsDrawerOpen: undefined, children: _jsxs(Card, { minWidth: "42rem", padding: true, children: [_jsx("br", {}), _jsx("br", {}), _jsx(UserSelect, Object.assign({}, args, { label: "Select Users", isRequired: true, value: value, onChange: setValue, users: users })), _jsx("br", {}), _jsx("br", {})] }) }));
};
export default { component: Template, title: 'Atoms/UserSelect' };
export const Default = {};
//# sourceMappingURL=UserSelect.stories.js.map