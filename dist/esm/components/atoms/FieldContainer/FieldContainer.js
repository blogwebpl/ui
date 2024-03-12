import { jsx as _jsx } from "react/jsx-runtime";
import { StyledContainer, StyledMultiContainer } from './fieldContainerStyle';
export function FieldContainer({ children, isMulti, hidden, id }) {
    return isMulti ? (_jsx(StyledMultiContainer, { id: `container-${id}`, hidden: hidden, children: children }, `container-${id}`)) : (_jsx(StyledContainer, { id: `container-${id}`, hidden: hidden, children: children }, `container-${id}`));
}
//# sourceMappingURL=FieldContainer.js.map