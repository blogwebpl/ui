import { jsx as _jsx } from "react/jsx-runtime";
import { Main } from '../../components/atoms/Main';
const Template = (args) => {
    return _jsx(Main, Object.assign({}, args, { children: args.children }));
};
export default {
    title: 'atoms/Main',
    component: Template,
};
export const Default = {
    args: {
        isDrawerOpen: false,
        isCovered: true,
    },
};
//# sourceMappingURL=Main.stories.js.map