import { jsx as _jsx } from "react/jsx-runtime";
import { Card } from '../../components/atoms/Card';
const Template = (args) => {
    return _jsx(Card, Object.assign({}, args, { children: " " }));
};
export default {
    title: 'atoms/Card',
    component: Template,
};
export const Default = { args: { minWidth: '32rem', padding: true } };
//# sourceMappingURL=Card.stories.js.map