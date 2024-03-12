import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable no-alert */
import { CardMenu } from '../../components/atoms/CardMenu';
const items = [
    {
        id: 'person',
        icon: 'Person',
        label: { en: 'Person Link', pl: 'Person Link' },
        onClick: () => alert('Person'),
    },
    {
        id: 'lock',
        icon: 'Lock',
        label: { en: 'Lock Link', pl: 'Lock Link' },
        onClick: () => alert('Lock'),
    },
];
const Template = () => {
    return _jsx(CardMenu, { items: items, language: "pl" });
};
export default {
    title: 'atoms/CardMenu',
    component: Template,
};
export const Default = {};
//# sourceMappingURL=CardMenu.stories.js.map