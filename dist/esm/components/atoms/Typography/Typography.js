import { jsx as _jsx } from "react/jsx-runtime";
import { StyledTypography } from './typographyStyle';
export function Typography(props) {
    return (_jsx(StyledTypography, { "$component": props.component, "$userselect": props.userSelect, "$color": props.color, "$width": props.width, "$background": props.background, children: props.children }));
}
//# sourceMappingURL=Typography.js.map