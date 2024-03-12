import { __awaiter } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { WriteTag } from '../../components/atoms/WriteTag';
const writeTagFunction = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
    // alert('WriteTagFunction');
    return true;
});
const Template = () => {
    return _jsx(WriteTag, { data: {}, writeTagFunction: writeTagFunction });
};
export default { title: 'atoms/WriteTag', component: Template };
export const Default = {};
//# sourceMappingURL=WriteTag.stories.js.map