import { jsx as _jsx } from "react/jsx-runtime";
import { Typography } from '../../components/atoms/Typography';
const Template = (args) => {
    return _jsx(Typography, Object.assign({}, args, { children: args.children }));
};
export default { component: Template, title: 'Atoms/Typography' };
export const H6 = { args: { component: 'h6', children: 'Test Typography H6', color: '#000000' } };
//# sourceMappingURL=Typography.stories.js.map