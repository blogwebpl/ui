import { jsx as _jsx } from "react/jsx-runtime";
import { MdPerson } from 'react-icons/md';
import { IconButton } from '../../components/atoms/IconButton';
const Template = () => {
    return (_jsx(IconButton, { color: "#000000", label: "person", ariaLabel: "person", children: _jsx(MdPerson, { size: "2.4rem" }) }));
};
export default {
    title: 'atoms/IconButton',
    component: Template,
};
export const Default = {};
//# sourceMappingURL=IconButton.stories.js.map