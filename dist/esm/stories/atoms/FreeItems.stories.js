import { jsx as _jsx } from "react/jsx-runtime";
import { FreeItems } from '../../components/atoms/FreeItems';
import { exampleInventoryItems } from './InventoryItems.data';
const Template = (args) => {
    return _jsx(FreeItems, Object.assign({}, args, { children: " " }));
};
export default {
    title: 'atoms/FreeItems',
    component: Template,
};
const tags = [
    {
        id: '1',
        dgId: 11,
        tagId: '02069986040E00',
        itemNumber: 1,
    },
    {
        id: '2',
        dgId: 11,
        tagId: '02069986040E01',
        itemNumber: 2,
    },
    {
        id: '3',
        dgId: 11,
        tagId: '02069986040E02',
        itemNumber: 3,
    },
    {
        id: '4',
        dgId: 12,
        tagId: '02069986040E03',
        itemNumber: 1,
    },
    {
        id: '5',
        dgId: 12,
        tagId: '02069986040E03',
        itemNumber: 3,
    },
];
export const Default = { args: { items: exampleInventoryItems, tags } };
//# sourceMappingURL=FreeItems.stories.js.map